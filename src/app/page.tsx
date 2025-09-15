"use client";

import { useState, useMemo } from "react";
import { useGetData } from "@/hooks/useGetData";
import { ContentCard } from "@/components/ContentCard";
import type { ContentItem } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { data } = useGetData();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const items = useMemo(() => data, [data]);

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl p-6 md:p-10 space-y-6">
        <header className="flex items-end justify-center">
          <h1 className="text-3xl font-semibold">Wisdom Wellbeing</h1>
        </header>

        <motion.ul
          layout
          className="grid grid-cols-1 gap-6 place-items-center"
        >
          {items.map((item) => {
            const expanded = expandedId === item.id;
            return (
              <motion.li
                key={item.id}
                layout
                className={expanded ? "col-span-full" : "w-1/4"}
                transition={{ layout: { duration: 0.3 } }}
              >
                <ContentCard
                  item={item}
                  expanded={expanded}
                  onToggle={() =>
                    setExpandedId((prev) => (prev === item.id ? null : item.id))
                  }
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </main>
    </div>
  );
}
