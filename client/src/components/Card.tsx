import { useEffect, useState } from "react";

interface CardItem {
  _id: string;
  title: string;
  description: string;
  color: string;
  tags: string[];
  version: number;
}

interface CardProps {
  cardId: string;
}

const Card = ( CardProps: CardProps) => {
  const [card, setCard] = useState<CardItem>();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`/api/cards/${CardProps.cardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch card")
      }
      return response.json()
    })
    .then(data => {
      setCard(data)
    })
    .catch(err => {
      console.error("Error fetching card:", err)
    })
  }, [CardProps.cardId, token])
  
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="px-4 py-5 sm:px-6">
        {card?.title}
      </div>
      <div className="px-4 py-5 sm:p-6">{card?.description}</div>
    </div>
  )
}

export default Card
