import Card from "./Card"
import { useEffect, useState } from "react"

// const items = [
//   { id: 1, title: "First item", description: "This is the first item" },
//   { id: 2, title: "Second item", description: "This is the second item" },
//   { id: 3, title: "Third item", description: "This is the third item" }
// ]

interface ColumnData {
  title: string;
  cardIds: string[];
}

interface ColumnProps {
  columnId: string;
}
  
const Column = (ColumnProps: ColumnProps) => {
  const [columnData, setColumnData] = useState<ColumnData>({ title: "", cardIds: [] })
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`/api/columns/${ColumnProps.columnId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch cards")
      }
      return response.json()
    })
    .then(data => {
      setColumnData(data)
    })
    .catch(err => {
      console.error("Error fetching cards:", err)
    })
  }, [ColumnProps.columnId, token])

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
      <h1 className="px-6 py-4 text-lg font-semibold">{columnData.title}</h1>
      <ul role="list" className="space-y-3">
        {columnData.cardIds.map((cardId) => (
          <li key={cardId} className="overflow-hidden rounded-md bg-white px-6 py-4">
            <Card cardId={cardId} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Column
