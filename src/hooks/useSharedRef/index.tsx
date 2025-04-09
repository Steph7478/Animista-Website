import { useRef } from "react";

export function useSharedRef<T>() {
  const sharedRef = useRef<T>(null);
  return sharedRef;
}
