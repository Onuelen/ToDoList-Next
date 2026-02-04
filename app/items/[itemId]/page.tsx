import ItemDetailClient from "./ItemDetailClient";
//force git update
export default async function Page({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params; // ✅ 반드시 await

  const numericId = Number(itemId);

  if (Number.isNaN(numericId)) {
    throw new Error("Invalid itemId");
  }

  return <ItemDetailClient itemId={numericId} />;
}
