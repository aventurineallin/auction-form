import AuctionForm from "@/components/auction-form"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Ласкаво просимо на наш аукціон</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Зробіть свої ставки на наші ексклюзивні лоти для аукціону. Введіть свою інформацію та суми ставок нижче.
          </p>
        </div>

        <AuctionForm />
      </div>
      <Toaster />
    </main>
  )
}
