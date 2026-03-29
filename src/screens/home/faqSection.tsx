"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import minusIcon from "@wew/assets/icons/minus.svg";
import plusIcon from "@wew/assets/icons/plus.svg";
import { cn } from "@wew/lib/utils";

const faqs = [
  {
    answer:
      "To apply, create an account and complete your profile with your skills, experience, and portfolio. Browse available roles, apply directly to positions that match your expertise, and track responses from employers through your dashboard.",
    id: "apply-for-job",
    question: "How do I apply for a job on Oneda?",
  },
  {
    answer:
      "Yes. Companies on Oneda go through a verification process to help ensure applicants engage with legitimate employers and credible job opportunities.",
    id: "company-verification",
    question: "Are companies on Oneda verified?",
  },
  {
    answer:
      "Employers search profiles, review applications, and use role-specific filters to identify candidates whose experience, skills, and availability align with their hiring needs.",
    id: "employers-find-candidates",
    question: "How do employers find candidates on Oneda?",
  },
  {
    answer:
      "Yes. Oneda is free for job applicants, making it easy to explore opportunities, apply to roles, and manage your job search in one place.",
    id: "free-for-applicants",
    question: "Is Oneda free for job applicants?",
  },
  {
    answer:
      "Oneda features opportunities across engineering, design, product, operations, marketing, customer success, and other professional roles for different experience levels.",
    id: "available-role-types",
    question: "What types of roles are available on Oneda?",
  },
  {
    answer:
      "Candidate quality is supported through structured profiles, skill-focused applications, and screening steps that help surface qualified and relevant talent to employers.",
    id: "candidate-quality",
    question: "How does Oneda ensure candidate quality?",
  },
  {
    answer:
      "Yes. Companies can hire remote and international talent on Oneda, giving them access to a wider pool of professionals across locations and time zones.",
    id: "remote-and-international",
    question: "Can companies hire remote or international talent?",
  },
] as const;

export function FaqSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<
    (typeof faqs)[number]["id"] | null
  >(faqs[0].id);

  return (
    <section className="bg-main-bg py-16 sm:py-6 md:mb-16">
      <div className="mx-auto flex w-full max-w-[58rem] flex-col items-center px-4 sm:px-6">
        <motion.div
          className="max-w-2xl text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-dark-soft sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-secondary/80 sm:text-base">
            Clear answers to common questions, helping applicants and companies
            understand how Oneda works and get started quickly.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex w-full flex-col gap-5"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.15 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          {faqs.map((faq, index) => {
            const isActive = faq.id === activeId;

            return (
              <motion.article
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.01,
                        y: -4,
                      }
                }
                className={cn(
                  "group overflow-hidden rounded-2xl border border-[#e7e2f1] bg-white py-1 shadow-[0_10px_30px_rgba(51,0,201,0.06)] transition-[transform,box-shadow,border-color] duration-300",
                  isActive &&
                    "shadow-[0_18px_40px_rgba(51,0,201,0.10)]",
                )}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                key={faq.id}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.04,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              >
                <button
                  aria-controls={`${faq.id}-answer`}
                  aria-expanded={isActive}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition-colors duration-300 sm:px-6",
                    isActive ? "bg-[#faf8ff]" : "group-hover:bg-[#fcfbff]",
                  )}
                  onClick={() => setActiveId(isActive ? null : faq.id)}
                  type="button"
                >
                  <span
                    className={cn(
                      "text-xl font-semibold leading-tight text-dark-soft transition-colors duration-200 sm:text-2xl",
                      isActive && "text-[#3300C9]",
                    )}
                  >
                    {faq.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full text-[2rem] leading-none text-[#3300C9] transition-[transform,background-color,box-shadow] duration-300",
                      isActive
                        ? "translate-y-[-1px] bg-[#f1ebff] shadow-[0_8px_20px_rgba(51,0,201,0.10)]"
                        : "group-hover:bg-[#f7f2ff] group-hover:shadow-[0_8px_20px_rgba(51,0,201,0.08)]",
                    )}
                  >
                    {isActive ? (
                      <Image alt="Minus" src={minusIcon} height={24} width={24} />
                    ) : (
                      <Image alt="Plus" src={plusIcon} height={24} width={24} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className="overflow-hidden"
                      exit={{ height: 0, opacity: 0 }}
                      id={`${faq.id}-answer`}
                      initial={
                        shouldReduceMotion ? false : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-base leading-7 text-secondary sm:px-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
