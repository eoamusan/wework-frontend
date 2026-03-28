import Image from "next/image";
import Link from "next/link";

import copyrightIcon from "@wew/assets/icons/copyright.svg";
import facebookIcon from "@wew/assets/icons/facebook.svg";
import instagramIcon from "@wew/assets/icons/instagram.svg";
import linkedinIcon from "@wew/assets/icons/linkedin.svg";
import twitterIcon from "@wew/assets/icons/twitter.svg";
import weWorkLogo from "@wew/assets/icons/white-we-work.svg";
import { Button } from "@wew/components/ui/button";

const footerColumns = [
  {
    links: ["Features", "Pricing", "Help Center"],
    title: "Quick Links",
  },
  {
    links: ["Blog"],
    title: "Resources",
  },
  {
    links: ["Privacy Policy", "Terms of Service"],
    title: "Legal",
  },
  {
    links: ["Support", "Sales"],
    title: "Contact",
  },
] as const;

const socialLinks = [
  {
    alt: "Facebook",
    href: "#",
    icon: facebookIcon,
  },
  {
    alt: "LinkedIn",
    href: "#",
    icon: linkedinIcon,
  },
  {
    alt: "Instagram",
    href: "#",
    icon: instagramIcon,
  },
  {
    alt: "Twitter",
    href: "#",
    icon: twitterIcon,
  },
] as const;

export function Footer() {
  return (
    <footer className="flex justify-center bg-footer-bg text-white">
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-12 px-2 py-12 text-center sm:px-2.5 md:px-3">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr] lg:items-start">
          <div className=" flex max-w-[32rem] flex-col space-y-5">
            <Link
              aria-label="WeWerk home"
              className="inline-flex w-fit items-center"
              href="/"
            >
              <Image
                alt="WeWerk"
                className="h-auto w-[118px]"
                src={weWorkLogo}
              />
            </Link>

            <div className="w-full space-y-1 text-left">
              <h2 className="text-2xl tracking-[-0.03em] text-white">
                Subscribe to our Newsletter!
              </h2>
              <p className="text-sm text-white">
                Stay informed with our latest updates
              </p>
            </div>

            <form className="flex w-full max-w-[26rem] items-center gap-2.5">
              <input
                className="h-13 flex-1 rounded-[0.95rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] px-4 text-base text-white outline-none placeholder:text-[rgba(255,255,255,0.24)]"
                placeholder="Email address"
                type="email"
              />

              <Button
                className="h-13 min-w-[9rem] rounded-[0.95rem] px-7 text-[1.05rem] font-medium shadow-[0_18px_34px_rgba(51,0,201,0.3)]"
                size={null}
                type="submit"
                variant="primary"
              >
                Subscribe
              </Button>
            </form>

            <div className="flex items-center gap-3">
              {socialLinks.map((socialLink) => (
                <Link
                  aria-label={socialLink.alt}
                  className="inline-flex items-center justify-center text-white/90 transition hover:opacity-75"
                  href={socialLink.href}
                  key={socialLink.alt}
                >
                  <Image
                    alt={socialLink.alt}
                    // className="h-4 w-4"
                    src={socialLink.icon}
                    height={24}
                    width={24}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:justify-items-center">
            {footerColumns.map((column) => (
              <div className="space-y-4" key={column.title}>
                <h3 className="font-bold text-white text-left">{column.title}</h3>
                <div className="flex flex-col gap-3">
                  {column.links.map((linkLabel) => (
                    <Link
                      className="text-white transition hover:text-white text-left"
                      href="#"
                      key={linkLabel}
                    >
                      {linkLabel}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 text-[11px] text-white/45">
          <Image
            alt=""
            aria-hidden="true"
            className="h-3 w-3"
            src={copyrightIcon}
          />
          <span>Copyright</span>
          <span>Ondea All Right Reserved</span>
        </div>
      </div>
    </footer>
  );
}
