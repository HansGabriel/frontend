import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  SquareUser,
  ScanLine,
  WalletCards,
  Bot,
  Workflow,
  Users,
  Bell,
  Building2,
  Tag,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";

export type ViewItem = {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  count: number | string;
};

export type ViewGroup = {
  id: string;
  title: string;
  items: ViewItem[];
};

type ViewsProps = {
  onSelect?: (view: ViewItem) => void;
  defaultSelectedId?: string;
};

const Views = ({ onSelect, defaultSelectedId }: ViewsProps) => {
  const businesses = useMemo(
    () => ["All Businesses", "mat fashion", "Mat fashion international"],
    []
  );
  const [selectedBusiness, setSelectedBusiness] =
    useState<string>("All Businesses");

  const groups: ViewGroup[] = useMemo(
    () => [
      {
        id: "personal",
        title: "Personal Views",
        items: [
          { id: "inbox", icon: SquareUser, label: "Your Inbox", count: 0 },
          { id: "unassigned", icon: ScanLine, label: "Unassigned", count: 82 },
          { id: "human", icon: WalletCards, label: "Human", count: 161 },
          { id: "bot", icon: Bot, label: "Bot", count: 163 },
          { id: "threads", icon: Workflow, label: "Threads", count: 9 },
        ],
      },
      {
        id: "organization",
        title: "Organization Views",
        items: [
          { id: "b2b", icon: Building2, label: "B2B", count: 0 },
          { id: "courier", icon: Users, label: "Courier issues", count: 2 },
          {
            id: "proactive",
            icon: Bell,
            label: "PROACTIVE FLOW\n(time slot)",
            count: 1291,
          },
          { id: "fq-insta", icon: Tag, label: "FQ INSTAGRAM", count: 8084 },
          { id: "fq-fb", icon: Tag, label: "FQ FACEBOOK", count: 1712 },
          {
            id: "bg-insta",
            icon: Tag,
            label: "BE.GREEN INSTAGRAM",
            count: 731,
          },
          { id: "bg-fb", icon: Tag, label: "BE.GREEN FACEBOOK", count: 126 },
          { id: "flora", icon: Tag, label: "FloraQueen", count: "9,999+" },
          { id: "begreen", icon: Tag, label: "Be Green", count: "9,999+" },
        ],
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string>(
    defaultSelectedId || groups[0].items[0].id
  );

  const handleSelect = (item: ViewItem) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  const formatCount = (count: number | string) =>
    typeof count === "number" ? count.toLocaleString() : count;

  return (
    <div className="w-52 bg-gray-100 h-full border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-semibold text-gray-800">
            Help Desk
          </span>
          <div className="flex items-center text-gray-600">
            <button className="p-1.5 rounded-md hover:bg-gray-200">
              <Plus size={16} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-200">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* All Businesses dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between text-sm font-semibold px-2 py-2 rounded-lg hover:bg-gray-200/60 data-[state=open]:bg-blue-100 data-[state=open]:text-blue-700">
            <span>{selectedBusiness}</span>
            <ChevronDown
              size={16}
              className="text-gray-500 data-[state=open]:text-blue-700"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-1 w-[224px] bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden">
            <div className="p-3 border-b">
              <div className="flex items-center gap-2">
                <Search size={16} className="text-black" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  className="flex-1 text-sm focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
            <DropdownMenuItem
              onClick={() => setSelectedBusiness("All Businesses")}
              className="hover:bg-blue-50"
            >
              All Businesses
            </DropdownMenuItem>
            <div className="px-3 py-1 text-xs text-gray-400">Businesses</div>
            {businesses
              .filter((b) => b !== "All Businesses")
              .map((business) => (
                <DropdownMenuItem
                  key={business}
                  onClick={() => setSelectedBusiness(business)}
                  className="hover:bg-blue-50"
                >
                  {business}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
        {/* Personal Views */}
        <div>
          <ul className="space-y-0.5">
            {groups[0].items.map((item) => {
              const Icon = item.icon;
              const isActive = selectedId === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-white text-gray-900"
                        : "text-gray-700 hover:bg-gray-200/60"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon
                        size={16}
                        className={isActive ? "text-gray-900" : "text-gray-500"}
                      />
                      <span
                        className={`truncate ${
                          isActive ? "font-semibold" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span
                      className={`text-xs ${
                        isActive
                          ? "text-gray-900 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Organization Views accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="organization"
          className="w-full"
        >
          <AccordionItem value={groups[1].id}>
            <AccordionTrigger className="w-full flex items-center justify-between px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200/60 rounded-xl">
              <span>{groups[1].title}</span>
              <ChevronDown size={16} className="text-gray-500" />
            </AccordionTrigger>
            <AccordionContent className="px-1 py-1">
              <ul className="space-y-1">
                {groups[1].items.map((item) => {
                  const isActive = selectedId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSelect(item)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-sm transition-colors ${
                          isActive
                            ? "bg-white text-gray-900 font-semibold"
                            : "text-gray-700 hover:bg-gray-200/60"
                        }`}
                      >
                        <span className="text-left whitespace-pre-line">
                          {item.label}
                        </span>
                        <span
                          className={`text-xs ${
                            isActive ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {formatCount(item.count)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Views;
