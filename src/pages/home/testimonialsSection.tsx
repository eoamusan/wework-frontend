"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import getHiredImage from "@wew/assets/images/get-hired.png";

const testimonials = [
  {
    id: "aisha-bello",
    name: "Aisha Bello",
    objectPosition: "object-[20%_35%]",
    quote:
      "We sourced multiple qualified candidates through Oneda in a short time. The platform attracts professionals who are genuinely prepared and vetted, which makes hiring faster and more reliable.",
    role: "HR Consultant",
  },
  {
    id: "daniel-mensah",
    name: "Daniel Mensah",
    objectPosition: "object-[49%_30%]",
    quote:
      "Oneda stands out because the companies here value quality talent. I found a role that matched my skills perfectly, and the application process was smooth and professional from start to finish.",
    role: "Senior Software Engineer",
  },
  {
    id: "zainab-lawal",
    name: "Zainab Lawal",
    objectPosition: "object-[78%_27%]",
    quote:
      "Applying through Oneda felt different from other job platforms. The roles were clear, the companies were credible. I connected with serious employers and landed interviews that matched my experience.",
    role: "Senior Product Designer",
  },
  {
    id: "michael-okocha",
    name: "Michael Okocha",
    objectPosition: "object-[92%_50%]",
    quote:
      "Oneda helped me focus on roles that actually aligned with my experience. The process was transparent, and the conversations I had with companies were thoughtful and worth my time.",
    role: "CTO at Inters",
  },
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    objectPosition: "object-[24%_42%]",
    quote:
      "The quality of opportunities on Oneda made my search feel intentional again. I was able to speak with teams that understood my background and moved quickly when there was a fit.",
    role: "Marketing Lead",
  },
  {
    id: "samuel-addo",
    name: "Samuel Addo",
    objectPosition: "object-[58%_26%]",
    quote:
      "Hiring through Oneda saved us time because the candidates came in prepared. We spent less time filtering and more time interviewing people who were genuinely aligned with the role.",
    role: "Talent Acquisition Manager",
  },
  {
    id: "ifeoma-nwosu",
    name: "Ifeoma Nwosu",
    objectPosition: "object-[72%_34%]",
    quote:
      "What stood out for me was the clarity. The roles were well described, communication stayed consistent, and I always knew where I stood during the hiring process.",
    role: "Customer Success Manager",
  },
  {
    id: "kwame-boadu",
    name: "Kwame Boadu",
    objectPosition: "object-[86%_40%]",
    quote:
      "We needed experienced product and engineering candidates quickly, and Oneda delivered a strong shortlist within days. It felt like a platform built for serious companies and serious talent.",
    role: "Operations Director",
  },
] as const;

const stars = Array.from({ length: 5 }, (_, index) => index);
const marqueeTestimonials = [...testimonials, ...testimonials];

export function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#3300C9_0%,#001A1A_100%)] py-16 text-white sm:py-16">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col items-center gap-12 px-2 sm:px-2.5 md:px-3">
        <motion.div
          className="max-w-3xl text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Testimonials
          </h2>
          <p className="mt-6 text-base leading-7 text-white/80 md:max-w-xl">
            Trusted by top talent and companies to connect reliable applicants
            with meaningful opportunities, faster and smarter.
          </p>
        </motion.div>

        <motion.div
          className="w-full overflow-hidden pb-2"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: ["0%", "-50%"],
                  }
            }
            className="flex w-max gap-6"
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 45,
                    ease: "linear",
                    repeat: Infinity,
                  }
            }
          >
            {marqueeTestimonials.map((testimonial, index) => (
              <motion.article
                className="group relative h-[23rem] w-[21rem] shrink-0 overflow-hidden rounded-[1.35rem] bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:w-[23rem]"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                key={`${testimonial.id}-${index}`}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              >
                <Image
                  alt={testimonial.name}
                  className={`absolute inset-0 h-full w-full object-cover object-[center_10%] transition duration-500 group-hover:scale-[1.03] ${testimonial.objectPosition}`}
                  fill
                  sizes="(max-width: 640px) 21rem, (max-width: 1024px) 23rem, 23rem"
                  src={getHiredImage}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.28)_35%,rgba(0,0,0,0.7)_100%)]" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                  <div>
                    <h3 className="text-[1.1rem] font-semibold">{testimonial.name}</h3>
                    <p className="mt-1 text-sm text-white/78">{testimonial.role}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {stars.map((star) => (
                      <span className="text-lg leading-none text-[#ffc93c]" key={star}>
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-sm leading-8 text-white/82">{testimonial.quote}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
