"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import type { ContentItem } from "@/data/mockData";

type Props = {
    item: ContentItem;
    expanded?: boolean;
    onToggle?: () => void;
};

export function ContentCard({ item, expanded = false, onToggle }: Props) {
    const uploaded = useMemo(
        () => new Date(item.date_uploaded).toLocaleDateString(),
        [item.date_uploaded]
    );

    return (
        <motion.div
            layout
            className="rounded-2xl border shadow-sm overflow-hidden"
            transition={{ layout: { duration: 0.3 } }}
        >

            <button
                type="button"
                onClick={onToggle}
                aria-expanded={expanded}
                className="w-full text-left"
            >
                <div className={expanded ? "relative w-full h-72" : "relative w-full aspect-[16/10]"}>
                    <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                        priority={expanded}
                    />
                </div>

                <div className="p-4 md:p-5 space-y-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="text-sm opacity-80">~{item.duration} min</div>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.slice(0, 3).map((t) => (
                            <span
                                key={t}
                                className="text-xs border rounded-full px-2 py-0.5"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="details"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-4 md:px-5 pb-5 text-sm space-y-3"
                    >
                        <p className="opacity-90">{item.description}</p>
                        <p className="opacity-70">Uploaded: {uploaded}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
