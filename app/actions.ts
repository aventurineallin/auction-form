"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export interface BidData {
  name: string
  email: string
  bid_amount_1: number
  bid_amount_2: number
  bid_amount_3: number
}

export async function submitBid(bidData: BidData) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("bids").insert([
      {
        name: bidData.name,
        email: bidData.email,
        bid_amount_1: bidData.bid_amount_1,
        bid_amount_2: bidData.bid_amount_2,
        bid_amount_3: bidData.bid_amount_3,
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Server action error:", error)
    return { success: false, error: "Failed to submit bid" }
  }
}
