import AuctionForm from "@/components/auction-form"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Welcome to Our Auction</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Place your bids on our exclusive auction items. Enter your information and bid amounts below.
          </p>
        </div>

        <AuctionForm />
      </div>
      <Toaster />
    </main>
  )
}
