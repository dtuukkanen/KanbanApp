import { useEffect, useState } from "react"
import Column from "./Column"

interface BoardProps {
  boardId: string;
}

const Board = ( BoardProps: BoardProps ) => {
  const [columnIds, setColumnIds] = useState<string[]>([])
  const [newColumnTitle, setNewColumnTitle] = useState<string>("")
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`/api/boards/${BoardProps.boardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch columns")
      }
      return response.json()
    })
    .then(data => {
      setColumnIds(data)
    })
    .catch(err => {
      console.error("Error fetching columns:", err)
    })
  }, [BoardProps.boardId, token])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnTitle(e.target.value)
  }

  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/columns/${BoardProps.boardId}`, {
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
      const newColumn = await response.json()
      setColumnIds(prev => [...prev, newColumn._id])
      setNewColumnTitle("")
    } catch (error) {
      console.error("Error adding column:", error)
    }
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex justify-center space-x-4">
        {columnIds.map((columnId) => (
            <Column key={columnId} columnId={columnId} />
        ))}
      </div>
      <form onSubmit={handleAddColumn} className="mt-4 flex justify-center space-x-2">
        <input
          type="text"
          value={newColumnTitle}
          onChange={handleTitleChange}
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
