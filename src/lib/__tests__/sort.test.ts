import { sortByCategory, sortByDate, sortByTitle } from "../sort";
import type { ContentItem } from "@/data/mockData";

const d = (s: string) => new Date(s).toISOString();

const sample: ContentItem[] = [
  { id: "a", category: "Fitness",     title: "10-Min Stretch",  thumbnail: "", tags: [], duration: 10, description: "", date_uploaded: d("2025-08-05") },
  { id: "b", category: "Articles",    title: "Sleep Science",    thumbnail: "", tags: [], duration: 8,  description: "", date_uploaded: d("2025-06-22") },
  { id: "c", category: "Podcasts",    title: "Mindful Moments",  thumbnail: "", tags: [], duration: 25, description: "", date_uploaded: d("2025-07-10") },
  { id: "d", category: "Recipes",     title: "Energy Smoothie",  thumbnail: "", tags: [], duration: 10, description: "", date_uploaded: d("2025-07-15") },
  { id: "e", category: "Articles",    title: "Alpha Tips",       thumbnail: "", tags: [], duration: 5,  description: "", date_uploaded: d("2025-06-22") }, // same date as b
];

describe("sorting utils (TDD)", () => {
  it("sortByCategory: alphabetical by category, stable within same category", () => {
    const out = sortByCategory(sample);

    // Categories should be A->Z: Articles, Fitness, Podcasts, Recipes
    const cats = out.map(i => i.category);
    expect(cats).toEqual(["Articles","Articles","Fitness","Podcasts","Recipes"]);

    // Stability: original order of items with same category is preserved (b before e in input)
    const idsForArticles = out.filter(i => i.category === "Articles").map(i => i.id);
    expect(idsForArticles).toEqual(["b","e"]);
  });

  it("sortByDate: newest first; equal dates keep original order", () => {
    const out = sortByDate(sample);
    const ids = out.map(i => i.id);

    // Newest to oldest: a (2025-08-05) > d (2025-07-15) > c (2025-07-10) > b/e (2025-06-22)
    expect(ids.slice(0,3)).toEqual(["a","d","c"]);

    // Stability on equal date (b and e same date): b stays before e
    const lastTwo = ids.slice(-2);
    expect(lastTwo).toEqual(["b","e"]);
  });

  it("sortByTitle: A→Z case-insensitive; ties stable", () => {
    const mixed = [
      { ...sample[0], id: "x", title: "alpha" },
      { ...sample[1], id: "y", title: "Alpha" }, // same title different case
      { ...sample[2], id: "z", title: "beta"  },
    ];
    const out = sortByTitle(mixed);
    const titles = out.map(i => i.title.toLowerCase());
    expect(titles).toEqual(["alpha","alpha","beta"]);

    // Stability: 'x' appears before 'y' because input had x then y
    const ids = out.map(i => i.id);
    expect(ids.slice(0,2)).toEqual(["x","y"]);
  });
});
