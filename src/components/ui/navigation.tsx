import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Activity, MessageCircle, Search, BarChart3, Apple } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Food Tracker", href: "/food-tracker", icon: Apple },
  { name: "Search Foods", href: "/search", icon: Search },
  { name: "Diet Coach", href: "/chat", icon: MessageCircle },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Activity className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NutriTrack
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}