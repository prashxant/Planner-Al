import { generateText } from "ai"
import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { location, budget, days } = await req.json()

    if (!location || !budget || !days) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { text } = await generateText({
      model:  GoogleGenAI("gemini-2.0-flash"),
        system: `You are an expert travel planner. Create detailed, personalized travel plans 
        based on location, budget, and duration. Include accommodations, activities, 
        restaurants, and practical tips. Format your response, as JSON.`,
        prompt: `Create a detailed travel plan for a ${days}-day trip to ${location} with a budget of $${budget}.
        Include:
        - A brief overview of the trip
        - Day-by-day itinerary
        - 2-3 accommodation options with prices
        - 3-5 recommended activities with prices
        - 3 restaurant recommendations with price ranges
        - 5 practical travel tips specific to the destination
        
        Format the response as a JSON object with the following structure:
        {
          "overview": "string",
          "itinerary": ["string", "string", ...],
          "accommodations": [{"name": "string", "description": "string", "price": number}, ...],
          "activities": [{"name": "string", "description": "string", "price": number}, ...],
          "restaurants": [{"name": "string", "description": "string", "priceRange": "string"}, ...],
          "tips": ["string", "string", ...]
        }`, 
    })

    // Parse the response as JSON
    const plan = JSON.parse(text)

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Error generating travel plan:", error)
    return NextResponse.json({ error: "Failed to generate travel plan" }, { status: 500 })
  }
}

