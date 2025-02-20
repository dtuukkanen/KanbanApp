import { CardData } from "../types/types";

interface CardProps {
  cardData: CardData;
  onDelete: (cardId: string) => void;
}

const Card = ( {cardData, onDelete }: CardProps) => {  
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="px-4 py-5 sm:px-6 font-semibold flex items-center justify-between">
        <span>{cardData.title}</span>
        <button
          onClick={() => onDelete(cardData._id)}
          className="ml-2 text-sm text-red-600 hover:underline" 
        >
          Delete
        </button>
      </div>
      <div className="px-4 py-5 sm:p-6">{cardData.description}</div>
    </div>
  )
}

export default Card
