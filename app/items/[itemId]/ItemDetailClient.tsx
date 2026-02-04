"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodoItem } from "@/types/todo";
import { getTodoById, updateTodo, deleteTodo, uploadImage } from "@/lib/api";
import Header from "@/components/common/Header";

export default function ItemDetailClient({ itemId }: { itemId: number }) {
  const router = useRouter();

  const [todo, setTodo] = useState<TodoItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchTodo();
  }, []);

  async function fetchTodo() {
    try {
      const data = await getTodoById(itemId);
      setTodo(data);
      setName(data.name);
      setMemo(data.memo ?? "");
      setIsCompleted(data.isCompleted);
      setImagePreview(data.imageUrl ?? null);
    } catch {
      alert("존재하지 않는 할 일입니다.");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }
  //
  //
  //
  //
  //
  //
  console.log("DETAIL itemId:", itemId);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleUpdate() {
    if (!todo) return;

    let imageUrl = todo.imageUrl;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    await updateTodo(todo.id, {
      name,
      memo: memo || null,
      isCompleted,
      imageUrl,
    });

    router.push("/");
  }

  async function handleDelete() {
    if (!todo) return;

    if (!confirm("정말 삭제하시겠습니까?")) return;

    await deleteTodo(todo.id);
    router.push("/");
  }

  if (loading) return <p className="p-6">로딩 중...</p>;

  return (
    <>
      <Header />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* 상단 제목 */}
        <div className="mb-10 flex items-center gap-3 rounded-[24px] border-2 border-slate-900 px-6 py-3">
          <button onClick={() => setIsCompleted((prev) => !prev)}>
            <img
              src={
                isCompleted
                  ? "/icons/check-filled.svg"
                  : "/icons/check-empty.svg"
              }
              className="h-6 w-6"
              alt=""
            />
          </button>

          <input
            className="flex-1 bg-transparent outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 이미지 + 메모 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <label className="relative flex h-[260px] cursor-pointer items-center justify-center rounded-[20px] border-2 border-dashed bg-slate-100">
            {imagePreview ? (
              <img
                src={imagePreview}
                className="h-full w-full rounded-[20px] object-cover"
                alt=""
              />
            ) : (
              <img src="/images/empty-image.svg" alt="" />
            )}

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <div
            className="h-[260px] rounded-[20px] p-6"
            style={{
              backgroundImage: "url(/images/memo-bg.png)",
              backgroundSize: "cover",
            }}
          >
            <textarea
              className="h-full w-full resize-none bg-transparent outline-none"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            className="h-[52px] w-[164px] rounded-[24px] border-2 border-slate-900 bg-lime-300"
            onClick={handleUpdate}
          >
            수정 완료
          </button>

          <button
            className="h-[52px] w-[164px] rounded-[24px] border-2 border-slate-900 bg-rose-500 text-white"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
}
