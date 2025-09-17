import { useState } from "react";
import Navbar from "./components/dashboard/navbar";
import Views from "./components/dashboard/views";
import ConversationList from "./components/dashboard/conversation-list";
import ConversationContent from "./components/dashboard/conversation-content";
import ConversationDetails from "./components/dashboard/conversation-details";
import type { ViewItem } from "./components/dashboard/views";

const App = () => {
  const [selectedView, setSelectedView] = useState<ViewItem | undefined>();

  return (
    <div className="h-screen flex">
      <Navbar />
      <Views onSelect={setSelectedView} />
      <ConversationList selectedView={selectedView} />
      <ConversationContent />
      <ConversationDetails />
    </div>
  );
};

export default App;
