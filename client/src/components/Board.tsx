import { useState } from "react"
import Column from "./Column"
import { BoardData, ColumnData } from "../types/types"

interface BoardProps {
  boardData: BoardData
}

const Board = ({ boardData }: BoardProps) => {
  // Initialize local state for columns from boardData.columns
  const [columns, setColumns] = useState<ColumnData[]>(
    Array.isArray(boardData.columns) ? boardData.columns : []
  );
  const [newColumnTitle, setNewColumnTitle] = useState<string>("")
  const token = localStorage.getItem('token')

  // Handler for adding a new column.
  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/columns/${boardData._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newColumnTitle })
      });
      if (!response.ok) {
        throw new Error("Failed to add column")
      }
      const newColumn = await response.json();
      // Update local columns state immutably
      setColumns(prev => [...prev, newColumn as ColumnData]);
      setNewColumnTitle("")
    } catch (error) {
      console.error("Error adding column:", error)
    }
  };

  // Handler to remove a column.
  const deleteColumn = async (columnId: string) => {
    try {
      const response = await fetch(`/api/columns/${columnId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) { 
        throw new Error("Failed to delete column");
      }
      setColumns(prev => prev.filter(col => col._id !== columnId));
    } catch (error) {
      console.error("Error deleting column:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h3 className="text-xl font-bold">{boardData.title}</h3>
      <div className="flex justify-center space-x-4">
        {columns.map((column) => (
            <Column key={column._id} columnData={column} onDeleteColumn={deleteColumn} />
        ))}
      </div>
      <form onSubmit={handleAddColumn} className="mt-4 flex justify-center space-x-2">
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
  )
}

export default Board
