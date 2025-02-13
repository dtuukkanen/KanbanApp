import Card from "./Card"

const items = [
  { id: 1, title: "First item", description: "This is the first item" },
  { id: 2, title: "Second item", description: "This is the second item" },
  { id: 3, title: "Third item", description: "This is the third item" }
]
  
const Column = () => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
      <h1 className="px-6 py-4 text-lg font-semibold">Column Title</h1>
      <ul role="list" className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-md bg-white px-6 py-4">
            {<Card title={item.title} description={item.description} />}
        </li>
        ))}
      </ul>
    </div>
  )
}

export default Column
