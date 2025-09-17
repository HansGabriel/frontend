import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "lucide-react";

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  setValue: (value: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export function Select({
  children,
  defaultValue = "",
  onValueChange,
}: PropsWithChildren<{
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <SelectContext.Provider
      value={{ open, setOpen, value, setValue: handleValueChange }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectTrigger must be used within Select");

  return (
    <button
      type="button"
      className={`flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        className || ""
      }`}
      data-state={ctx.open ? "open" : "closed"}
      onClick={() => ctx.setOpen(!ctx.open)}
    >
      {children}
      <ChevronDown
        size={16}
        className={`transition-transform ${ctx.open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectValue must be used within Select");

  return <span>{ctx.value || placeholder}</span>;
}

export function SelectContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectContent must be used within Select");
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
  }, [ctx.open]);

  if (!ctx.open) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  children,
  value,
  className,
}: PropsWithChildren<{ value: string; className?: string }>) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectItem must be used within Select");

  return (
    <button
      type="button"
      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
        ctx.value === value ? "bg-blue-50 text-blue-900" : ""
      } ${className || ""}`}
      onClick={() => {
        ctx.setValue(value);
        ctx.setOpen(false);
      }}
    >
      {children}
    </button>
  );
}
