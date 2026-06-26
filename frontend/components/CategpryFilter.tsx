type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function CategoryFilter({
    value,
    onChange,
}: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded px-3 py-2 mb-5"
        >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Clothing">Clothing</option>
        </select>
    );
}