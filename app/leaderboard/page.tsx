'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';

export default function LeaderboardPage() {
  const [bids, setBids] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bids')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) setError(error.message);
      else setBids(data || []);
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">Ошибка при загрузке данных: {error}</div>;
  }

  if (bids.length === 0) {
    return <div className="p-4">Пока нет ставок.</div>;
  }

  const max1 = Math.max(...bids.map((b) => b.bid_amount_1));
  const max2 = Math.max(...bids.map((b) => b.bid_amount_2));
  const max3 = Math.max(...bids.map((b) => b.bid_amount_3));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏆 Топ участников аукциона</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Имя</th>
            <th className="border px-4 py-2">Ставка 1</th>
            <th className="border px-4 py-2">Ставка 2</th>
            <th className="border px-4 py-2">Ставка 3</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td className="border px-4 py-2">{bid.name}</td>
              <td className="border px-4 py-2">
                {bid.bid_amount_1}
                {bid.bid_amount_1 === max1 && <Badge className="ml-2">Лучшее</Badge>}
              </td>
              <td className="border px-4 py-2">
                {bid.bid_amount_2}
                {bid.bid_amount_2 === max2 && <Badge className="ml-2">Лучшее</Badge>}
              </td>
              <td className="border px-4 py-2">
                {bid.bid_amount_3}
                {bid.bid_amount_3 === max3 && <Badge className="ml-2">Лучшее</Badge>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
