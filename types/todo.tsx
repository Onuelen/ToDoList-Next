export interface TodoItem {
  id: number;
  tenanId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}
