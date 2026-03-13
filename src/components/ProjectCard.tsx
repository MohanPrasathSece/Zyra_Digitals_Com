import { type ReactNode } from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  onClick: () => void;
  action?: ReactNode;
}

export const ProjectCard = ({ image, title, category, onClick, action }: ProjectCardProps) => {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
      <button
        onClick={onClick}
        className="flex flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <div className="aspect-video w-full bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover object-center" loading="lazy" />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="font-secondary text-sm text-muted-foreground mb-1">{category}</p>
          <h3 className="font-subheading text-base font-semibold leading-tight truncate sm:text-lg" title={title}>
            {title}
          </h3>
        </div>
      </button>
      {action && <div className="px-4 pb-4 pt-0">{action}</div>}
    </div>
  );
};
