import type { ContentItem } from "@/data/mockData";

function withIndex<T>(items: T[]) {
  return items.map((item, idx) => ({ item, idx }));
}

export function sortByCategory(items: ContentItem[]): ContentItem[] {
  return withIndex(items)
    .slice() 
    .sort((a, b) => {
      const cmp = a.item.category.localeCompare(b.item.category);
      return cmp !== 0 ? cmp : a.idx - b.idx;
    })
    .map(({ item }) => item);
}

export function sortByDate(items: ContentItem[]): ContentItem[] {
  return withIndex(items)
    .slice()
    .sort((a, b) => {
      const ta = Date.parse(a.item.date_uploaded);
      const tb = Date.parse(b.item.date_uploaded);

      if (isNaN(tb) && isNaN(ta)) return a.idx - b.idx; 
      if (isNaN(tb)) return -1; 
      if (isNaN(ta)) return 1; 
      const cmp = tb - ta;
      return cmp !== 0 ? cmp : a.idx - b.idx;
    })
    .map(({ item }) => item);
}

export function sortByTitle(items: ContentItem[]): ContentItem[] {
  return withIndex(items)
    .slice()
    .sort((a, b) => {
      const ta = a.item.title.toLowerCase();
      const tb = b.item.title.toLowerCase();
      const cmp = ta.localeCompare(tb);
      return cmp !== 0 ? cmp : a.idx - b.idx;
    })
    .map(({ item }) => item);
}
