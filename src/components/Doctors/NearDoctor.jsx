import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
const mapboxToken = 'pk.eyJ1IjoiZmVuaWxwYW5zZXJpeWEiLCJhIjoiY2x1Z3I4bzF0MHd0ZDJpb2U1cndiYnNhdiJ9.X_QUzVd7Q0t6rclnp3Z8NA';

const NearDoctor = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const initializeMap = () => {
        const newMap = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [78.9629,20.5937], // Your current location coordinates
            zoom: 5,
        });

        newMap.on('load', () => {
            setMap(newMap);
        });

        newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        const marker = new mapboxgl.Marker() // initialize a new marker
            .setLngLat([78.9629, 20.5937]) // Marker [lng, lat] coordinates
            .addTo(newMap);

            const geocoder = new MapboxGeocoder({
                // Initialize the geocoder
                accessToken: mapboxToken, // Set the access token
                mapboxgl: mapboxgl, // Set the mapbox-gl instance
                marker: false // Do not use the default marker style
              });
              
              // Add the geocoder to the map
              newMap.addControl(geocoder);
    };

    if (!map) initializeMap();
  }, [map]);

    

    
 

//   const renderHospitals = (hospitals) => {
//     hospitals.forEach((hospital) => {
//       new mapboxgl.Marker()
//         .setLngLat([hospital.lng, hospital.lat])
//         .setPopup(new mapboxgl.Popup().setHTML(`<h3>${hospital.name}</h3>`))
//         .addTo(map);
//     });
//   };

  return <div id="map-container" style={{ width: '100%', height: '90vh' }} />;
};

export default NearDoctor;
