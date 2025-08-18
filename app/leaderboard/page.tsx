import { createClient } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

export default async function LeaderboardPage() {
  const supabase = createClient();

  const { data: bids, error } = await supabase
    .from("bids")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-4 text-red-500">Ошибка при загрузке данных</div>;
  }

  if (!bids || bids.length === 0) {
    return <div className="p-4">Пока нет ставок.</div>;
  }

  // Найдём победителей
  const max1 = Math.max(...bids.map((b) => b.bid_amount_1));
  const max2 = Math.max(...bids.map((b) => b.bid_amount_2));
  const max3 = Math.max(...bids.map((b) => b.bid_amount_3));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏆 Топ участников аукциона</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Имя</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Ставка 1</th>
            <th className="border p-2">Ставка 2</th>
            <th className="border p-2">Ставка 3</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index} className="text-center">
              <td className="bord
