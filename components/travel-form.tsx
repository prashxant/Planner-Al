"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Calendar, DollarSign, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function TravelForm() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState("")
  const [days, setDays] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!location || !budget || !days) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          budget: Number.parseInt(budget),
          days: Number.parseInt(days),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate travel plan")
      }

      router.push(`/results?location=${encodeURIComponent(location)}&budget=${budget}&days=${days}`)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg border-gray-100">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Where do you want to go?</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="location"
                placeholder="City, country, or region"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Your budget (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="1000"
                  className="pl-10"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">Number of days</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="days"
                  type="number"
                  placeholder="7"
                  className="pl-10"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating your plan...
              </>
            ) : (
              "Plan My Trip"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

