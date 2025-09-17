import { useState, useMemo } from "react";
import {
  Languages,
  PanelBottomClose,
  AlarmClock,
  EllipsisVertical,
  CircleMinus,
  SquareMinus,
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
    };
    return data;
  }, []);

  const currentConversation = selectedConversationId
    ? conversationData[selectedConversationId]
    : conversationData["1"];

  if (!currentConversation) {
    return (
      <div className="flex-1 bg-white h-full flex items-center justify-center">
        <div className="text-gray-500">Select a conversation to view</div>
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
        {currentConversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
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
          </div>
        ))}

        {/* Handoff message */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
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
              <button className="px-3 py-1 text-gray-500 text-sm font-medium hover:text-gray-900">
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
