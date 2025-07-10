import { TravelForm } from "@/components/travel-form"
import { Mountain } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <Mountain className="h-6 w-6" />
            <span>TravelAI</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-md w-full space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Plan Your Perfect Trip</h1>
            <p className="text-muted-foreground">
              Enter your destination, budget, and trip duration to get AI-powered travel recommendations.
            </p>
          </div>
          <TravelForm />
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex justify-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TravelAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

