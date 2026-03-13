interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface ProcessProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
  className?: string;
}

const defaultSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    description: "Goals, audience, and requirements"
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description: "Wireframes and clean interfaces"
  },
  {
    id: "development",
    number: "03",
    title: "Development",
    description: "Reliable code and performance"
  },
  {
    id: "launch",
    number: "04",
    title: "Launch",
    description: "Deploy, monitor, refine"
  }
];

export const Process = ({
  title = "Our Process",
  subtitle = "From brief to launch — a clear, simple 4‑step journey",
  steps = defaultSteps,
  className = ""
}: ProcessProps) => {
  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="font-secondary text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Process Steps - Minimal Design */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Minimal Connection Line */}
              <div className="absolute top-8 left-0 right-0 h-px bg-border z-0"></div>
              
              {/* Steps */}
              <div className="grid grid-cols-4 gap-8 relative z-10">
                {steps.map((step, index) => (
                  <div key={step.id} className="text-center group">
                    {/* Minimal Number Circle */}
                    <div className="relative mb-8">
                      <div className="w-16 h-16 mx-auto bg-background border-2 border-gold rounded-full flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                        <span className="font-heading text-lg font-bold text-gold group-hover:text-primary transition-colors duration-300">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="font-secondary text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              
              return (
                <div key={step.id} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Number Circle */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-background border-2 border-gold rounded-full flex items-center justify-center">
                        <span className="font-heading text-sm font-bold text-gold">
                          {step.number}
                        </span>
                      </div>
                      {/* Vertical Line */}
                      {!isLast && (
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-px h-8 bg-border"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="font-secondary text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
