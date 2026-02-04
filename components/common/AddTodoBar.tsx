"use client";

import { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
  isEmpty: boolean;
}

export default function AddTodoBar({ onAdd, isEmpty }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  }

  return (
    <div className="mx-auto mt-6 flex max-w-[1200px] gap-4 px-4 sm:px-6 lg:px-0">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="할 일을 입력해주세요"
        className="
          h-[52px]
          flex-1
          rounded-[24px]
          border-2
          border-slate-900
          bg-slate-100
          px-6
          outline-none
        "
      />

      <button
        onClick={handleSubmit}
        className={`
          h-[52px]
          w-[164px]
          rounded-[24px]
          border-2
          border-slate-900
          font-bold
          ${
            isEmpty ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-900"
          }
        `}
      >
        추가하기
      </button>
    </div>
  );
}
