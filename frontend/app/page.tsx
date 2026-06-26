'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import api from '@/services/api';
import { Item, ItemResponse, Pagination as PaginationMeta } from '@/types/item';

import ItemsTable from '@/components/ItemsTable';
import Pagination from '@/components/Pagination';
import CategoryFilter from '@/components/CategoryFilter';
import SkeletonTable from '@/components/SkeletonTable';
import ErrorState from '@/components/ErrorState';

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Network error. Check your connection and try again.';
    }
    if (error.response.status === 404) {
      return 'Items endpoint not found. Check API configuration.';
    }
    return `Server error (${error.response.status}). Please try again.`;
  }
  return 'Failed to fetch items. Please try again.';
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get<ItemResponse>('/items', {
        params: {
          page,
          limit: 10,
          category: category || undefined,
        },
      });

      setItems(res.data.data);
      setPagination(res.data.pagination);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [page, category]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const lowStockCount = items.filter((item) => item.stockCount < 10).length;
  const hasCachedData = error !== '' && items.length > 0;
  const showSkeleton = loading && items.length === 0;

  return (
    <div className="min-h-full bg-background">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Inventory
          </h1>
          <p className="text-sm text-muted mt-1">
            View and manage inventory items across all categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Total Items"
            value={loading && items.length === 0 ? '—' : pagination.total.toLocaleString()}
            color="blue"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            }
          />
          <StatCard
            label="Showing"
            value={loading && items.length === 0 ? '—' : String(items.length)}
            color="blue"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            }
          />
          <StatCard
            label="Low Stock"
            value={loading && items.length === 0 ? '—' : String(lowStockCount)}
            color="red"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            }
          />
        </div>

        <div className="rounded-2xl bg-surface border border-border shadow-sm">
          <div className="px-6 pt-5 pb-4">
            <CategoryFilter
              value={category}
              disabled={loading}
              onChange={(value) => {
                setCategory(value);
                setPage(1);
              }}
            />
          </div>

          <div className="px-6 pb-6">
            {error && (
              <ErrorState
                message={error}
                stale={hasCachedData}
                onRetry={fetchItems}
              />
            )}

            {showSkeleton ? (
              <SkeletonTable />
            ) : (
              <div className={loading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
                <ItemsTable items={items} />
              </div>
            )}

            {!showSkeleton && (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                loading={loading}
                onPrevious={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: 'blue' | 'red';
  icon: React.ReactNode;
}) {
  const iconBg = color === 'blue' ? 'bg-primary-muted text-primary' : 'bg-danger-bg text-danger';
  const valueColor = color === 'blue' ? 'text-primary' : 'text-danger';

  return (
    <div className="rounded-2xl bg-surface border border-border p-5 shadow-sm flex items-center gap-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-light">{label}</p>
        <p className={`mt-0.5 text-2xl font-bold tabular-nums ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}
