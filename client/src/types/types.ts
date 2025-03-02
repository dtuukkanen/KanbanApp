export interface UserData {
  id: string;
  username: string;
}

export interface BoardData {
  _id: string;
  title: string;
  columns: ColumnData[];
}

export interface ColumnData {
  _id: string;
  title: string;
  cards: CardData[];
}

export interface CardData {
  _id: string;
  title: string;
  description: string;
  date: Date;
}
