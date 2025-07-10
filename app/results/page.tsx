"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Markdown from "react-markdown"

interface TravelPlanData {
  location: string
  budget: string
  days: string
  plan: string
}

export default function ResultsPage() {
  const [travelPlan, setTravelPlan] = useState<TravelPlanData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get the travel plan from sessionStorage
    const storedPlan = sessionStorage.getItem("travelPlan")

    if (storedPlan) {
      setTravelPlan(JSON.parse(storedPlan))
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!travelPlan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 space-y-4">
            <p className="text-center text-muted-foreground">No travel plan found. Please generate a new plan.</p>
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container p-4 sm:p-6 lg:p-8">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl">Your Travel Plan for {travelPlan.location}</CardTitle>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>Budget: {travelPlan.budget}</span>
              <span>•</span>
              <span>Duration: {travelPlan.days} days</span>
            </div>
            <Separator />
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <Markdown>{travelPlan.plan}</Markdown>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t py-4">
        <div className="container flex justify-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TravelAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

