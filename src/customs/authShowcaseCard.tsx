import Image, { type StaticImageData } from "next/image";

interface AuthShowcaseCardProps {
  alt: string;
  description: string;
  image: StaticImageData;
  title: string;
}

export function AuthShowcaseCard({
  alt,
  description,
  image,
  title,
}: AuthShowcaseCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-black/6 bg-[#f3eadf] shadow-[0_18px_45px_rgba(6,2,18,0.08)]">
      <div className="relative aspect-[1/1.35] min-h-[420px] w-full">
        <Image
          alt={alt}
          className="object-cover object-[center_26%]"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 46vw"
          src={image}
        />

        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.8)_100%)] px-6 pb-8 pt-8 text-center text-white sm:px-9 sm:pb-12">
          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="size-2 rounded-full bg-[#4c1dff]" />
            <span className="size-2 rounded-full bg-white/65" />
            <span className="size-2 rounded-full bg-white/65" />
          </div>

          <h1 className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-white sm:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}
