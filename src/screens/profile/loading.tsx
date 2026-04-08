import { Loader } from "@wew/components/ui/loader";

type ProfileLoadingScreenProps = {
  embedded?: boolean;
};

function ProfileLoadingContent() {
  return (
    <div className="rounded-[1.65rem] border border-[#eceaf5] bg-white px-6 py-16 shadow-[0_18px_48px_rgba(7,10,29,0.05)] sm:px-8">
      <div className="flex flex-col items-center justify-center gap-4 text-center text-secondary/80">
        <Loader
          className="text-accent-blue"
          label="Loading profile"
          size="xl"
        />
        <div>
          <p className="text-lg font-semibold text-dark-soft">
            Loading profile
          </p>
          <p className="mt-2 text-sm">Fetching your latest profile details.</p>
        </div>
      </div>
    </div>
  );
}

export default function ProfileLoadingScreen({
  embedded = false,
}: ProfileLoadingScreenProps) {
  if (embedded) {
    return <ProfileLoadingContent />;
  }

  return (
    <main className="bg-main-bg">
      <section className="mx-auto w-full max-w-[86rem] px-5 py-10 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
        <ProfileLoadingContent />
      </section>
    </main>
  );
}
