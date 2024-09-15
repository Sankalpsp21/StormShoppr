# Storm Shoppr

A storm and extreme weather prediction service that allows you to automatically order essential supplies. It notifies users in disaster-prone areas and helps them prepare by automating the pre-ordering of emergency supplies from local stores. Users can customize their list of supplies or choose from defaults, and the system will automatically place an order when a disaster is predicted, reducing the need to rush to crowded stores. It also takes into account the user’s geographical location to provide personalized alerts.

## How we built it

We built the frontend using Next.js, React, and TailwindCSS, with an intuitive user interface that allows users to manage their alert settings and supplies. We used the Leaflet & OpenWeatherMap to show weather conditions on a map and the NOAA API to check for official hurricane updates.

The backend is powered by Convex, where we manage user data and store prediction results. Clerk handles user authentication for secure logins. We integrated the DoorDash API to simulate automatic ordering of supplies when a hurricane alert is triggered. 
