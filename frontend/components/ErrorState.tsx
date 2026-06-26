export default function ErrorState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-danger-bg px-4 py-3 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-danger shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
      <p className="text-sm font-medium text-danger">{message}</p>
    </div>
  );
}
