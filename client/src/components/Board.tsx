import { useState } from "react";
import Column from "./Column";
import Card from "./Card";
import { BoardData, ColumnData } from "../types/types";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";

interface BoardProps {
  boardData: BoardData;
}

const Board = ({ boardData }: BoardProps) => {
  // Initialize local state for columns from boardData.columns
  const [columns, setColumns] = useState<ColumnData[]>(
    Array.isArray(boardData.columns) ? boardData.columns : []
  );
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const token = localStorage.getItem("token");
  // New state for active card being dragged.
  const [activeId, setActiveId] = useState<string | null>(null);

  // Helper: find a card within columns given a cardId.
  const findCardLocation = (cardId: string) => {
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const cardIndex = columns[colIndex].cards.findIndex(
        (card) => card._id === cardId
      );
      if (cardIndex !== -1) {
        return { colIndex, cardIndex };
      }
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }
    const activeLocation = findCardLocation(active.id as string);
    // Check if drop target is an empty column.
    let overLocation = findCardLocation(over.id as string);
    if (!overLocation) {
      const emptyColumnIndex = columns.findIndex(
        (col) => col._id === over.id && (!col.cards || col.cards.length === 0)
      );
      if (emptyColumnIndex !== -1) {
        overLocation = { colIndex: emptyColumnIndex, cardIndex: 0 };
      }
    }
    if (!activeLocation || !overLocation) {
      setActiveId(null);
      return;
    }
    const newColumns = [...columns];
    const movingCard = newColumns[activeLocation.colIndex].cards[activeLocation.cardIndex];
    newColumns[activeLocation.colIndex].cards.splice(activeLocation.cardIndex, 1);
    newColumns[overLocation.colIndex].cards.splice(overLocation.cardIndex, 0, movingCard);
    setColumns(newColumns);

    // Call API to persist the move
    try {
      const response = await fetch(`/api/cards/${movingCard._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          newColumnId: newColumns[overLocation.colIndex]._id,
          oldColumnId: newColumns[activeLocation.colIndex]._id,
          newIndex: overLocation.cardIndex
        })
      });
      if (!response.ok) {
        throw new Error("Failed to move card on server");
      }
      // Optionally handle response
    } catch (error) {
      console.error("Error updating card order:", error);
    }
    
    setActiveId(null);
  };

  // Helper to get active card data, if any.
  const getActiveCard = () => {
    if (!activeId) return null;
    const location = findCardLocation(activeId);
    if (!location) return null;
    return columns[location.colIndex].cards[location.cardIndex];
  };

  // Handler for adding a new column.
  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/columns/${boardData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newColumnTitle }),
      });
      if (!response.ok) {
        throw new Error("Failed to add column");
      }
      const newColumn = await response.json();
      // Update local columns state immutably
      setColumns((prev) => [...prev, newColumn as ColumnData]);
      setNewColumnTitle("");
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  // Handler to remove a column.
  const deleteColumn = async (columnId: string) => {
    try {
      const response = await fetch(`/api/columns/${columnId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete column");
      }
      setColumns((prev) => prev.filter((col) => col._id !== columnId));
    } catch (error) {
      console.error("Error deleting column:", error);
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h3 className="text-xl font-bold">{boardData.title}</h3>
        <div className="flex justify-center space-x-4">
          {columns.map((column) => (
            <Column
              key={column._id}
              columnData={column}
              onDeleteColumn={deleteColumn}
            />
          ))}
        </div>
        <form
          onSubmit={handleAddColumn}
          className="mt-4 flex justify-center space-x-2"
        >
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Column title"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add Column
          </button>
        </form>
      </div>
      <DragOverlay>
        {getActiveCard() ? (
          // Render a copy of the dragged card. The onDeleteCard prop is omitted.
          <div className="w-full">
            <Card cardData={getActiveCard()!} onDeleteCard={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
