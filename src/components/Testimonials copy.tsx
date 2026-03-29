"use client";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { Fragment } from "react";
import React from "react";

const testimonials = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: "/assets_testimonial/avatar1.png",
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool. ",
    imageSrc: "/assets_testimonial/avatar2.png",
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: "/assets_testimonial/avatar3.png",
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: "/assets_testimonial/avatar4.png",
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: "/assets_testimonial/avatar5.png",
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: "/assets_testimonial/avatar6.png",
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: "/assets_testimonial/avatar7.png",
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: "/assets_testimonial/avatar8.png",
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: "/assets_testimonial/avatar9.png",
    name: "Casey Harper",
    username: "@casey09",
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

export const TestimonialsCopy = () => {
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
