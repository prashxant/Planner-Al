import { TravelForm } from "@/components/travel-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Plan Your Perfect Trip</h1>
            <p className="text-lg text-gray-600">
              Tell us where you want to go, your budget, and how long you'll stay. Our AI will create a personalized
              travel plan just for you.
            </p>
          </div>

          <TravelForm />
        </div>
      </div>
    </div>
  )
}

