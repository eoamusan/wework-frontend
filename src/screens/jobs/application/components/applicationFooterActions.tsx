import { Button } from "@wew/components/ui/button";

type ApplicationFooterActionsProps = {
  backLabel?: string;
  nextLabel: string;
  onBack: () => void;
  onPrimaryAction: () => void;
  onSaveDraft: () => void;
};

export function ApplicationFooterActions({
  backLabel = "Back",
  nextLabel,
  onBack,
  onPrimaryAction,
  onSaveDraft,
}: ApplicationFooterActionsProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#f0edf8] pt-8 sm:flex-row sm:items-center sm:justify-between">
      <Button
        className="h-11 rounded-2xl px-6 text-sm shadow-none hover:translate-y-0"
        onClick={onBack}
        size={null}
        type="button"
        variant="success"
      >
        {backLabel}
      </Button>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="h-11 rounded-2xl px-6 text-sm shadow-none hover:translate-y-0"
          onClick={onSaveDraft}
          size={null}
          type="button"
          variant="success"
        >
          Save as Draft
        </Button>
        <Button
          className="h-11 rounded-2xl px-6 text-sm shadow-none hover:translate-y-0"
          onClick={onPrimaryAction}
          size={null}
          type="button"
          variant="primary"
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
