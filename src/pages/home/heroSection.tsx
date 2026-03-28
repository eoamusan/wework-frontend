"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import searchIcon from "@wew/assets/icons/search.svg";
import homeImage from "@wew/assets/images/home-img.jpg";
import { Button } from "@wew/components/ui/button";

const avatars = [
  {
    alt: "Candidate 1",
    position: "object-[18%_18%]",
  },
  {
    alt: "Candidate 2",
    position: "object-[50%_28%]",
  },
  {
    alt: "Candidate 3",
    position: "object-[62%_55%]",
  },
  {
    alt: "Candidate 4",
    position: "object-[82%_26%]",
  },
] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const contentVariant = shouldReduceMotion
    ? {}
    : {
        animate: {
          transition: {
            delayChildren: 0.12,
            staggerChildren: 0.1,
          },
        },
        initial: {},
      };

  const itemVariant = shouldReduceMotion
    ? {}
    : {
        animate: { opacity: 1, y: 0 },
        initial: { opacity: 0, y: 18 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <section className="relative overflow-hidden bg-[#001a1a] text-white">
      <motion.div
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        className="absolute inset-0"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          alt="Professionals ready for new job opportunities"
          className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
          priority
          src={homeImage}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(51,0,201,0.86)_0%,rgba(51,0,201,0.64)_48%,rgba(0,26,26,0.9)_100%)]" />
      <div className="absolute inset-0 bg-black/10" />

      <motion.div
        animate={contentVariant.animate}
        className="relative z-10 mx-auto flex min-h-[36rem] max-w-4xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8"
        initial={contentVariant.initial}
      >
        <motion.div
          className="mb-7 inline-flex items-center gap-3 rounded-full bg-white px-4 py-1 shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
          {...itemVariant}
        >
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <span
                className="relative size-7 overflow-hidden rounded-full border-2 border-white"
                key={avatar.alt}
              >
                <Image
                  alt={avatar.alt}
                  className={`h-full w-full object-cover ${avatar.position}`}
                  sizes="28px"
                  src={homeImage}
                  priority={index === 0}
                />
              </span>
            ))}
          </div>
          <span className="text-base font-medium text-[#2e3340]">
            Discover a Job Opening
          </span>
        </motion.div>

        <motion.h1
          className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
          {...itemVariant}
        >
          Find Your Next Dream Job
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-sm leading-7 text-white/82 sm:text-base"
          {...itemVariant}
        >
          Explore thousands of job opportunities from leading companies and fast-
          growing start-ups across diverse industries.
        </motion.p>

        <motion.form
          className="mt-9 flex w-full max-w-[27rem] flex-col gap-6 sm:max-w-[40rem] sm:flex-row sm:items-center"
          {...itemVariant}
        >
          <label className="relative block flex-1">
            <Image
              alt="Search icon"
              src={searchIcon}
              width={24}
              height={24}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
            />
            <input
              className="h-13 w-full rounded-xl border-0.2 border-[#FAFAFA] bg-[#EFF6F61A] pr-4 pl-12 text-white outline-none placeholder:text-base placeholder:text-white/50"
              placeholder="Search jobs, departments or locations......."
              type="text"
            />
          </label>

          <Button
            className="h-13 min-w-[6.5rem] rounded-xl px-16 shadow-[0_20px_36px_rgba(51,0,201,0.22)]"
            size={null}
            type="submit"
            variant="primary"
          >
            Search
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
}
