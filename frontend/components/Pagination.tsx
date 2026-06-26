type Props = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
      <p className="text-sm text-muted">
        Page <span className="font-medium text-foreground">{page}</span> of{' '}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={onPrevious}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          disabled={totalPages === 0 || page >= totalPages}
          onClick={onNext}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
