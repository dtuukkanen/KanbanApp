import { CardData } from "../types/types";

interface CardProps {
  cardData: CardData;
}

const Card = ( {cardData}: CardProps) => {  
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="px-4 py-5 sm:px-6">{cardData.title}</div>
      <div className="px-4 py-5 sm:p-6">{cardData.description}</div>
    </div>
  )
}

export default Card
