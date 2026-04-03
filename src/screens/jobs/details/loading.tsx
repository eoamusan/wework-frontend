export default function JobDetailsLoadingScreen() {
  return (
    <main className="bg-main-bg">
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-9 px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="h-6 w-32 animate-pulse rounded-full bg-white/70" />
        <div className="h-48 animate-pulse rounded-[1.65rem] bg-white/80 shadow-[0_16px_40px_rgba(7,10,29,0.06)]" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17.25rem]">
          <div className="space-y-6">
            <div className="h-40 animate-pulse rounded-[1.35rem] bg-white/65" />
            <div className="h-52 animate-pulse rounded-[1.35rem] bg-white/65" />
            <div className="h-20 animate-pulse rounded-[1.35rem] bg-white/65" />
          </div>
          <div className="space-y-6">
            <div className="h-72 animate-pulse rounded-[1.35rem] bg-white/80" />
            <div className="h-12 animate-pulse rounded-2xl bg-white/80" />
          </div>
        </div>
      </div>
    </main>
  );
}
