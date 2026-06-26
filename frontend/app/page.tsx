'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { ItemResponse } from '@/types/item';

import ItemsTable from '@/components/ItemsTable';
import Pagination from '@/components/Pagination';
import CategoryFilter from '@/components/CategpryFilter';
import SkeletonTable from '@/components/SkeletonTable';
import ErrorState from '@/components/ErrorState';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  async function fetchItems() {
    try {
      setLoading(true);

      const res: any = await api.get<ItemResponse>('/items', {
        params: {
          page,
          limit: 10,
          category: category || undefined,
        },
      });

      setItems(res.data.data);
      setPagination(res.data.pagination);
      setError('');
    } catch {
      setError('Failed to fetch items.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [page, category]);

  return (
    <main className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Inventory Dashboard
      </h1>

      <CategoryFilter
        value={category}
        onChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
      />

      {error && <ErrorState message={error} />}

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <ItemsTable items={items} />

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPrevious={() => setPage((p) => p - 1)}
            onNext={() => setPage((p) => p + 1)}
          />
        </>
      )}
    </main>
  );
}