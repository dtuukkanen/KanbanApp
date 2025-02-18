import Card from "./Card"
import { CardData, ColumnData } from "../types/types"

interface ColumnProps {
  columnData: ColumnData;
}
  
const Column = ({ columnData }: ColumnProps) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
      <h1 className="px-6 py-4 text-lg font-semibold">{columnData.title}</h1>
      <ul role="list" className="space-y-3">
        {/* If cards is empty use empty array instead */}
        {(columnData.cards || []).map((card: CardData) => (
          <li key={card._id} className="overflow-hidden rounded-md bg-white px-6 py-4">
            <Card cardData={card} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Column
