'use client'
import { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    google: any;
  }
}

// Use NEXT_PUBLIC_ prefix for client-side environment variables
const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'UNDEFINED';
const googleMapId = process.env.GOOGLE_MAPS_ID || 'UNDEFINED';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  mapId?: string;
}

const GoogleMap = ({
  center = { lat: 34.0316886, lng: 71.5577608 },
  zoom = 17,
  mapId = googleMapId
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the map only once when component mounts
    if (!mapInstanceRef.current) {
      const loader = new Loader({
        apiKey: googleApiKey,
        version: "weekly",
      });

      loader
        .load()
        .then(async () => {
          const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
          const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

          if (mapRef.current) {
            const mapOptions: google.maps.MapOptions = {
              center,
              zoom,
              mapTypeId: 'hybrid',
              mapTypeControl: true,
              streetViewControl: true,
              zoomControl: true,
            };

            if (mapId) {
              mapOptions.mapId = mapId;
            }

            mapInstanceRef.current = new Map(mapRef.current, mapOptions);

            // Add marker using AdvancedMarkerElement
            new AdvancedMarkerElement({
              map: mapInstanceRef.current,
              position: center,
              title: "Awami National Party - Bacha Khan Markaz"
            });
          }
        })
        .catch((error) => {
          console.error("Error loading Google Maps:", error);
        });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    };
  }); // Empty dependency array since we only want to initialize once

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '300px', // Adjust height as needed
        borderRadius: '8px',
      }}
    />
  );
};

export default GoogleMap;