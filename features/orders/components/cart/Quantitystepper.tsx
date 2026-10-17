import { Minus, Plus } from "lucide-react";

type QuantityStepperProps = {
  value: number;
  title: string;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
};

export default function QuantityStepper({
  value,
  title,
  min = 1,
  max = Infinity,
  onChange,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex h-9 items-center rounded-full bg-muted">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        aria-label={`Decrease quantity of ${title}`}
        className="flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>

      <span className="min-w-6 text-center text-sm font-medium" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        aria-label={`Increase quantity of ${title}`}
        className="flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}