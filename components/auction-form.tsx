"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { submitBid } from "@/app/actions"

interface BidFormData {
  name: string
  email: string
  bid_amount_1: string
  bid_amount_2: string
  bid_amount_3: string
}

export default function AuctionForm() {
  const [formData, setFormData] = useState<BidFormData>({
    name: "",
    email: "",
    bid_amount_1: "",
    bid_amount_2: "",
    bid_amount_3: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitBid({
        name: formData.name,
        email: formData.email,
        bid_amount_1: Number.parseFloat(formData.bid_amount_1) || 0,
        bid_amount_2: Number.parseFloat(formData.bid_amount_2) || 0,
        bid_amount_3: Number.parseFloat(formData.bid_amount_3) || 0,
      })

      if (result.success) {
        toast({
          title: "Ставку успішно подано!",
          description: "Ваші ставки на аукціоні зареєстровано.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          bid_amount_1: "",
          bid_amount_2: "",
          bid_amount_3: "",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error submitting bid:", error)
      toast({
        title: "Помилка подання ставки",
        description: error instanceof Error ? error.message : "Спробуйте пізніше.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">Торги на аукціоні</CardTitle>
        <CardDescription className="text-lg">ARTBAZA</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-sm">
                Персональна інформація
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ім'я</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Введіть своє повне ім'я"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Пошта</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Введіть свою електронну адресу"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>
            </div>
          </div>

          {/* Bid Amounts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-sm">
                Ставки
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bid_amount_1" className="text-sm font-medium">
                  Ставка на лот 1
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="bid_amount_1"
                    name="bid_amount_1"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.bid_amount_1}
                    onChange={handleInputChange}
                    className="h-12 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bid_amount_2" className="text-sm font-medium">
                  Ставка на лот 2
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="bid_amount_2"
                    name="bid_amount_2"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.bid_amount_2}
                    onChange={handleInputChange}
                    className="h-12 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bid_amount_3" className="text-sm font-medium">
                  Ставка на лот 3
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="bid_amount_3"
                    name="bid_amount_3"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.bid_amount_3}
                    onChange={handleInputChange}
                    className="h-12 pl-8"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Bids..." : "зробити ставку"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
