"use server"

import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

// Create Google provider instance with explicit API key
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

export async function generateTravelPlan(location: string, budget: string, days: string) {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"), // Faster and cheaper Gemini model
      prompt: `Create a detailed travel plan for a trip to ${location} with a budget of ${budget} for ${days} days.
      Include:
      1. Daily itinerary with activities and attractions
      2. Accommodation recommendations
      3. Transportation options
      4. Food and dining suggestions
      5. Estimated costs for each category
      6. Practical tips for the destination

      Format the response in markdown with clear sections and bullet points where appropriate.`,
      system:
        "You are an expert travel planner with knowledge of destinations worldwide. Provide detailed, practical, and budget-conscious travel recommendations.",
    })

    return text
  } catch (error) {
    console.error("Error generating travel plan:", error)
    throw new Error("Failed to generate travel plan")
  }
}
