import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "accent";
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = "default",
  className 
}: StatsCardProps) {
  const variantStyles = {
    default: "bg-gradient-card border-border",
    success: "bg-gradient-success border-success/20",
    warning: "bg-gradient-accent border-warning/20", 
    accent: "bg-gradient-accent border-accent/20",
  };

  const iconStyles = {
    default: "text-primary",
    success: "text-success-foreground",
    warning: "text-warning-foreground",
    accent: "text-accent-foreground",
  };

  return (
    <div className={cn(
      "p-6 rounded-lg border shadow-soft transition-all duration-300 hover:shadow-medium",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "h-12 w-12 rounded-full bg-background/10 flex items-center justify-center",
          iconStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}