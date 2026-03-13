import { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
    scale?: string;
    details?: ReactNode;
  };
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-xl sm:w-[90vw] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{project.title}</DialogTitle>
          <DialogDescription className="text-gold">{project.category}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="w-full overflow-hidden rounded-lg bg-muted aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full object-cover ${project.scale ?? "scale-100"}`}
              loading="lazy"
            />
          </div>

          <p className="text-muted-foreground leading-relaxed">{project.description}</p>

          {project.details && (
            <div className="space-y-6 text-sm sm:text-base text-muted-foreground">
              {project.details}
            </div>
          )}

          <div>
            <h4 className="font-heading font-semibold mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:underline"
            >
              View Project <ExternalLink size={16} />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
