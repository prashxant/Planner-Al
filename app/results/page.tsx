import { Suspense } from "react"
import { TravelPlan } from "@/components/travel-plan"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { location?: string; budget?: string; days?: string }
}) {
  const { location, budget, days } = searchParams

  if (!location || !budget || !days) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Missing information</h1>
        <p className="mb-6">Please go back and fill in all the required fields.</p>
        <Button asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to search
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Trip to {location}</h1>
        <p className="text-gray-600">
          {days} days · ${budget} budget
        </p>
      </div>

      <Suspense fallback={<LoadingState />}>
        <TravelPlan location={location} budget={budget} days={days} />
      </Suspense>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
      <p className="text-lg text-gray-600">Generating your personalized travel plan...</p>
    </div>
  )
}

