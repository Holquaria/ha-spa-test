import { useState } from "react";
import type { ContentItem } from "@/data/mockData";
import Image from "next/image";

interface Props {
    item: ContentItem;
}
export function ContentCard({ item }: Props) {
    const [open, setOpen] = useState(false);
    const date = new Date(item.date_uploaded).toLocaleDateString();

    return (
        <li className="border rounded-xl overflow-hidden bg-black">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="text-left w-full"
                aria-expanded={open}
                aria-controls={`details-${item.id}`}
            >
                <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="text-sm opacity-80">~{item.duration} min</div>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.slice(0, 3).map((t) => (
                            <span key={t} className="text-xs border rounded px-2 py-0.5">{t}</span>
                        ))}
                    </div>
                </div>
            </button>

            {open && (
                <div id={`details-${item.id}`} className="px-4 pb-4 text-sm space-y-2">
                    <p className="opacity-90">{item.description}</p>
                    <p className="opacity-70">Uploaded: {date}</p>
                </div>
            )}
        </li>
    );
}
