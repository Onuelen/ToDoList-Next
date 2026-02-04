import { TodoItem } from "@/types/todo";

const BASE_URL = process.env.NEXT_PUBLIC_TODO_API_BASE!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

// Todo API

// 할 일 목록 조회
export function getTodos(): Promise<TodoItem[]> {
  return request<TodoItem[]>(`${BASE_URL}/${TENANT_ID}/items`);
}

// 단일 할 일 조회 (상세 페이지)
export function getTodoById(itemId: number): Promise<TodoItem> {
  return request<TodoItem>(`${BASE_URL}/${TENANT_ID}/items/${itemId}`);
}

// 할 일 생성
export function createTodo(name: string): Promise<TodoItem> {
  return request<TodoItem>(`${BASE_URL}/${TENANT_ID}/items`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

// 할 일 수정
export function updateTodo(
  itemId: number,
  payload: Partial<
    Pick<TodoItem, "name" | "memo" | "imageUrl" | "isCompleted">
  >,
): Promise<TodoItem> {
  return request<TodoItem>(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// 할 일 삭제
export function deleteTodo(itemId: number): Promise<void> {
  return request<void>(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "DELETE",
  });
}

// Image Upload API

//  FormData 요청 → Content-Type 직접 설정 금지
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  console.log("🔥 image upload response:", data);

  return data.url;
}
