import { createClient } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"

export default async function LeaderboardPage() {
  const supabase = createClient()

  const { data: bids, error } = await supabase.from("bids").select("*").order("created_at", { ascending: false })

  if (error) {
    return <div className="p-4 text-red-500">Error loading data</div>
  }

  if (!bids || bids.length === 0) {
    return <div className="p-4">No bids yet.</div>
  }

  const maxBig = Math.max(...bids.map((b) => b.bid_big || 0))
  const maxMedium = Math.max(...bids.map((b) => b.bid_medium || 0))
  const maxSmall = Math.max(...bids.map((b) => b.bid_small || 0))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏆 Auction Leaderboard</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Big Item Bid</th>
            <th className="border p-2">Medium Item Bid</th>
            <th className="border p-2">Small Item Bid</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{bid.name}</td>
              <td className="border p-2">{bid.email}</td>
              <td className="border p-2">
                ${bid.bid_big || 0}
                {bid.bid_big === maxBig && bid.bid_big > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    Highest
                  </Badge>
                )}
              </td>
              <td className="border p-2">
                ${bid.bid_medium || 0}
                {bid.bid_medium === maxMedium && bid.bid_medium > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    Highest
                  </Badge>
                )}
              </td>
              <td className="border p-2">
                ${bid.bid_small || 0}
                {bid.bid_small === maxSmall && bid.bid_small > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    Highest
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
