"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodoItem } from "@/types/todo";
import { getTodos, createTodo, updateTodo } from "@/lib/api";

import Header from "@/components/common/Header";
import AddTodoBar from "@/components/common/AddTodoBar";

export default function TodoPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);

  const inProgressTodos = todos.filter((t) => !t.isCompleted);
  const completedTodos = todos.filter((t) => t.isCompleted);

  const isEmpty = inProgressTodos.length === 0 && completedTodos.length === 0;

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTodo(text: string) {
    await createTodo(text);
    await fetchTodos();
  }

  async function handleToggle(todo: TodoItem) {
    await updateTodo(todo.id, {
      isCompleted: !todo.isCompleted,
    });
    await fetchTodos();
  }

  return (
    <>
      {/* GNB */}
      <Header />

      <AddTodoBar onAdd={handleAddTodo} isEmpty={isEmpty} />

      {/* 목록 영역 */}
      <div
        className="
        mx-auto
        max-w-[1200px]
        px-4
        sm:px-6
        lg:px-0
        py-10
        "
      >
        {loading ? (
          <p className="text-center">로딩 중...</p>
        ) : (
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* ================= TODO ================= */}
            <section className="flex-1">
              {/* TODO 뱃지 (항상 표시) */}
              <img
                src="/images/badge/todo.svg"
                alt="todo"
                className="mb-4 w-[101px] h-[36px]"
              />

              {inProgressTodos.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20">
                  <img
                    src="/images/empty/todo-large.svg"
                    alt="할 일 없음"
                    className="w-[160px]"
                  />
                  <p className="text-slate-500">할 일이 없어요</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {inProgressTodos.map((todo) => (
                    <li
                      key={todo.id}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-[24px]
                        border-2
                        border-slate-900
                        bg-white
                        px-4
                        py-3
                      "
                      onClick={() => router.push(`/items/${todo.id}`)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(todo);
                        }}
                      >
                        <img
                          src="/icons/check-empty.svg"
                          alt=""
                          className="h-5 w-5"
                        />
                      </button>
                      <span>{todo.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* ================= DONE ================= */}
            <section className="flex-1">
              {/* DONE 뱃지 (항상 표시, 이름 주의) */}
              <img
                src="/images/badge/done.svg"
                alt="done"
                className="mb-4 w-[97px] h-[36px]"
              />

              {completedTodos.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20">
                  <img
                    src="/images/empty/done-large.svg"
                    alt="완료된 할 일 없음"
                    className="w-[160px]"
                  />
                  <p className="text-slate-500">완료된 할 일이 없어요</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {completedTodos.map((todo) => (
                    <li
                      key={todo.id}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-[24px]
                        border-2
                        border-slate-900
                        bg-violet-100
                        px-4
                        py-3
                        text-slate-700
                      "
                      onClick={() => router.push(`/items/${todo.id}`)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(todo);
                        }}
                      >
                        <img
                          src="/icons/check-filled.svg"
                          alt=""
                          className="h-5 w-5"
                        />
                      </button>
                      <span>{todo.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
}
