import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, DollarSign, Utensils, Bed, MapIcon, Ticket } from "lucide-react"
import Image from "next/image"

export async function TravelPlan({
  location,
  budget,
  days,
}: {
  location: string
  budget: string
  days: string
}) {
  // In a real app, this would come from the API
  const plan = await generateTravelPlan(location, budget, days)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{days} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
              Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${budget}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
              Destination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{location}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64">
          <Image
            src={`/placeholder.svg?height=400&width=800&text=${encodeURIComponent(location)}`}
            alt={`${location} travel destination`}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Trip Overview</h2>
          <p className="text-gray-700 mb-6">{plan.overview}</p>

          <Tabs defaultValue="itinerary">
            <TabsList className="mb-4">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary" className="space-y-4">
              {plan.itinerary.map((day, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle>Day {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{day}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="accommodations" className="space-y-4">
              {plan.accommodations.map((accommodation, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Bed className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{accommodation.name}</h3>
                    <p className="text-sm text-gray-600">{accommodation.description}</p>
                    <p className="text-sm font-medium mt-1">${accommodation.price} per night</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              {plan.activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Ticket className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{activity.name}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-sm font-medium mt-1">${activity.price} per person</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="mr-2 h-5 w-5" />
              Recommended Restaurants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plan.restaurants.map((restaurant, index) => (
              <div key={index}>
                <h3 className="font-medium">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.description}</p>
                <p className="text-sm text-gray-500">Price range: {restaurant.priceRange}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapIcon className="mr-2 h-5 w-5" />
              Travel Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.tips.map((tip, index) => (
                <li key={index} className="text-gray-700">
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// This would normally be an API call
async function generateTravelPlan(location: string, budget: string, days: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    overview: `Enjoy a wonderful ${days}-day trip to ${location} with a budget of $${budget}. This personalized plan includes the best attractions, accommodations, and dining options to make the most of your visit.`,
    itinerary: Array.from(
      { length: Number.parseInt(days) },
      (_, i) =>
        `Explore the ${i % 2 === 0 ? "historic" : "cultural"} sites of ${location}, including ${["museums", "landmarks", "local markets", "parks", "beaches"][i % 5]}. Enjoy local cuisine and experience the unique atmosphere.`,
    ),
    accommodations: [
      {
        name: `${location} Grand Hotel`,
        description: "Centrally located luxury hotel with excellent amenities",
        price: Math.floor((Number.parseInt(budget) * 0.3) / Number.parseInt(days)),
      },
      {
        name: `${location} Boutique Inn`,
        description: "Charming boutique accommodation with local character",
        price: Math.floor((Number.parseInt(budget) * 0.2) / Number.parseInt(days)),
      },
    ],
    activities: [
      {
        name: `${location} City Tour`,
        description: "Comprehensive guided tour of major attractions",
        price: Math.floor(Number.parseInt(budget) * 0.05),
      },
      {
        name: "Cultural Experience",
        description: "Immersive local cultural activity with hands-on participation",
        price: Math.floor(Number.parseInt(budget) * 0.07),
      },
      {
        name: "Natural Excursion",
        description: "Day trip to nearby natural attractions",
        price: Math.floor(Number.parseInt(budget) * 0.1),
      },
    ],
    restaurants: [
      {
        name: "Local Delicacies",
        description: `Authentic ${location} cuisine in a traditional setting`,
        priceRange: "$$",
      },
      {
        name: "Gourmet Experience",
        description: "Fine dining with innovative local fusion dishes",
        priceRange: "$$$",
      },
      {
        name: "Street Food Tour",
        description: "Casual dining experience with local street vendors",
        priceRange: "$",
      },
    ],
    tips: [
      `Best time to visit ${location} is during the spring and fall seasons for ideal weather.`,
      "Consider purchasing a city pass for discounts on major attractions.",
      "Public transportation is efficient and cost-effective for getting around.",
      "Learn a few basic phrases in the local language to enhance your experience.",
      `${location} is known for its ${["handicrafts", "textiles", "artwork", "jewelry"][Math.floor(Math.random() * 4)]}, which make excellent souvenirs.`,
    ],
  }
}

