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
} from "lucide-react";
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
};

const ConversationList = ({ selectedView }: ConversationListProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

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

  // Random icon selection for conversations
  const getRandomIcon = () => {
    const icons = [CornerUpRight, Plus, RotateCcw];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const getRandomTopRightIcon = () => {
    const icons = [Mail, Instagram];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <div className="w-72 bg-white h-full border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Human</h2>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          <span>
            {totalCount} {isOpen ? "Open" : "Closed"}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 capitalize"
        >
          <span>{sortOrder}</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Conversation List */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto">
          {sortedConversations.map((conversation) => {
            const IconComponent = getRandomIcon();
            const TopRightIcon = getRandomTopRightIcon();
            return (
              <div
                key={conversation.id}
                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Left Icon with Status Circle */}
                  <div className="flex-shrink-0 mt-1 relative">
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

                    <div className="text-sm font-medium text-gray-700 truncate mb-1">
                      {conversation.subject}
                    </div>

                    <div className="text-xs text-gray-500 line-clamp-2">
                      {conversation.lastMessage}
                    </div>

                    <div className="text-xs text-gray-400 mt-2 text-right">
                      {conversation.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConversationList;
