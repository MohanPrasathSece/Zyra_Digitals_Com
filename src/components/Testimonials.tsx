import { motion } from "framer-motion";
import { Fragment } from "react";
import React from "react";
import avatar1 from "@/assets_testimonial/avatar-1.png";
import avatar2 from "@/assets_testimonial/avatar-2.png";
import avatar3 from "@/assets_testimonial/avatar-3.png";
import avatar4 from "@/assets_testimonial/avatar-4.png";
import avatar5 from "@/assets_testimonial/avatar-5.png";
import avatar6 from "@/assets_testimonial/avatar-6.png";
import avatar7 from "@/assets_testimonial/avatar-7.png";
import avatar8 from "@/assets_testimonial/avatar-8.png";
import avatar9 from "@/assets_testimonial/avatar-9.png";

const testimonials = [
  {
    text: "Designed my startup with utmost care. Mohan delivered a professional look on time with exceptional attention to every detail.",
    imageSrc: avatar1,
    name: "Avinash",
    username: "@avinash_tech",
  },
  {
    text: "Absolutely mind blowing work by Zyra Digitals! Mohan is very cooperative and maintains a great work ethic throughout.",
    imageSrc: avatar2,
    name: "Devang Sankhla",
    username: "@devangsankhla",
  },
  {
    text: "Mohan is the best! Zyra Digitals completed our professional website within the deadline with clean, user-friendly pages.",
    imageSrc: avatar3,
    name: "Arjun S",
    username: "@arjun_s",
  },
  {
    text: "Zyra Digitals understands every detail. They made my website and my friend's site with a level of care that Mohan is known for.",
    imageSrc: avatar4,
    name: "Adnan Tamboli",
    username: "@adnantamboli",
  },
  {
    text: "The website for my dental agency is EXCELLENT. Mohan made it visually strong, interactive, and perfectly structured.",
    imageSrc: avatar5,
    name: "Linda",
    username: "@linda_dental",
  },
  {
    text: "Excellent website designer. Mohan is very knowledgeable and Zyra Digitals provided great communication throughout the project.",
    imageSrc: avatar6,
    name: "Ashish Patel",
    username: "@ashish_patel",
  },
  {
    text: "I absolutely loved the outcome of my Website by Zyra Digitals. Mohan was very patient with my preferences and vision.",
    imageSrc: avatar7,
    name: "Janice Ida",
    username: "@janice_ida",
  },
  {
    text: "Extremely satisfied with Zyra Digitals. Mohan's speed and professionalism for my website design was top-notch!",
    imageSrc: avatar1,
    name: "Avinash",
    username: "@avinash_design",
  },
  {
    text: "No delay in responses. Loved working with Zyra Digitals for my startup MVP and seeing it come to life exactly as imagined!",
    imageSrc: avatar2,
    name: "Devang Sankhla",
    username: "@devang_mvp",
  },
  {
    text: "Everything looks very premium and Mohan's pricing was very reasonable. We couldn't be happier with our new brand identity.",
    imageSrc: avatar4,
    name: "Adnan Tamboli",
    username: "@adnan_premium",
  },
  {
    text: "Truly grateful for Zyra Digitals. Mohan is professional and friendly, crafting high-quality work with a premium feel.",
    imageSrc: avatar5,
    name: "Linda",
    username: "@linda_pro",
  },
  {
    text: "Very professional and fast. Zyra Digitals made my website much better than I expected, delivering way ahead of schedule!",
    imageSrc: avatar6,
    name: "Ashish Patel",
    username: "@ashish_fast",
  },
];

const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 8);
const thirdColumn = testimonials.slice(8, 12);

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
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6 mt-10 "
    >
      {[...new Array(2)].fill(0).map((_, index) => {
        return (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username }) => (
              <div key={username} className="card">
                <div className="text-gray-700 text-[15px] leading-relaxed">{text}</div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={imageSrc}
                    width={40}
                    height={40}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="tracking-tight font-medium leading-5 text-gray-900">
                      {name}
                    </div>
                    <div className="leading-5 tracking-tight text-gray-500 text-sm">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        );
      })}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-wrapper text-center mb-24 md:mb-32">
          <div className="flex justify-center">
            <div className="tag border-gold/30 text-gold bg-gold/5 mb-6 text-sm font-bold uppercase tracking-widest">Our Track Record</div>
          </div>
          <h2 className="section-title mt-8 leading-tight">
            Stories of Success And <br /> <span className="text-gold">Digital Growth</span>
          </h2>
          <p className="section-description mt-8 mx-auto max-w-4xl text-[17px]">
            We build exceptional websites, powerful brands, and high-performance growth systems. As the leading web development company in Coimbatore, we ensure your brand stands out.
          </p>
        </div>
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[738px] overflow-hidden mt-10">
          <TestimonialColumn testimonials={firstColumn} duration={12}/>
          <TestimonialColumn
            className="hidden md:block"
            testimonials={secondColumn}
            duration={18}
          />
          <TestimonialColumn
            className="hidden lg:block"
            testimonials={thirdColumn}
            duration={15}
          />
        </div>
      </div>
    </section>
  );
};
