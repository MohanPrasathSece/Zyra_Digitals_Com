import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  return (
    <div className="group bg-card rounded-2xl border border-border/60 p-5 shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-gold/5 hover:border-gold/20 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:scale-[1.02] flex flex-col items-start gap-4 h-full">
      <div className="relative p-2.5 rounded-xl bg-secondary/50 transition-colors duration-500 ease-premium group-hover:bg-secondary">
        <Icon
          size={24}
          strokeWidth={1.5}
          className="text-foreground/80 transition-colors duration-500 ease-premium group-hover:text-foreground"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-secondary text-[22px] font-semibold tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
          {title}
        </h3>

        <p className="font-secondary text-[15px] leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/75">
          {description}
        </p>
      </div>

      {/* Decorative minimal indicator (Shuttle Animation) */}
      <div className="mt-auto pt-4 w-full overflow-hidden">
        <div className="h-[2px] w-full max-w-[40px] bg-gold -translate-x-full transition-transform duration-500 ease-premium group-hover:translate-x-0" />
      </div>
    </div>
  );
};
