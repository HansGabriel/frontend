import { useState } from "react";
import {
  PanelRightClose,
  PanelLeftClose,
  ChevronDown,
  Plus,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "../../../lib/utils";

type ConversationDetailsProps = {
  selectedConversationId?: string;
};

const ConversationDetails = ({
  selectedConversationId,
}: ConversationDetailsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tags] = useState(["contact-form"]);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priority, setPriority] = useState("no-priority");

  const priorities = [
    { value: "no-priority", label: "No priority" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  // Mock data based on conversation ID
  const getConversationDetails = (id?: string) => {
    const defaultData = {
      assignee: "Unassigned",
      priority: "No priority",
      customerDetails: {
        name: "Mathilde Baufine...",
        email: "mathildebd@hot...",
      },
      emailThread: {
        to: "mathildebd@hot...",
        from: "maria.l@be.green",
        subject: "Inquiry",
      },
      orders: 2,
      recentConversations: 2,
      conversationDetails: {
        business: "Be Green",
        url: "https://app.octoc...",
        id: "2QabX76NK",
        conversationType: "Customer",
        startDate: "Sep 10, 2025, 10:...",
        languages: "ES, NL",
        messageCount: 7,
        channel: "Web",
        isClosed: "No",
        isHandedOff: "Yes",
        handedOffAt: "Sep 10, 2025, 10:...",
        handedOffTopic: "Unknown",
        orderId: "Unknown",
      },
      systemDetails: {
        cid: "a0f5e9b4-9b35-...",
        bid: "175618ad-2d3b-...",
        oid: "d35cf4a8-877d-...",
      },
      visitedPages: [
        "https://app.octoc.com/dashboard",
        "https://app.octoc.com/conversations",
        "https://app.octoc.com/settings",
      ],
    };

    // Customize based on conversation ID
    if (id === "2") {
      return {
        ...defaultData,
        customerDetails: {
          name: "Samiera J...",
          email: "samieraj2009@outlook.com",
        },
        emailThread: {
          to: "samieraj2009@outlook.com",
          from: "support@company.com",
          subject: "Order Status",
        },
        conversationDetails: {
          ...defaultData.conversationDetails,
          conversationType: "Order Status",
          messageCount: 2,
          languages: "EN",
        },
      };
    }

    return defaultData;
  };

  const data = getConversationDetails(selectedConversationId);

  if (isCollapsed) {
    return (
      <div className="w-12 bg-gray-50 h-full border-l border-gray-200 flex items-start justify-center pt-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-gray-200 rounded-md"
        >
          <PanelLeftClose size={16} className="text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-50 h-full border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-md font-semibold text-gray-900">Details</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 hover:bg-gray-200 rounded-md"
        >
          <PanelRightClose size={16} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Assignee */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Assignee:</span>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{data.assignee}</span>
              <ChevronDown size={12} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Conversation Tags */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">
              CONVERSATION TAGS
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <button className="w-7 h-7 rounded-full border border-gray-300 shadow-sm bg-white flex items-center justify-center hover:bg-gray-50">
              <Plus size={14} className="text-gray-600" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-white border border-gray-300 text-gray-700 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">
              PRIORITY
            </span>
          </div>
          <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={priorityOpen}
                className="w-full justify-between text-xs h-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-black" />
                  {priority
                    ? priorities.find((p) => p.value === priority)?.label
                    : "Select priority..."}
                </div>
                <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search priority..."
                  className="h-8"
                />
                <CommandList>
                  <CommandEmpty>No priority found.</CommandEmpty>
                  <CommandGroup>
                    {priorities.map((p) => (
                      <CommandItem
                        key={p.value}
                        value={p.value}
                        onSelect={(currentValue) => {
                          setPriority(
                            currentValue === priority ? "" : currentValue
                          );
                          setPriorityOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border border-black" />
                          {p.label}
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-3 w-3",
                            priority === p.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Customer Details */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">
              CUSTOMER DETAILS
            </span>
            <button className="text-xs text-black hover:text-gray-700">
              Edit
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Name:</span>
              <span className="text-xs text-gray-900">
                {data.customerDetails.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Email:</span>
              <span className="text-xs text-gray-900">
                {data.customerDetails.email}
              </span>
            </div>
          </div>
        </div>

        {/* Email Thread */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="mb-3">
            <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">
              EMAIL THREAD
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">To:</span>
              <span className="text-xs text-gray-900">
                {data.emailThread.to}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">From:</span>
              <span className="text-xs text-gray-900">
                {data.emailThread.from}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Subject:</span>
              <span className="text-xs text-gray-900">
                {data.emailThread.subject}
              </span>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="px-4 py-3">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="orders" className="border-b border-gray-200">
              <AccordionTrigger className="text-xs font-medium text-gray-900 hover:no-underline py-3 flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                <span>ORDERS ({data.orders})</span>
                <ChevronDown className="h-3 w-3 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 text-xs pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">#86058184:</span>
                    <span className="text-gray-900">Processing</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">#86058183:</span>
                    <span className="text-gray-900">Completed</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="recent-conversations"
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-xs font-medium text-gray-900 hover:no-underline py-3 flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                <span>RECENT CONVERSATIONS ({data.recentConversations})</span>
                <ChevronDown className="h-3 w-3 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 text-xs pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Plant Return Issue:</span>
                    <span className="text-gray-900">2 days ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Order Status Inquiry:</span>
                    <span className="text-gray-900">1 week ago</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="conversation-details"
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-xs font-medium text-gray-900 hover:no-underline py-3 flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                <span>CONVERSATION DETAILS</span>
                <ChevronDown className="h-3 w-3 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 text-xs pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Business:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.business}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">URL:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.url}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">ID:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Conversation...</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.conversationType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Start date:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.startDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Languages:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.languages}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Message cou...</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.messageCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Channel:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.channel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Is closed:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.isClosed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Is handed off:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.isHandedOff}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Handed off at:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.handedOffAt}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Handed off topi...</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.handedOffTopic}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Order ID:</span>
                    <span className="text-gray-900">
                      {data.conversationDetails.orderId}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="system-details"
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-xs font-medium text-gray-900 hover:no-underline py-3 flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                <span>SYSTEM DETAILS</span>
                <ChevronDown className="h-3 w-3 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 text-xs pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">CID:</span>
                    <span className="text-gray-900">
                      {data.systemDetails.cid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">BID:</span>
                    <span className="text-gray-900">
                      {data.systemDetails.bid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">OID:</span>
                    <span className="text-gray-900">
                      {data.systemDetails.oid}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="visited-pages">
              <AccordionTrigger className="text-xs font-medium text-gray-900 hover:no-underline py-3 flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                <span>VISITED PAGES</span>
                <ChevronDown className="h-3 w-3 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pb-3">
                  {data.visitedPages.map((page, index) => (
                    <div
                      key={index}
                      className="text-xs text-blue-600 hover:underline cursor-pointer"
                    >
                      {page}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetails;
