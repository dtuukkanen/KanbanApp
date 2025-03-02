import { CardData } from "../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  cardData: CardData;
  onDeleteCard: (cardId: string) => void;
}

const Card = ({ cardData, onDeleteCard }: CardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cardData._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Format the date and time
  const formatDateTime = () => {
    try {
      const date = new Date(cardData.date);
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${dateStr} ${timeStr}`;
    } catch (e) {
      return "";
    }
  };

  const formattedDateTime = cardData.date ? formatDateTime() : "";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`divide-y divide-gray-200 overflow-hidden rounded-lg shadow-sm ${
        isDragging ? "bg-gray-200" : "bg-white"
      }`}
    >
      <div className="px-4 py-5 sm:px-6 font-semibold flex items-center justify-between">
        <span>{cardData.title}</span>
        <button
          onPointerDown={(e) => e.stopPropagation()} // Prevent any pointer events from bubbling up
          onMouseDown={(e) => e.stopPropagation()} // Also stop mouse events
          onClick={(e) => {
            e.stopPropagation();
            onDeleteCard(cardData._id);
          }}
          className="ml-2 text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
      <div className="px-4 py-5 sm:p-6">{cardData.description}</div>
      <p className="mt-2 text-xs text-gray-500">{formattedDateTime}</p>
    </div>
  );
};

export default Card;
