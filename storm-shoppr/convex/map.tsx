import { action } from "./_generated/server";
import { v } from "convex/values";

// Helper function, given a city, returns the res of the map
export const getMap = action({
    args: { city: v.string() },
    handler: async (ctx, args) => {
        
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${args.city}&appid=e2397ca1f54c8b6df77a59c26c62859a&units=imperial`
        )

        const response = await res.json()
        
        return response;
    },
})