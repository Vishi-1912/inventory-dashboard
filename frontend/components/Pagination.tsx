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
        <div className="flex justify-end gap-3 mt-5">

            <button
                disabled={page === 1}
                onClick={onPrevious}
                className="border px-4 py-2 rounded"
            >
                Previous
            </button>

            <span>
                {page} / {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={onNext}
                className="border px-4 py-2 rounded"
            >
                Next
            </button>

        </div>
    );
}