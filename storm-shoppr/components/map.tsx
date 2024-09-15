"use client"

import { MapContainer, TileLayer, Marker, Popup, Pane } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
}

const defaults = {
    zoom: 10,
}

const Map = (Map: MapProps) => {
    const { zoom = defaults.zoom, posix } = Map

    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "200%", width: "50%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Pane name="precipitation" style={{ zIndex: 400 }}>
            <TileLayer
                url={"https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=e2397ca1f54c8b6df77a59c26c62859a"}
                attribution={'&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'}
            />
            </Pane>
        </MapContainer>
    )
}

export default Map