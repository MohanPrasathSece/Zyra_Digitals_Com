import { motion } from "framer-motion";
import { Fragment } from "react";

const testimonials = [
  {
    text: "Absolutely mind blowing work! Great rates and work ethic.",
    imageSrc: "https://images.unsplash.com/photo-1494790108754-86d3fa6e6633?w=150&h=150&fit=crop&crop=faces",
    name: "Aryan Kapoor",
    username: "@aryankapoor",
  },
  {
    text: "Best agency! Delivered clean, professional website on time.",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1fa7274bea?w=150&h=150&fit=crop&crop=faces", 
    name: "James Wilson",
    username: "@jameswilson",
  },
  {
    text: "Very reasonable price, looks premium. Highly recommended!",
    imageSrc: "https://images.unsplash.com/photo-1500645920897-880ab4b7ce6?w=150&h=150&fit=crop&crop=faces",
    name: "Ishaan Verma",
    username: "@ishaanverma",
  },
  {
    text: "Perfect messaging and lead magnet that converts!",
    imageSrc: "https://images.unsplash.com/photo-1472099645785-565e1d340db?w=150&h=150&fit=crop&crop=faces",
    name: "Priya Deshpande",
    username: "@priyadesh",
  },
  {
    text: "Reflects clinical precision, makes booking effortless!",
    imageSrc: "https://images.unsplash.com/photo-1438761681033-6d21b6e890b?w=150&h=150&fit=crop&crop=faces",
    name: "Dr. Rohan Kulkarni",
    username: "@drrohan",
  },
  {
    text: "Honors artisans, connects with customers beautifully!",
    imageSrc: "https://images.unsplash.com/photo-1527985506855-2c1c59413e6?w=150&h=150&fit=crop&crop=faces",
    name: "Meera Iyer",
    username: "@meeraiyer",
  },
  {
    text: "Great work, very cooperative. Never faced any issue!",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1fa7274bea?w=150&h=150&fit=crop&crop=faces",
    name: "Sarah Johnson",
    username: "@sarahjohnson",
  },
  {
    text: "Professional website, user-friendly experience. Love it!",
    imageSrc: "https://images.unsplash.com/photo-1494790108754-86d3fa6e6633?w=150&h=150&fit=crop&crop=faces",
    name: "Michael Chen",
    username: "@michaelchen",
  },
  {
    text: "Top-notch service! Exceeded our expectations completely.",
    imageSrc: "https://images.unsplash.com/photo-1500645920897-880ab4b7ce6?w=150&h=150&fit=crop&crop=faces",
    name: "Emma Davis",
    username: "@emmadavis",
  },
  {
    text: "Smooth process, excellent communication. Highly recommend!",
    imageSrc: "https://images.unsplash.com/photo-1472099645785-565e1d340db?w=150&h=150&fit=crop&crop=faces",
    name: "David Lee",
    username: "@davidlee",
  },
  {
    text: "Creative solutions, outstanding results. Five stars!",
    imageSrc: "https://images.unsplash.com/photo-1438761681033-6d21b6e890b?w=150&h=150&fit=crop&crop=faces",
    name: "Lisa Wang",
    username: "@lisawang",
  },
];

const firstRow = testimonials.slice(0, 3);
const secondRow = testimonials.slice(3, 6);
const thirdRow = testimonials.slice(6, 9);

const TestimonialColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 12,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6 mt-10"
    >
      {[...new Array(2)].fill(0).map((_, index) => {
        return (
          <Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username }) => (
              <div key={username} className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-w-sm">
                <div className="text-gray-700 text-sm leading-relaxed mb-5">{text}</div>
                <div className="flex items-center gap-4">
                  <img
                    src={imageSrc}
                    width={48}
                    height={48}
                    alt={name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-gray-900 text-xs leading-tight">
                      {name}
                    </div>
                    <div className="text-gray-500 text-xs leading-tight">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        );
      })}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
        </div>
        <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] overflow-hidden max-h-[700px]">
          <TestimonialColumn testimonials={firstRow} />
          <TestimonialColumn
            className="hidden md:block"
            testimonials={secondRow}
            duration={15}
          />
          <TestimonialColumn
            className="hidden lg:block"
            testimonials={thirdRow}
            duration={18}
          />
        </div>
      </div>
    </section>
  );
};
