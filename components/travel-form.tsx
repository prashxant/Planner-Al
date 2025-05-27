"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateTravelPlan } from "@/app/actions"

export function TravelForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const location = formData.get("location") as string
    const budget = formData.get("budget") as string
    const days = formData.get("days") as string

    try {
      const result = await generateTravelPlan(location, budget, days)

      // Store the result in sessionStorage to access it on the results page
      sessionStorage.setItem(
        "travelPlan",
        JSON.stringify({
          location,
          budget,
          days,
          plan: result,
        }),
      )

      router.push("/results")
    } catch (error) {
      console.error("Error generating travel plan:", error)
      alert("Failed to generate travel plan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Destination</Label>
            <Input id="location" name="location" placeholder="e.g., Paris, Tokyo, New York" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input id="budget" name="budget" placeholder="e.g., $1000, €2000" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="days">Duration (days)</Label>
            <Input id="days" name="days" type="number" min="1" max="30" placeholder="e.g., 7" required />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              "Generate Travel Plan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
