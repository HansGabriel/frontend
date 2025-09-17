import { useState, useMemo } from "react";
import {
  ChevronDown,
  Mail,
  User,
  Bot,
  Users,
  Building2,
  CornerUpRight,
  Plus,
  RotateCcw,
  Instagram,
  CircleMinus,
  Check,
} from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import type { ViewItem } from "../views";

type ConversationStatus = "blue" | "orange";

type Conversation = {
  id: string;
  email: string;
  subject: string;
  lastMessage: string;
  time: string;
  status: ConversationStatus;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type ConversationListProps = {
  selectedView?: ViewItem;
  onSelectConversation?: (conversationId: string) => void;
};

const ConversationList = ({
  selectedView,
  onSelectConversation,
}: ConversationListProps) => {
  const [filterStatus, setFilterStatus] = useState<
    "open" | "closed" | "snoozed"
  >("open");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const mockConversations = useMemo(() => {
    const baseConversations: Record<string, Conversation[]> = {
      inbox: [
        {
          id: "1",
          email: "bahnischzoard@gmail.com",
          subject: "Re: 3098074 Hello, I don't ...",
          lastMessage:
            "Hello Elena, Thank you for reaching out to our support team regarding your recent order...",
          time: "2m",
          status: "blue",
          icon: User,
        },
        {
          id: "2",
          email: "samieraj2009@outlook.com",
          subject: "Bedankt voor je ordernum...",
          lastMessage:
            "Your order has been processed and will be shipped soon. We appreciate your business...",
          time: "5m",
          status: "orange",
          icon: User,
        },
        {
          id: "3",
          email: "mathilde.baufine@email.com",
          subject: "Inquiry",
          lastMessage:
            "Bonjour, Je vous relance une énième fois, après un premier message...",
          time: "18m",
          status: "blue",
          icon: User,
        },
        {
          id: "4",
          email: "customer@example.com",
          subject: "Order Status Update",
          lastMessage:
            "I wanted to check on the status of my recent order placed last week...",
          time: "25m",
          status: "orange",
          icon: User,
        },
        {
          id: "5",
          email: "john.doe@company.com",
          subject: "Product Return Request",
          lastMessage:
            "I need to return the product I received as it doesn't match the description...",
          time: "32m",
          status: "blue",
          icon: User,
        },
        {
          id: "6",
          email: "sarah.wilson@gmail.com",
          subject: "Technical Support Needed",
          lastMessage:
            "I'm experiencing issues with the software installation. Could you please help?",
          time: "45m",
          status: "orange",
          icon: User,
        },
        {
          id: "7",
          email: "admin@marketplace.com",
          subject: "Account Verification",
          lastMessage:
            "Please verify your account by clicking the link we sent to your email...",
          time: "1h",
          status: "blue",
          icon: User,
        },
        {
          id: "8",
          email: "billing@service.com",
          subject: "Payment Confirmation",
          lastMessage:
            "Your payment has been processed successfully. Thank you for your business...",
          time: "1h 15m",
          status: "orange",
          icon: User,
        },
        {
          id: "9",
          email: "newsletter@company.com",
          subject: "Weekly Newsletter",
          lastMessage:
            "Check out our latest updates and special offers in this week's newsletter...",
          time: "2h",
          status: "blue",
          icon: User,
        },
        {
          id: "10",
          email: "support@platform.com",
          subject: "Feature Request Response",
          lastMessage:
            "Thank you for your feature request. We've added it to our development roadmap...",
          time: "3h",
          status: "orange",
          icon: User,
        },
      ],
      human: [
        {
          id: "11",
          email: "support@company.com",
          subject: "Customer Service Response",
          lastMessage:
            "Thank you for contacting us. We have received your inquiry and will respond within 24 hours...",
          time: "3m",
          status: "blue",
          icon: User,
        },
        {
          id: "12",
          email: "sales@company.com",
          subject: "Product Information Request",
          lastMessage:
            "Here is the detailed information you requested about our latest product offerings...",
          time: "12m",
          status: "orange",
          icon: User,
        },
        {
          id: "13",
          email: "agent@helpdesk.com",
          subject: "Follow-up on Ticket #12345",
          lastMessage:
            "We wanted to follow up on your recent support ticket to ensure everything is working properly...",
          time: "20m",
          status: "blue",
          icon: User,
        },
        {
          id: "14",
          email: "manager@support.com",
          subject: "Escalated Issue Resolution",
          lastMessage:
            "Your issue has been escalated to our senior team and we're working on a solution...",
          time: "35m",
          status: "orange",
          icon: User,
        },
        {
          id: "15",
          email: "specialist@technical.com",
          subject: "Technical Consultation",
          lastMessage:
            "Based on your requirements, I recommend the following technical approach for your project...",
          time: "1h 5m",
          status: "blue",
          icon: User,
        },
        {
          id: "16",
          email: "advisor@business.com",
          subject: "Business Strategy Discussion",
          lastMessage:
            "Let's schedule a call to discuss the business strategy options we outlined in our previous meeting...",
          time: "2h 30m",
          status: "orange",
          icon: User,
        },
      ],
      bot: [
        {
          id: "17",
          email: "bot@autoresponse.com",
          subject: "Automated Response #153",
          lastMessage:
            "This is an automated response. Your ticket has been created and assigned ID #12345...",
          time: "1m",
          status: "blue",
          icon: Bot,
        },
        {
          id: "18",
          email: "chatbot@support.com",
          subject: "FAQ Bot Response",
          lastMessage:
            "Based on your question, here are some helpful resources that might answer your inquiry...",
          time: "45s",
          status: "orange",
          icon: Bot,
        },
        {
          id: "19",
          email: "ai-assistant@platform.com",
          subject: "Smart Recommendation System",
          lastMessage:
            "Our AI has analyzed your preferences and found these products that might interest you...",
          time: "3m",
          status: "blue",
          icon: Bot,
        },
        {
          id: "20",
          email: "bot@scheduling.com",
          subject: "Appointment Reminder",
          lastMessage:
            "This is a reminder that you have an appointment scheduled for tomorrow at 2:00 PM...",
          time: "15m",
          status: "orange",
          icon: Bot,
        },
        {
          id: "21",
          email: "notification@system.com",
          subject: "System Maintenance Alert",
          lastMessage:
            "Scheduled maintenance will occur tonight from 11 PM to 3 AM. Services may be temporarily unavailable...",
          time: "30m",
          status: "blue",
          icon: Bot,
        },
        {
          id: "22",
          email: "automailer@newsletter.com",
          subject: "Weekly Digest #47",
          lastMessage:
            "Here's your personalized weekly digest with the most important updates and trending topics...",
          time: "2h",
          status: "orange",
          icon: Bot,
        },
      ],
      b2b: [
        {
          id: "23",
          email: "partner@business.com",
          subject: "Partnership Proposal",
          lastMessage:
            "We would like to discuss a potential partnership opportunity with your organization...",
          time: "30m",
          status: "blue",
          icon: Building2,
        },
        {
          id: "24",
          email: "enterprise@solutions.com",
          subject: "Enterprise Package Inquiry",
          lastMessage:
            "We're interested in your enterprise solutions for our 500+ employee organization...",
          time: "1h",
          status: "orange",
          icon: Building2,
        },
        {
          id: "25",
          email: "procurement@corporation.com",
          subject: "Bulk Order Request",
          lastMessage:
            "We need to place a bulk order for Q2. Can you provide volume pricing and delivery timeline?",
          time: "2h 15m",
          status: "blue",
          icon: Building2,
        },
        {
          id: "26",
          email: "vendor@supplier.com",
          subject: "Contract Renewal Discussion",
          lastMessage:
            "Our current contract expires next month. Let's discuss renewal terms and any updates...",
          time: "4h",
          status: "orange",
          icon: Building2,
        },
      ],
      courier: [
        {
          id: "27",
          email: "delivery@courier.com",
          subject: "Delivery Issue #CS-2024",
          lastMessage:
            "There was an issue with the delivery attempt. Customer was not available at the specified address...",
          time: "8m",
          status: "orange",
          icon: Users,
        },
        {
          id: "28",
          email: "logistics@fastship.com",
          subject: "Package Delayed",
          lastMessage:
            "Unfortunately, your package has been delayed due to weather conditions. New estimated delivery...",
          time: "25m",
          status: "blue",
          icon: Users,
        },
        {
          id: "29",
          email: "dispatch@express.com",
          subject: "Urgent Delivery Request",
          lastMessage:
            "Customer needs same-day delivery for order #EX789. Can we accommodate this request?",
          time: "45m",
          status: "orange",
          icon: Users,
        },
        {
          id: "30",
          email: "tracking@shipping.com",
          subject: "Package Lost in Transit",
          lastMessage:
            "Package tracking shows no updates for 3 days. Investigating possible loss during transit...",
          time: "1h 20m",
          status: "blue",
          icon: Users,
        },
        {
          id: "31",
          email: "warehouse@distribution.com",
          subject: "Damaged Package Report",
          lastMessage:
            "Customer reported receiving damaged goods. Need to process return and replacement...",
          time: "3h 45m",
          status: "orange",
          icon: Users,
        },
      ],
    };

    return (
      baseConversations[selectedView?.id || "inbox"] || baseConversations.inbox
    );
  }, [selectedView?.id]);

  const sortedConversations = useMemo(() => {
    return [...mockConversations].sort((a, b) => {
      const timeA = parseInt(a.time);
      const timeB = parseInt(b.time);
      return sortOrder === "newest" ? timeA - timeB : timeB - timeA;
    });
  }, [mockConversations, sortOrder]);

  const totalCount = mockConversations.length;

  // Static icon assignments
  const getLeftIcon = (id: string) => {
    const iconMap: Record<
      string,
      React.ComponentType<{ size?: number; className?: string }>
    > = {
      "1": CornerUpRight,
      "2": Plus,
      "3": RotateCcw,
      "11": CornerUpRight,
      "12": Plus,
      "13": RotateCcw,
      "14": CornerUpRight,
      "15": Plus,
      "16": RotateCcw,
      "17": CornerUpRight,
      "18": Plus,
      "19": RotateCcw,
      "20": CornerUpRight,
      "21": Plus,
      "22": RotateCcw,
      "23": CornerUpRight,
      "24": Plus,
      "25": RotateCcw,
      "26": CornerUpRight,
      "27": CornerUpRight,
      "28": Plus,
      "29": RotateCcw,
      "30": CornerUpRight,
      "31": Plus,
    };
    return iconMap[id] || CornerUpRight;
  };

  const getTopRightIcon = (id: string) => {
    const iconMap: Record<
      string,
      React.ComponentType<{ size?: number; className?: string }>
    > = {
      "1": Mail,
      "2": Instagram,
      "3": Mail,
      "11": Mail,
      "12": Instagram,
      "13": Mail,
      "14": Instagram,
      "15": Mail,
      "16": Instagram,
      "17": Mail,
      "18": Instagram,
      "19": Mail,
      "20": Instagram,
      "21": Mail,
      "22": Instagram,
      "23": Mail,
      "24": Instagram,
      "25": Mail,
      "26": Instagram,
      "27": Mail,
      "28": Instagram,
      "29": Mail,
      "30": Instagram,
      "31": Mail,
    };
    return iconMap[id] || Mail;
  };

  const getCircleMinusColor = (id: string) => {
    const colors = [
      "#3b82f6", // blue-500
      "#10b981", // green-500
      "#d97706", // yellow-600
      "#8b5cf6", // purple-500
      "#ec4899", // pink-500
      "#f97316", // orange-500
    ];
    const index = parseInt(id) % colors.length;
    return colors[index];
  };

  return (
    <div className="w-72 bg-white h-full border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Human</h2>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-gray-200/60 data-[state=open]:bg-blue-100 data-[state=open]:text-blue-700">
            <span>
              {totalCount}{" "}
              {filterStatus === "open"
                ? "Open"
                : filterStatus === "closed"
                ? "Closed"
                : "Snoozed"}
            </span>
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem
              onClick={() => setFilterStatus("open")}
              className="flex items-center justify-between"
            >
              <span>Open</span>
              {filterStatus === "open" && <Check size={14} />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("closed")}
              className="flex items-center justify-between"
            >
              <span>Closed</span>
              {filterStatus === "closed" && <Check size={14} />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("snoozed")}
              className="flex items-center justify-between"
            >
              <span>Snoozed</span>
              {filterStatus === "snoozed" && <Check size={14} />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-gray-200/60 data-[state=open]:bg-blue-100 data-[state=open]:text-blue-700 capitalize">
            <span>{sortOrder}</span>
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem className="text-sm text-gray-600 pointer-events-none">
              Sort by
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortOrder("newest")}
              className="flex items-center justify-between"
            >
              <span>Newest</span>
              {sortOrder === "newest" && <Check size={14} />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortOrder("oldest")}
              className="flex items-center justify-between"
            >
              <span>Oldest</span>
              {sortOrder === "oldest" && <Check size={14} />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.map((conversation) => {
          const IconComponent = getLeftIcon(conversation.id);
          const TopRightIcon = getTopRightIcon(conversation.id);
          const isHuman = selectedView?.id === "human";
          const isHovered = hoveredId === conversation.id;
          return (
            <div
              key={conversation.id}
              className={`px-4 py-2 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedConversationId === conversation.id
                  ? "bg-blue-100 rounded-lg mx-2"
                  : "hover:bg-gray-50"
              }`}
              onMouseEnter={() => setHoveredId(conversation.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setSelectedConversationId(conversation.id);
                onSelectConversation?.(conversation.id);
              }}
            >
              <div className="flex items-start gap-3">
                {/* Left Icon with Status Circle or Checkbox on hover */}
                <div className="flex-shrink-0 mt-1 relative">
                  {isHovered ? (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Checkbox />
                    </div>
                  ) : isHuman ? (
                    <>
                      {/* Gray circle background for icon */}
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <IconComponent size={14} className="text-gray-600" />
                      </div>
                      {/* Status Circle positioned on top-right, in front of gray circle */}
                      <div
                        className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          conversation.status === "blue"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        }`}
                      />
                    </>
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <CircleMinus
                        size={30}
                        fill={getCircleMinusColor(conversation.id)}
                        strokeWidth={1}
                        color="white"
                      />
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {conversation.email}
                    </span>

                    {/* Top Right Icon */}
                    <TopRightIcon size={12} className="text-gray-400" />
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs text-gray-500 line-clamp-2 flex-1 mr-2">
                      {conversation.lastMessage}
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0 self-end">
                      {conversation.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;
