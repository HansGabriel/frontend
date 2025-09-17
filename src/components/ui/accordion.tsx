import { createContext, useContext, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  className?: string;
};

type AccordionItemContextValue = {
  value: string;
  isOpen: boolean;
  toggle: () => void;
};

const AccordionContext = createContext<{
  openValue: string | null;
  setOpenValue: (val: string | null) => void;
  type: "single" | "multiple";
  collapsible: boolean;
} | null>(null);

const ItemContext = createContext<AccordionItemContextValue | null>(null);

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue = "",
  className,
  children,
}: PropsWithChildren<AccordionProps>) {
  const [openValue, setOpenValue] = useState<string | null>(
    defaultValue || null
  );

  const value = useMemo(
    () => ({ openValue, setOpenValue, type, collapsible }),
    [openValue, type, collapsible]
  );

  return (
    <div className={className}>
      <AccordionContext.Provider value={value}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
}

type AccordionItemProps = PropsWithChildren<{
  value: string;
  className?: string;
}>;

export function AccordionItem({
  value,
  className,
  children,
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");

  const isOpen = ctx.openValue === value;
  const toggle = () => {
    if (isOpen) {
      if (ctx.collapsible) ctx.setOpenValue(null);
    } else {
      ctx.setOpenValue(value);
    }
  };

  return (
    <div className={className}>
      <ItemContext.Provider value={{ value, isOpen, toggle }}>
        {children}
      </ItemContext.Provider>
    </div>
  );
}

type AccordionTriggerProps = PropsWithChildren<{ className?: string }>;

export function AccordionTrigger({
  className,
  children,
}: AccordionTriggerProps) {
  const item = useContext(ItemContext);
  if (!item)
    throw new Error("AccordionTrigger must be used within AccordionItem");
  return (
    <button
      type="button"
      onClick={item.toggle}
      className={
        className ||
        "w-full flex items-center justify-between py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
      }
    >
      {children}
    </button>
  );
}

type AccordionContentProps = PropsWithChildren<{ className?: string }>;

export function AccordionContent({
  className,
  children,
}: AccordionContentProps) {
  const item = useContext(ItemContext);
  if (!item)
    throw new Error("AccordionContent must be used within AccordionItem");
  return (
    <div
      className={className}
      style={{ display: item.isOpen ? "block" : "none" }}
    >
      {children}
    </div>
  );
}
