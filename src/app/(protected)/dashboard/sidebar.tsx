"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Bell,
  CalendarCheck,
  Calendar,
  LogOut,
  School,
  Shield,
  HardHat,
  Building2,
  Users,
  ChevronDown,
} from "lucide-react";

import { useAccount } from "../provider";

// User role types
type UserRole = "student" | "osa" | "pe" | "security" | "ppo" | "uao";

// Map role to display name
const getRoleName = (role: UserRole): string => {
  switch (role) {
    case "student":
      return "Student";
    case "osa":
      return "Office of Student Affairs";
    case "pe":
      return "Physical Education";
    case "security":
      return "Security Office";
    case "ppo":
      return "Physical Plant Office";
    case "uao":
      return "University Activities Office";
    default:
      return "User";
  }
};

// Map role to icon
const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case "student":
      return <School size={20} />;
    case "osa":
      return <Users size={20} />;
    case "pe":
      return <HardHat size={20} />;
    case "security":
      return <Shield size={20} />;
    case "ppo":
      return <Building2 size={20} />;
    case "uao":
      return <Users size={20} />;
    default:
      return <User size={20} />;
  }
};

// Define navigation data separately
const navigationItems = [
  // { name: "Dashboard", href: "/", icon: <LayoutDashboard size={18} /> },
  // { name: "Account", href: "/account", icon: <User size={18} /> },
  { name: "Reservation", href: "/dashboard/reservation", icon: <CalendarCheck size={18} /> },
  // { name: "Notification", href: "/dashboard/notification", icon: <Bell size={18} /> },
  // { name: "Calendar", href: "/dashboard/calendar", icon: <Calendar size={18} /> },
];

// Sidebar component
export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { account, revokeToken } = useAccount();
  const [activeItem, setActiveItem] = useState("Reservation");
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const xuBlue = "rgb(40,57,113)"; // Xavier University blue color

  const handleNavigation = (href: string, name: string) => {
    setActiveItem(name);
    router.push(href);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    revokeToken();
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="flex flex-col w-72 bg-white shadow-lg relative z-10">
        {/* Logo Section */}
        <div className="p-5 border-b border-gray-200" style={{ backgroundColor: xuBlue }}>
          <div className="flex justify-center items-center">
            <img
              src="/XU-Logo-Banner.png"
              alt="Xavier University Logo"
              className="h-12 mt-2"
            />
          </div>
        </div>

        {/* Profile Section - Clickable */}
        <div
          className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full text-white shadow-md" style={{ backgroundColor: xuBlue }}>
                {getRoleIcon(account.role as UserRole)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {account.email}
                </p>
                <p className="text-xs mt-1 font-semibold" style={{ color: xuBlue }}>
                  {getRoleName(account.role as UserRole)}
                </p>
              </div>
            </div>
            {/* <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-300 ${profileOpen ? 'transform rotate-180' : ''}`}
            /> */}
          </div>

          {/* Profile dropdown */}
          {profileOpen && (
            <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
              <div className="text-xs text-gray-500 px-1">
                <p className="mb-1">Email: {account.email}</p>
                <p>Role: {account.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href, item.name)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeItem === item.name
                    ? "bg-blue-50 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={{ color: activeItem === item.name ? xuBlue : undefined }}
              >
                <span className={`mr-3 ${activeItem === item.name ? "text-blue-600" : "text-gray-500"}`}>
                  {item.icon}
                </span>
                {item.name}
                {activeItem === item.name && (
                  <div className="w-1 h-full absolute right-0 rounded-l-full" style={{ backgroundColor: xuBlue }} />
                )}
              </button>
            ))}
          </div>

          {/* Logout section at bottom */}
          <div className="mt-6 pt-6 border-t border-gray-200 px-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <span className="mr-3 text-gray-500">
                <LogOut size={18} />
              </span>
              Logout
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-200">
          © 2025 Xavier University
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto relative">
        {children}
      </div>
    </div>
  );
}