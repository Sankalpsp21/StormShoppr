"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Popup from "../../components/Popup";
import Bottom from "../../components/Bottom";
import Link from 'next/link';
import { Item } from "../../components/Popup";

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

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const orderedItems: Item[] = [
        { id: 1, name: "Crystal Geyser Natural Alpine Spring Water Bottle (1 gal)", price: 1.99, image: "/images/water.png" },
        { id: 2, name: "Campbell's Canned Soup (Chicken Noodle)", price: 3.50, image: "/images/campbellsoup.jpeg" },
        { id: 3, name: "Jif Peanut Butter", price: 2.89, image: "/images/jif.webp" },
        { id: 4, name: "Kraft Original Macaroni & Cheese Cups Easy Microwavable Dinner (4 ct)", price: 5.17, image: "/images/kraft.webp" },
        { id: 6, name: "Duracell Coppertop AA Batteries (20 ct)", price: 17.76, image: "/images/aabattery.jpg" },
    ];


    return (
            <div className="bg-white-700 mx-auto h-[480px] -z-10">
            <img
                src="mockhurricane.svg"  // Replace with the actual image path
                alt="Mock Hurricane"
                className="m-4 translate-y-96 absolute z-50 rounded-lg w-32 h-32"  // Adjust the w- and h- values to control size
                onClick={togglePopup}
            />
                <Link href="/form">
                <button
                    className="translate-y-24 translate-x-14 absolute px-4 py-2 bg-orange-500 text-white rounded-lg z-50"
                >
                    Your Supply List
                </button>
                </Link>

                {/* Pass dynamic lat/lon as props to the Map component */}
                <Map posix={[lat, lon]} />

                <Popup isOpen={isOpen} onClose={togglePopup} orderedItems={orderedItems} deliveryTime="45-60 minutes" />
                <Bottom isHurricane={isOpen} />
            </div>
    );
}