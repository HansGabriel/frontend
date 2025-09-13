import { Inbox, ChartColumnIncreasing, Settings, Headset } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState("/");

  const navigationItems = [
    { icon: Inbox, href: "/", label: "Inbox" },
    { icon: ChartColumnIncreasing, href: "/views", label: "Views" },
    { icon: Settings, href: "/settings", label: "Settings" },
  ];

  return (
    <div className="w-10 bg-gray-100 h-full flex flex-col justify-between border-r border-gray-200">
      {/* Top Section */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="p-2 mt-2">
          <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col items-stretch mt-4 w-full">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = selectedItem === item.href;

            return (
              <div
                key={index}
                onClick={() => setSelectedItem(item.href)}
                className={`py-3 cursor-pointer transition-colors flex items-center justify-center ${
                  isActive
                    ? "bg-white text-blue-600"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                }`}
                title={item.label}
              >
                <IconComponent size={16} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center pb-3 space-y-5">
        {/* Headset with pill background and number inside */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-300 rounded-full px-2 py-2 cursor-pointer hover:bg-gray-400 transition-colors flex flex-col items-center">
            <Headset size={14} className="text-gray-700" />
            <span className="text-xs text-gray-700 mt-2">0</span>
          </div>
        </div>

        {/* FL Profile */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-800 font-medium">FL</span>
        </div>

        {/* LU Profile Circle */}
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-900 transition-colors">
            <span className="text-white text-xs font-medium">LU</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
