import { useState, useMemo, useEffect } from "react";
import {
  Languages,
  PanelBottomClose,
  AlarmClock,
  EllipsisVertical,
  CircleMinus,
  Dock,
  Mail,
  ChevronDown,
  Bookmark,
  Paperclip,
  Image,
  WandSparkles,
  CircleCheck,
} from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: string;
};

type ConversationData = {
  id: string;
  email: string;
  type: string;
  messages: Message[];
};

type ConversationContentProps = {
  selectedConversationId?: string;
};

const ConversationContent = ({
  selectedConversationId,
}: ConversationContentProps) => {
  const [messageText, setMessageText] = useState("");
  const [selectedHeaderButton, setSelectedHeaderButton] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock conversation data linked by ID
  const conversationData = useMemo(() => {
    const data: Record<string, ConversationData> = {
      "1": {
        id: "1",
        email: "mathildebd@hotmail.fr",
        type: "Inquiry",
        messages: [
          {
            id: "m1",
            sender: "other",
            content:
              "Bonjour, Je vous relance une énième fois, après un premier message dès réception de la plante en juin, reçue en très mauvaise état. (photos en pièce jointe) Puis un état déplorable de la plante à peine 1 mois et demi après. Je vous ai contacté plusieurs fois avec toutes les photos en pièce jointe comme vous me l'avez demandé. Mais je n'ai JAMAIS reçu de réponse de votre part. Je suis extrêmement déçue de votre SAV je souhaiterai un remboursement de cette plante ou un envoi (avec soin) d'une nouvelle plante.",
            timestamp: "18m",
          },
          {
            id: "m2",
            sender: "other",
            content:
              "Merci pour votre retour rapide et significatif,\n\nCordialement, Mathilde Baufine-Ducrocq 06 72 52 22 45",
            timestamp: "18m",
          },
          {
            id: "m3",
            sender: "user",
            content:
              "Bonjour Mathilde,\n\nJe vous remercie pour votre message et je suis vraiment désolé(e) d'apprendre votre mauvaise expérience, ainsi que d'avoir tant tardé à répondre à vos précédentes demandes. Je comprends parfaitement votre déception.\n\nVotre situation va être transmise immédiatement à notre équipe spécialisée du service client, qui reviendra vers vous par email dans les plus brefs délais (généralement sous 24 heures) afin de trouver une solution satisfaisante à votre demande (remboursement ou envoi d'une nouvelle plante).\n\nMerci pour votre patience et votre compréhension. Notre équipe va traiter votre dossier en priorité.\n\nBien cordialement,\nL'équipe du support Be Green",
            timestamp: "18m",
          },
        ],
      },
      "2": {
        id: "2",
        email: "samieraj2009@outlook.com",
        type: "Order Status",
        messages: [
          {
            id: "m4",
            sender: "other",
            content:
              "Bedankt voor je ordernum... Your order has been processed and will be shipped soon. We appreciate your business...",
            timestamp: "5m",
          },
          {
            id: "m5",
            sender: "user",
            content:
              "Thank you for your order! We're processing it now and will send tracking information shortly.",
            timestamp: "3m",
          },
        ],
      },
      "3": {
        id: "3",
        email: "mathilde.baufine@email.com",
        type: "Inquiry",
        messages: [
          {
            id: "m6",
            sender: "other",
            content:
              "Bonjour, Je vous relance une énième fois, après un premier message...",
            timestamp: "18m",
          },
        ],
      },
      "4": {
        id: "4",
        email: "customer@example.com",
        type: "Order Status",
        messages: [
          {
            id: "m7",
            sender: "other",
            content:
              "I wanted to check on the status of my recent order placed last week. Order number is #12345. Could you please provide an update?",
            timestamp: "25m",
          },
          {
            id: "m8",
            sender: "user",
            content:
              "Hello! I've looked up your order #12345. It's currently being processed and should ship within 24 hours. You'll receive tracking information via email.",
            timestamp: "20m",
          },
        ],
      },
      "5": {
        id: "5",
        email: "john.doe@company.com",
        type: "Return Request",
        messages: [
          {
            id: "m9",
            sender: "other",
            content:
              "I need to return the product I received as it doesn't match the description. The item is in original packaging.",
            timestamp: "32m",
          },
        ],
      },
      "6": {
        id: "6",
        email: "sarah.wilson@gmail.com",
        type: "Technical Support",
        messages: [
          {
            id: "m10",
            sender: "other",
            content:
              "I'm experiencing issues with the software installation. Could you please help? Getting error code 404.",
            timestamp: "45m",
          },
          {
            id: "m11",
            sender: "user",
            content:
              "I can help with that! Error 404 usually indicates a missing component. Please try downloading the latest installer from our website.",
            timestamp: "40m",
          },
        ],
      },
      "7": {
        id: "7",
        email: "admin@marketplace.com",
        type: "Account Verification",
        messages: [
          {
            id: "m12",
            sender: "other",
            content:
              "Please verify your account by clicking the link we sent to your email. The link expires in 24 hours.",
            timestamp: "1h",
          },
        ],
      },
      "8": {
        id: "8",
        email: "billing@service.com",
        type: "Payment Confirmation",
        messages: [
          {
            id: "m13",
            sender: "other",
            content:
              "Your payment has been processed successfully. Thank you for your business. Receipt #PAY-789456.",
            timestamp: "1h 15m",
          },
          {
            id: "m14",
            sender: "user",
            content:
              "Thank you for the confirmation! Your receipt has been sent to your email address.",
            timestamp: "1h 10m",
          },
        ],
      },
      "9": {
        id: "9",
        email: "newsletter@company.com",
        type: "Newsletter",
        messages: [
          {
            id: "m15",
            sender: "other",
            content:
              "Check out our latest updates and special offers in this week's newsletter. Don't miss our 30% off sale!",
            timestamp: "2h",
          },
        ],
      },
      "10": {
        id: "10",
        email: "support@platform.com",
        type: "Feature Request",
        messages: [
          {
            id: "m16",
            sender: "other",
            content:
              "Thank you for your feature request. We've added it to our development roadmap and will update you on progress.",
            timestamp: "3h",
          },
          {
            id: "m17",
            sender: "user",
            content:
              "Great! We appreciate your suggestion. Our development team will review it in the next sprint planning session.",
            timestamp: "2h 55m",
          },
        ],
      },
      "11": {
        id: "11",
        email: "support@company.com",
        type: "Customer Service",
        messages: [
          {
            id: "m18",
            sender: "other",
            content:
              "Thank you for contacting us. We have received your inquiry and will respond within 24 hours.",
            timestamp: "3m",
          },
        ],
      },
      "12": {
        id: "12",
        email: "sales@company.com",
        type: "Product Information",
        messages: [
          {
            id: "m19",
            sender: "other",
            content:
              "Here is the detailed information you requested about our latest product offerings. Please find the catalog attached.",
            timestamp: "12m",
          },
          {
            id: "m20",
            sender: "user",
            content:
              "Thank you for your interest! I've sent you our complete product catalog. Let me know if you need any specific details.",
            timestamp: "8m",
          },
        ],
      },
      "13": {
        id: "13",
        email: "agent@helpdesk.com",
        type: "Follow-up",
        messages: [
          {
            id: "m21",
            sender: "other",
            content:
              "We wanted to follow up on your recent support ticket to ensure everything is working properly.",
            timestamp: "20m",
          },
          {
            id: "m22",
            sender: "user",
            content:
              "Thank you for following up! Yes, the issue has been resolved and everything is working perfectly now.",
            timestamp: "15m",
          },
        ],
      },
      "14": {
        id: "14",
        email: "manager@support.com",
        type: "Escalated Issue",
        messages: [
          {
            id: "m23",
            sender: "other",
            content:
              "Your issue has been escalated to our senior team and we're working on a solution. Expected resolution time is 48 hours.",
            timestamp: "35m",
          },
        ],
      },
      "15": {
        id: "15",
        email: "specialist@technical.com",
        type: "Technical Consultation",
        messages: [
          {
            id: "m24",
            sender: "other",
            content:
              "Based on your requirements, I recommend the following technical approach for your project. Would you like to schedule a call to discuss?",
            timestamp: "1h 5m",
          },
          {
            id: "m25",
            sender: "user",
            content:
              "That sounds perfect! I'd love to schedule a call. What times work best for you this week?",
            timestamp: "1h",
          },
        ],
      },
      "16": {
        id: "16",
        email: "advisor@business.com",
        type: "Business Strategy",
        messages: [
          {
            id: "m26",
            sender: "other",
            content:
              "Let's schedule a call to discuss the business strategy options we outlined in our previous meeting.",
            timestamp: "2h 30m",
          },
        ],
      },
      "17": {
        id: "17",
        email: "bot@autoresponse.com",
        type: "Automated Response",
        messages: [
          {
            id: "m27",
            sender: "other",
            content:
              "This is an automated response. Your ticket has been created and assigned ID #12345. A human agent will respond shortly.",
            timestamp: "1m",
          },
        ],
      },
      "18": {
        id: "18",
        email: "chatbot@support.com",
        type: "FAQ Response",
        messages: [
          {
            id: "m28",
            sender: "other",
            content:
              "Based on your question, here are some helpful resources that might answer your inquiry. Please check our FAQ section.",
            timestamp: "45s",
          },
          {
            id: "m29",
            sender: "user",
            content:
              "Thank you! I found the information I needed in the FAQ. The bot was very helpful.",
            timestamp: "30s",
          },
        ],
      },
      "19": {
        id: "19",
        email: "ai-assistant@platform.com",
        type: "Recommendation",
        messages: [
          {
            id: "m30",
            sender: "other",
            content:
              "Our AI has analyzed your preferences and found these products that might interest you. Check out the personalized recommendations!",
            timestamp: "3m",
          },
        ],
      },
      "20": {
        id: "20",
        email: "bot@scheduling.com",
        type: "Appointment Reminder",
        messages: [
          {
            id: "m31",
            sender: "other",
            content:
              "This is a reminder that you have an appointment scheduled for tomorrow at 2:00 PM. Please confirm your attendance.",
            timestamp: "15m",
          },
          {
            id: "m32",
            sender: "user",
            content:
              "Appointment confirmed! Thank you for the reminder. I'll be there at 2:00 PM sharp.",
            timestamp: "10m",
          },
        ],
      },
      "21": {
        id: "21",
        email: "notification@system.com",
        type: "System Maintenance",
        messages: [
          {
            id: "m33",
            sender: "other",
            content:
              "Scheduled maintenance will occur tonight from 11 PM to 3 AM. Services may be temporarily unavailable during this time.",
            timestamp: "30m",
          },
        ],
      },
      "22": {
        id: "22",
        email: "automailer@newsletter.com",
        type: "Weekly Digest",
        messages: [
          {
            id: "m34",
            sender: "other",
            content:
              "Here's your personalized weekly digest with the most important updates and trending topics from the past week.",
            timestamp: "2h",
          },
        ],
      },
      "23": {
        id: "23",
        email: "partner@business.com",
        type: "Partnership Proposal",
        messages: [
          {
            id: "m35",
            sender: "other",
            content:
              "We would like to discuss a potential partnership opportunity with your organization. Are you available for a meeting next week?",
            timestamp: "30m",
          },
          {
            id: "m36",
            sender: "user",
            content:
              "Thank you for reaching out! I'm very interested in discussing this partnership. Let me check my calendar for next week.",
            timestamp: "25m",
          },
        ],
      },
      "24": {
        id: "24",
        email: "enterprise@solutions.com",
        type: "Enterprise Inquiry",
        messages: [
          {
            id: "m37",
            sender: "other",
            content:
              "We're interested in your enterprise solutions for our 500+ employee organization. Could you provide pricing and implementation details?",
            timestamp: "1h",
          },
        ],
      },
      "25": {
        id: "25",
        email: "procurement@corporation.com",
        type: "Bulk Order",
        messages: [
          {
            id: "m38",
            sender: "other",
            content:
              "We need to place a bulk order for Q2. Can you provide volume pricing and delivery timeline for 1000+ units?",
            timestamp: "2h 15m",
          },
          {
            id: "m39",
            sender: "user",
            content:
              "Absolutely! For orders over 1000 units, we offer significant volume discounts. Let me prepare a custom quote for you.",
            timestamp: "2h 10m",
          },
        ],
      },
      "26": {
        id: "26",
        email: "vendor@supplier.com",
        type: "Contract Renewal",
        messages: [
          {
            id: "m40",
            sender: "other",
            content:
              "Our current contract expires next month. Let's discuss renewal terms and any updates to the service agreement.",
            timestamp: "4h",
          },
        ],
      },
      "27": {
        id: "27",
        email: "delivery@courier.com",
        type: "Delivery Issue",
        messages: [
          {
            id: "m41",
            sender: "other",
            content:
              "There was an issue with the delivery attempt. Customer was not available at the specified address. What should we do next?",
            timestamp: "8m",
          },
          {
            id: "m42",
            sender: "user",
            content:
              "Please attempt redelivery tomorrow between 9 AM - 5 PM. I'll contact the customer to ensure they're available.",
            timestamp: "5m",
          },
        ],
      },
      "28": {
        id: "28",
        email: "logistics@fastship.com",
        type: "Package Delayed",
        messages: [
          {
            id: "m43",
            sender: "other",
            content:
              "Unfortunately, your package has been delayed due to weather conditions. New estimated delivery date is Friday.",
            timestamp: "25m",
          },
        ],
      },
      "29": {
        id: "29",
        email: "dispatch@express.com",
        type: "Urgent Delivery",
        messages: [
          {
            id: "m44",
            sender: "other",
            content:
              "Customer needs same-day delivery for order #EX789. Can we accommodate this request? It's a priority shipment.",
            timestamp: "45m",
          },
          {
            id: "m45",
            sender: "user",
            content:
              "Yes, we can arrange same-day delivery for an additional fee. I'll coordinate with our express courier team.",
            timestamp: "40m",
          },
        ],
      },
      "30": {
        id: "30",
        email: "tracking@shipping.com",
        type: "Package Lost",
        messages: [
          {
            id: "m46",
            sender: "other",
            content:
              "Package tracking shows no updates for 3 days. Investigating possible loss during transit. Will update within 24 hours.",
            timestamp: "1h 20m",
          },
        ],
      },
      "31": {
        id: "31",
        email: "warehouse@distribution.com",
        type: "Damaged Package",
        messages: [
          {
            id: "m47",
            sender: "other",
            content:
              "Customer reported receiving damaged goods. Need to process return and replacement. Photos of damage attached.",
            timestamp: "3h 45m",
          },
          {
            id: "m48",
            sender: "user",
            content:
              "I've processed the return authorization. Replacement will ship today via express delivery at no charge.",
            timestamp: "3h 40m",
          },
        ],
      },
    };
    return data;
  }, []);

  const currentConversation = selectedConversationId
    ? conversationData[selectedConversationId]
    : conversationData["1"];

  const allMessages = currentConversation
    ? [...currentConversation.messages, ...messages]
    : [];

  const handleSendMessage = () => {
    if (messageText.trim() && currentConversation) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        sender: "user",
        content: messageText.trim(),
        timestamp: "now",
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset messages when conversation changes
  useEffect(() => {
    setMessages([]);
  }, [selectedConversationId]);

  if (!currentConversation) {
    return (
      <div className="flex-1 bg-white h-full flex items-center justify-center">
        <div className="text-xl font-bold text-gray-900">
          Please select a conversation
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {currentConversation.email}
          </h1>
          <p className="text-sm text-gray-600">{currentConversation.type}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setSelectedHeaderButton(
                selectedHeaderButton === "languages" ? null : "languages"
              )
            }
            className={`p-2 rounded-md border shadow-sm transition-all ${
              selectedHeaderButton === "languages"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <Languages size={18} />
          </button>
          <button
            onClick={() =>
              setSelectedHeaderButton(
                selectedHeaderButton === "panel" ? null : "panel"
              )
            }
            className={`p-2 rounded-md border shadow-sm transition-all ${
              selectedHeaderButton === "panel"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <PanelBottomClose size={18} />
          </button>
          <button
            onClick={() =>
              setSelectedHeaderButton(
                selectedHeaderButton === "alarm" ? null : "alarm"
              )
            }
            className={`p-2 rounded-md border shadow-sm transition-all ${
              selectedHeaderButton === "alarm"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <AlarmClock size={18} />
          </button>
          <button
            onClick={() =>
              setSelectedHeaderButton(
                selectedHeaderButton === "menu" ? null : "menu"
              )
            }
            className={`p-2 rounded-md border shadow-sm transition-all ${
              selectedHeaderButton === "menu"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {allMessages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender !== "user" && (
              <div className="mr-2 mb-1">
                <CircleMinus size={24} className="text-white" fill="red" />
              </div>
            )}
            <div
              className={`relative max-w-[70%] rounded-lg px-4 py-3 ${
                message.sender === "user"
                  ? "bg-purple-100 text-gray-900 ml-12"
                  : "bg-gray-100 text-gray-900 mr-12"
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed mb-4">
                {message.content}
              </div>

              {/* Timestamp inside message box at bottom-left */}
              <div className="absolute bottom-2 left-3 flex items-center gap-1">
                {message.sender === "user" ? (
                  <>
                    <CircleCheck size={12} className="text-gray-600" />
                    <span className="text-xs text-gray-600">
                      {message.timestamp}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-gray-500">
                    {message.timestamp}
                  </span>
                )}
              </div>
            </div>

            {message.sender === "user" && (
              <div className="ml-2 mb-1">
                <Dock size={24} className="text-white" fill="black" />
              </div>
            )}
          </div>
        ))}

        {/* Handoff message */}
        <div className="text-center py-2">
          <p className="text-xs text-gray-500 italic">
            Handed off conversation. Reason: Handoff request
          </p>
        </div>
      </div>

      {/* Chat Input */}
      <div className="px-6 py-3">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Reply header */}
          <div className="flex items-center gap-2 px-4 py-2">
            <Mail size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">Reply via email</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>

          {/* Text input */}
          <div className="p-3">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type here..."
              className="w-full min-h-[25px] text-sm text-gray-900 placeholder-gray-500 border-none outline-none resize-none"
            />
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <Bookmark size={16} className="text-gray-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <Paperclip size={16} className="text-gray-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <Image size={16} className="text-gray-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <Languages size={16} className="text-gray-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <WandSparkles size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="flex items-center">
              <button
                onClick={handleSendMessage}
                className="px-3 py-1 text-gray-500 text-sm font-medium hover:text-gray-900"
              >
                Send
              </button>
              <div className="w-px h-4 bg-gray-400"></div>
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationContent;
