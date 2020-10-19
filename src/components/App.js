import React,{useState,useEffect} from "react"
import Map from "./Map"
import axios from "axios"


const App=()=>
{
   //buggy coordinates
    const [location,setLocation]=useState("")
    const [cooWeather,setCooWeather]=useState({coords: [39.390897,-99.066067], weather: {}})

    useEffect(()=>
    {
        const helperCoords= async()=>
        {
            const res= await axios.get("http://www.mapquestapi.com/geocoding/v1/address?key=8nXK1Op2BKzGt7HNK8xL1E258shfqusA&location="+location);
            //available hai results of coords
            const lat=res.data.results[0].locations[0].latLng.lat
            const long=res.data.results[0].locations[0].latLng.lng
                
            const helper=async()=>
            {
                const res= await axios.get("http://api.weatherapi.com/v1/current.json?key=5d6e85404b024ada8e8134834201910&q="+lat+","+long)
                setCooWeather({
                    coords: [lat,long],
                    weather: res.data
                })
            }
           helper()
        }
        const timeOutID=setTimeout(()=>
        {
            if(location!=="")
            {
                helperCoords()

            }
        },800)
       return ()=>  //to clear the timer...
       {
           clearTimeout(timeOutID)
       }
    },[location])
    
    if((cooWeather.coords[0]===39.390897 && cooWeather.coords[1]===-99.066067) || !(location))
    {
        return  (<div>
            <input type="text" value={location} onChange={
               (e)=> {
                   setLocation(e.target.value)
               }
            } />
            <p>Enter(something) or a valid location man!!</p> 
        </div>) 
    }
    console.log(cooWeather)
    return  (<div>
        <input type="text" value={location} onChange={
           (e)=> {
               setLocation(e.target.value)
           }
        } />
        <hr/>
        
        <Map/>
        <span>Lat: {cooWeather.coords[0]}</span>
        <span>Long: {cooWeather.coords[1]} </span>

     
    </div>)
}

export default App
