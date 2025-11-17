
export type Player = 'X' | 'O';
export type SquareValue = Player | null;

export interface MemoryCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}
