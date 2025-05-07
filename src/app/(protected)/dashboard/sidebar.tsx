"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
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
  Menu,
  X
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
      return "University Athletics Office";
    default:
      return "User";
  }
};

// Map role to icon
const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case "student":
      return <School className="text-white" />;
    case "osa":
      return <Users className="text-white" />;
    case "pe":
      return <HardHat className="text-white" />;
    case "security":
      return <Shield className="text-white" />;
    case "ppo":
      return <Building2 className="text-white" />;
    case "uao":
      return <Users className="text-white" />;
    default:
      return <User className="text-white" />;
  }
};

// Define navigation data
const navigationItems = [
  // { name: "Dashboard", href: "/", icon: <LayoutDashboard size={18} /> },
  // { name: "Account", href: "/account", icon: <User size={18} /> },
  { name: "Reservation", href: "/dashboard/reservation", icon: <CalendarCheck size={18} /> },
  { name: "Notification", href: "/dashboard/notification/student/notification", icon: <Bell size={18} /> },
  { name: "Calendar", href: "/dashboard/calendar", icon: <Calendar size={18} /> }
];

// Sidebar component
export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { account, revokeToken } = useAccount();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const xuBlue = "rgb(40,57,113)"; // Xavier University blue color

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    revokeToken();
  };

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Mobile menu button - visible on small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-white shadow-md"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - hidden on small screens unless menu is open */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-300 ease-in-out lg:flex lg:flex-col w-72 bg-white shadow-lg z-40`}>
        {/* Logo Section */}
        <div className="p-5 border-b border-gray-200" style={{ backgroundColor: xuBlue }}>
          <div className="flex justify-center items-center">
            <img
              src="/XU-Logo-Banner.png"
              alt="Xavier University Logo"
              className="h-16"
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-5 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
          <div
            className="flex items-center justify-between"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full shadow-md" style={{ backgroundColor: xuBlue }}>
                {getRoleIcon(account.role as UserRole)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {account.email}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {getRoleName(account.role as UserRole)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${active
                    ? "bg-blue-50 font-medium text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <span className={`mr-3 ${active ? "text-blue-600" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  {item.name}
                  {active && (
                    <div
                      className="w-1 h-8 absolute right-0 rounded-l-full"
                      style={{ backgroundColor: xuBlue }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer with Logout */}
        <div className="mt-auto">
          {/* Logout button at the bottom */}
          <div className="px-3 pb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 group"
            >
              <span className="mr-3 text-gray-500 group-hover:text-red-500">
                <LogOut size={20} />
              </span>
              Logout
            </button>
          </div>

          {/* Copyright footer */}
          <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-200">
            © 2025 Xavier University
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto relative lg:ml-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}