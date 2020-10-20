import React, { useEffect, useState } from "react"
import ReactMapGL, {Marker} from "react-map-gl"

const App=(props)=>
{
 
    const[viewport,setViewport]=useState({
        latitude: props.lat,
        longitude: props.long,
        width: "50vw",
        height: "50vh",
        zoom: 10,
        changing: false
    })
    useEffect(()=>{
        if(viewport.changing) return;
        setViewport(props.defViewPort)
    })

        return (<div className="container" >
            <ReactMapGL {...viewport} mapboxApiAccessToken="pk.eyJ1IjoiYXJjaGl0amluZGFsIiwiYSI6ImNrZ2dzeTBhODA3bjMydHRlaXR3ZHplam0ifQ.cld7UnJbhZpC4dIwNa9f3g"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={
                    (viewport)=>{
                        viewport.changing=true     
                        setViewport(viewport)
                    }
                } >

                </ReactMapGL>
        </div>)
   
}

export default App