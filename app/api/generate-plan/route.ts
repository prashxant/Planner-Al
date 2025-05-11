import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the GoogleGenAI instance outside the POST function for efficiency.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" }); // Use environment variable

export async function POST(req: Request) {
    try {
        const { location, budget, days } = await req.json();

        if (!location || !budget || !days) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash", 
            contents: "hi there",
            config: {
                systemInstruction: `You are an expert travel planner. Create detailed, personalized travel plans 
                    based on location, budget, and duration. Include accommodations, activities, 
                    restaurants, and practical tips. Format your response as JSON.
      
                    Create a detailed travel plan for a ${days}-day trip to ${location} with a budget of $${budget}.
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
              },
            
        });

        // Access the generated text from the response
        const text = response.response.candidates[0].content.parts[0].text;

        // Parse the response as JSON
        const plan = JSON.parse(text);

        return NextResponse.json(plan);
    } catch (error: any) {
        console.error("Error generating travel plan:", error);
        return NextResponse.json({ error: `Failed to generate travel plan: ${error.message}` }, { status: 500 }); // Include the error message
    }
}
