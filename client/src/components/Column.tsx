import { useState } from "react";
import Card from "./Card";
import { CardData, ColumnData } from "../types/types";

interface ColumnProps {
  columnData: ColumnData;
  onDeleteColumn: (columnId: string) => void;
}

const Column = ({ columnData, onDeleteColumn }: ColumnProps) => {
  // Local state for cards; default to empty array if undefined.
  const [cards, setCards] = useState<CardData[]>(columnData.cards || []);
  // Local state for column title editing.
  const [columnTitle, setColumnTitle] = useState<string>(columnData.title);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  // When true, show the add card form
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>("");
  const [newCardDescription, setNewCardDescription] = useState<string>("");
  const token = localStorage.getItem("token");

  // Handler for updating the column title via API.
  const handleTitleSave = async () => {
    try {
      const response = await fetch(`/api/columns/${columnData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ newTitle: columnTitle })
      });
      if (!response.ok) {
        throw new Error("Failed to update column title");
      }
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Error updating column title:", error);
    }
  };

  // Handler for adding a card.
  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cards/${columnData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newCardTitle, description: newCardDescription })
      });
      if (!response.ok) {
        throw new Error("Failed to add card");
      }
      const newCard = await response.json();
      setCards(prev => [...prev, newCard as CardData]);
      setNewCardTitle("");
      setNewCardDescription("");
      setIsAddingCard(false);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  // Handler for cancelling the add card form.
  const handleCancel = () => {
    setNewCardTitle("");
    setNewCardDescription("");
    setIsAddingCard(false);
  };

  // Handler for deleting a card.
  const deleteCard = async (cardId: string) => {
    try {
      const response = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ columnId: columnData._id })
      });
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
      // Remove the card from local state immediately.
      setCards(prev => prev.filter(card => card._id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm p-4">
      {/* Column Title and Delete Column */}
      <div className="flex items-center justify-between">
        {isEditingTitle ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <button 
              onClick={handleTitleSave} 
              className="px-3 py-2 bg-indigo-600 text-white rounded"
            >
              Save
            </button>
            <button 
              onClick={() => {
                setColumnTitle(columnData.title);
                setIsEditingTitle(false);
              }}
              className="px-3 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h1 className="px-6 py-4 text-lg font-bold">{columnTitle}</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditingTitle(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              {onDeleteColumn && (
                <button
                  onClick={() => onDeleteColumn(columnData._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete column
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Cards List */}
      <ul role="list" className="space-y-3">
        {(cards || []).map((card: CardData) => (
          <li key={card._id} className="overflow-hidden rounded-md bg-white px-6 py-4">
            <Card cardData={card} onDeleteCard={deleteCard} />
          </li>
        ))}
      </ul>
      
      {/* Add Card Form */}
      {isAddingCard ? (
        <form onSubmit={handleAddCard} className="mt-4 flex flex-col space-y-2">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Card title"
            required
          />
          <input
            type="text"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Card description"
            required
          />
          <div className="flex space-x-2">
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Save
            </button>
            <button 
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Card
        </button>
      )}
    </div>
  );
};

export default Column;