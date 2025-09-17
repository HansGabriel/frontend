import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function Dropdown({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownTrigger must be used within Dropdown");
  return (
    <button
      type="button"
      className={className}
      data-state={ctx.open ? "open" : "closed"}
      onClick={() => ctx.setOpen(!ctx.open)}
    >
      {children}
    </button>
  );
}

export function DropdownContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownContent must be used within Dropdown");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current || !ctx) return;
      if (ctx.open && !ref.current.contains(e.target as Node)) {
        ctx.setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [ctx]);

  if (!ctx.open) return null;
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  onSelect,
  className,
}: PropsWithChildren<{ onSelect?: () => void; className?: string }>) {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownItem must be used within Dropdown");
  return (
    <button
      type="button"
      className={
        className || "w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
      }
      onClick={() => {
        onSelect?.();
        ctx.setOpen(false);
      }}
    >
      {children}
    </button>
  );
}
