import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {bbox,point,buffer, bboxPolygon} from "@turf/turf";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
const mapboxToken =
  "pk.eyJ1IjoiZmVuaWxwYW5zZXJpeWEiLCJhIjoiY2x1Z3I4bzF0MHd0ZDJpb2U1cndiYnNhdiJ9.X_QUzVd7Q0t6rclnp3Z8NA";

const NearDoctor = () => {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [result,setResults]=useState([])
  const [markers,setMarkers]=useState([])
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setCoordinates({ latitude, longitude });
          
        },
        (error) => {
          // Handle errors if any
          console.error("Error getting current position:", error.message);
        }
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };
  let bbox1 ;
  let geocoder;
  useEffect(() => {
    //if(coordinates.latitude==="" && coordinates.longitude===""){
      getCurrentLocation();
    //}
   

    mapboxgl.accessToken = mapboxToken;
    const initializeMap = () => {

      const newMap = new mapboxgl.Map({
        container: "map-container",
        
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates.longitude, coordinates.latitude], // Your current location coordinates
        zoom: 5,
      });

      newMap.on("load", () => {
        setMap(newMap);
        geocoder?.on('results', function(results) {
          let allResult=[]

          let categories=["clinic","doctor","hospital","medical","medical supply"]

          console.log("results is "+JSON.stringify(results?.features))
          results?.features?.forEach((feature,index)=>{
            console.log("category -> "+JSON.stringify(feature.properties))

            if(feature.properties.category.split(",").some(category=>categories.includes(category))){
              allResult.push([feature.center[0],feature.center[1]])
            }
            // if(feature.properties.category.includes("hospital","doctor")){
              
            //   allResult.push([feature.center[0],feature.center[1]])
            // }

            
          })
          
          

          setResults(allResult)
          allResult?.forEach((result)=>console.log("result "+result))
          

     });

      });
      
      newMap.addControl(new mapboxgl.NavigationControl(), "top-right");
      const marker = new mapboxgl.Marker() 
        .setLngLat([coordinates.longitude, coordinates.latitude]) 
        .addTo(newMap);


        
      
        geocoder = new MapboxGeocoder({
        bbox:bbox1,
        accessToken: mapboxToken, 
        proximity:{
          longitude:coordinates.longitude,
          latitude:coordinates.latitude
        },
        placeholder: 'Search here',
        mapboxgl: mapboxgl, 
        marker: false, 
        types: 'poi'
      });

      
      newMap.addControl(geocoder);
     
    
    };
    const p = point([coordinates.longitude,coordinates.latitude]);  
    
    let buffer1 = buffer(p, 40, {units: 'kilometers'});
    bbox1 = bbox(buffer1);
    let poly = bboxPolygon(bbox1);
    // map?.addLayer({
    //   id: 'buffered-area',
    //   type: 'line',
    //   source: {
    //     type: 'geojson',
    //     data: poly
    //   },
    //   paint: {
    //     'line-color': '#FF0000',
    //     'line-width': 5
    //   }
    // });


    if(map && !map.getLayer('buffered-area')){
      map?.addLayer({
        id: 'buffered-area',
        type: 'line',
        source: {
          type: 'geojson',
          data: poly
        },
        paint: {
          'line-color': '#FF0000',
          'line-width': 5
        }
      });
    }
    
    if(result?.length >0 ){

      if(markers?.length>0){
        
        markers.length>0 && markers.forEach((marker)=>{
          
          marker.remove()
        })
      }
      
      

      result.forEach((res)=>{

        const marker = new mapboxgl.Marker() 
        .setLngLat([res[0], res[1]]) 
        .addTo(map);
        setMarkers(prevMarkers => [...prevMarkers, marker]);
      })
    }

    
    if (!map) initializeMap();
  }, [coordinates,result]);

  //   const renderHospitals = (hospitals) => {
  //     hospitals.forEach((hospital) => {
  //       new mapboxgl.Marker()
  //         .setLngLat([hospital.lng, hospital.lat])
  //         .setPopup(new mapboxgl.Popup().setHTML(`<h3>${hospital.name}</h3>`))
  //         .addTo(map);
  //     });
  //   };

  return <div id="map-container" style={{ width: "100%", height: "100vh" }} />;
};

export default NearDoctor;
