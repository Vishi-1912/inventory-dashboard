import { Item } from '@/types/item';

function StockIndicator({ count }: { count: number }) {
  if (count < 10) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
        <span className="text-danger">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
        </span>
        {count}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
      <span className="text-success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
        </svg>
      </span>
      {count}
    </span>
  );
}

export default function ItemsTable({
  items,
}: {
  items: Item[];
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border-t border-border">
        <p className="text-sm font-medium text-foreground">No items found</p>
        <p className="text-sm text-muted mt-1">Try adjusting your category filter.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border-t border-border">
      <table className="w-full min-w-[540px]">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light">
              SKU
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-light">
              Stock
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border last:border-b-0 transition-colors hover:bg-surface-muted/60"
            >
              <td className="px-4 py-3.5">
                <span className="text-sm text-foreground">{item.name}</span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-sm text-muted">{item.sku}</span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-sm text-foreground">{item.category}</span>
              </td>
              <td className="px-4 py-3.5">
                <StockIndicator count={item.stockCount} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
