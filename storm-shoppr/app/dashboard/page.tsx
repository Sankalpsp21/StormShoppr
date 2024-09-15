"use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from 'next/navigation'; // import to get query params
// import { MapContainer, TileLayer, Pane } from "react-leaflet";
// import "leaflet/dist/leaflet.css"
// import "leaflet-defaulticon-compatibility"
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

// export default function Dashboard() {
//   const searchParams = useSearchParams(); // get search params from the URL
  
//   const [xyCoords, setXYCoords] = useState<[number, number]>([42.3601, -71.0589]); // Default to Boston coordinates
//   const [zoomLevel, setZoomLevel] = useState<number>(8); // Default zoom level
  
//   useEffect(() => {
//     const fetchMapData = async () => {
//       try {
//         const city = searchParams.get('city') || 'Boston'; // default to Boston if city not provided
//         const res = await fetch(
//             `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e2397ca1f54c8b6df77a59c26c62859a&units=imperial`
//         )
//         const response = await res.json()

//         // Explicitly cast to number
//         const lat = Number(response.city.coord.lat);
//         const lon = Number(response.city.coord.lon);

//         setXYCoords([lat, lon]);
//       } catch (error) {
//         console.error('Error fetching map data:', error);
//       }
//     };
  
//     fetchMapData();
//   }, []); // Runs on initial mount only

//   return (
//     <div className="bg-slate-300">
//       <MapContainer 
//         key={`${xyCoords[0]}_${xyCoords[1]}`} 
//         center={xyCoords} 
//         zoom={zoomLevel}
//         scrollWheelZoom={false} 
//         style={{ height: "50%", width: "50%" }} // Ensure the map has height and width
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url={"http://b.tile.openstreetmap.org/{z}/{x}/{y}.png"}
//         />
        
//         {/* Overlaying a second map */}
//         <Pane name="precipitation" style={{ zIndex: 400 }}>
//             <TileLayer
//                 url={"https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=e2397ca1f54c8b6df77a59c26c62859a"}
//                 attribution={'&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'}
//             />
//         </Pane>
//       </MapContainer>
//     </div>
//   );
// }

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams(); // Get search params from URL
    
    // Get lat and lon from query parameters, or default to specific coordinates
    const lat = Number(searchParams.get('lat')) || 4.79029;
    const lon = Number(searchParams.get('lon')) || -75.69003;

    const Map = useMemo(() => dynamic(
        () => import('../../components/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), []);

    return (
        <>
            <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
                {/* Pass dynamic lat/lon as props to the Map component */}
                <Map posix={[lat, lon]} />
            </div>
        </>
    );
}