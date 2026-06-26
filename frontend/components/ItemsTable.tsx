import { Item } from '@/types/item';

export default function ItemsTable({
    items,
}: {
    items: Item[];
}) {
    return (
        <table className="w-full border">
            <thead className="bg-gray-100">
                <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Stock</th>
                </tr>
            </thead>

            <tbody>
                {items.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td>{item.name}</td>
                        <td>{item.sku}</td>
                        <td>{item.category}</td>
                        <td>{item.stockCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}