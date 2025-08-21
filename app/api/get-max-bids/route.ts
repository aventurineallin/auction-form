import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from("bids")
    .select("bid_amount_1, bid_amount_2, bid_amount_3")

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Failed to fetch" }, { status: 500 })
  }

  const maxBids = {
    bid_amount_1: Math.max(...data.map((bid) => Number(bid.bid_amount_1) || 0)),
    bid_amount_2: Math.max(...data.map((bid) => Number(bid.bid_amount_2) || 0)),
    bid_amount_3: Math.max(...data.map((bid) => Number(bid.bid_amount_3) || 0)),
  }

  return NextResponse.json(maxBids)
}
