import { useCompareStore } from "@/store/compareStore";

export function useCompare(id: string) {
  const { addToCompare, removeFromCompare, isInCompare, compareIds } = useCompareStore();
  const inCompare = isInCompare(id);
  const canAddMore = compareIds.length < 3;

  const toggle = () => {
    if (inCompare) removeFromCompare(id);
    else if (canAddMore) addToCompare(id);
  };

  return { inCompare, canAddMore, toggle };
}
