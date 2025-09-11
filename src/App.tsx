import Navbar from "./components/dashboard/navbar";
import Views from "./components/dashboard/views";
import ConversationList from "./components/dashboard/conversation-list";
import ConversationContent from "./components/dashboard/conversation-content";
import ConversationDetails from "./components/dashboard/conversation-details";

const App = () => {
  return (
    <div className="h-screen flex">
      <Navbar />
      <Views />
      <ConversationList />
      <ConversationContent />
      <ConversationDetails />
    </div>
  );
};

export default App;
