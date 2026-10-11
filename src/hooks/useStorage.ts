import { useState, useEffect, useCallback } from 'react';

const SAVED_KEY = 'property-scanner-saved';
const COMPARE_KEY = 'property-scanner-compare';

function readStorage(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(key: string, value: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function useSavedProperties() {
  const [savedIds, setSavedIds] = useState<string[]>(() => readStorage(SAVED_KEY));

  useEffect(() => {
    writeStorage(SAVED_KEY, savedIds);
  }, [savedIds]);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const removeSaved = useCallback((id: string) => {
    setSavedIds((prev) => prev.filter((p) => p !== id));
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return { savedIds, toggleSave, removeSaved, isSaved };
}

export function useCompareProperties() {
  const [compareIds, setCompareIds] = useState<string[]>(() => readStorage(COMPARE_KEY));

  useEffect(() => {
    writeStorage(COMPARE_KEY, compareIds);
  }, [compareIds]);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 5) return prev; // max 5
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((p) => p !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const isInCompare = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const compareFull = compareIds.length >= 5;

  return { compareIds, toggleCompare, removeFromCompare, clearCompare, isInCompare, compareFull };
}
