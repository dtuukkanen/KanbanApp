import { useState } from "react";
import Card from "./Card";
import { CardData, ColumnData } from "../types/types";

interface ColumnProps {
  columnData: ColumnData;
}

const Column = ({ columnData }: ColumnProps) => {
  // Local state for cards; default to empty array if undefined.
  const [cards, setCards] = useState<CardData[]>(columnData.cards || []);
  // When true, show the add card form
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>("");
  const [newCardDescription, setNewCardDescription] = useState<string>("");
  const token = localStorage.getItem("token");

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
      <h1 className="px-6 py-4 text-lg font-bold">{columnData.title}</h1>
      
      <ul role="list" className="space-y-3">
        {(cards || []).map((card: CardData) => (
          <li key={card._id} className="overflow-hidden rounded-md bg-white px-6 py-4">
            <Card cardData={card} onDelete={deleteCard} />
          </li>
        ))}
      </ul>
      
      {/* Add card form */}
      {isAddingCard ? (
        <form onSubmit={handleAddCard} className="mt-4 flex flex-col space-x-2">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="px-3 py-2 border rounded flex-grow"
            placeholder="Card title"
            required
          />
          <input
            type="text"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="px-3 py-2 border rounded flex-grow"
            placeholder="Card description"
            required
          />
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