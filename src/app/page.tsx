'use client'
import { ContentCard } from "@/components/ContentCard";
import { useGetData } from "@/hooks/useGetData";

export default function Home() {
  const { data, sortBy, setSortBy } = useGetData();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Content</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="border rounded px-2 py-1"
        >
          <option value="category">Category</option>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
        {data.map((item) => {
          return (
            <ContentCard key={item.id} item={item} />
          )
        })}
      </main>
    </div>
  );
}
