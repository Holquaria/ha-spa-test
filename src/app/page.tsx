'use client'
import { ContentCard } from "@/components/ContentCard";
import { useGetData } from "@/hooks/useGetData";

export default function Home() {
  const { data } = useGetData()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Content</h1>
        {data.map((item) => {
          return (
            <ContentCard key={item.id} item={item}  />
          )
        })}
      </main>
    </div>
  );
}
