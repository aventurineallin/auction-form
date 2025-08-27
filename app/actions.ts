"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export interface BidData {
  name: string
  email: string
  bid_big: number
  bid_medium: number
  bid_small: number
}

export async function submitBid(bidData: BidData) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("bids").insert([
      {
        name: bidData.name,
        email: bidData.email,
        bid_big: bidData.bid_big,
        bid_medium: bidData.bid_medium,
        bid_small: bidData.bid_small,
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
