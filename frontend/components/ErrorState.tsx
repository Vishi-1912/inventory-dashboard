type Props = {
  message: string;
  stale?: boolean;
  onRetry?: () => void;
};

export default function ErrorState({
  message,
  stale = false,
  onRetry,
}: Props) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-danger-bg px-4 py-3 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-danger shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-danger">{message}</p>
        {stale && (
          <p className="text-sm text-danger/80 mt-0.5">
            Showing previously loaded data.
          </p>
        )}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-sm font-medium text-danger underline underline-offset-2 hover:text-danger/80 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
