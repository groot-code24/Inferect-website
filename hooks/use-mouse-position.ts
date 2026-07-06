"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface Position {
  x: number;
  y: number;
}

/**
 * Returns normalized mouse position (-1 to 1 on each axis) relative to the
 * bounds of the referenced element. Used for subtle parallax effects.
 */
export function useMousePosition<T extends HTMLElement>(): [RefObject<T>, Position] {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handleMove(event: MouseEvent) {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      setPosition({ x, y });
    }

    function handleLeave() {
      setPosition({ x: 0, y: 0 });
    }

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return [ref, position];
}
