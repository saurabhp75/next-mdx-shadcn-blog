import { cn } from "@/lib/utils";
import { AlertCircle, Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

type CalloutType = "info" | "warning" | "error" | "success" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
    iconClassName: "text-yellow-500",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-300",
    iconClassName: "text-red-500",
  },
  success: {
    icon: CheckCircle2,
    className: "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300",
    iconClassName: "text-green-500",
  },
  tip: {
    icon: Lightbulb,
    className: "border-purple-500/50 bg-purple-500/10 text-purple-700 dark:text-purple-300",
    iconClassName: "text-purple-500",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        "transition-all duration-200 hover:shadow-md",
        config.className
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold mb-1">{title}</p>
        )}
        <div className="text-sm [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
