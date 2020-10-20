import React,{useState,useEffect} from "react"
import Map from "./Map"
import axios from "axios"
import Weather from "./Weather"

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
                const res= await axios.get("http://api.weatherapi.com/v1/current.json?key=5d6e85404b024ada8e8134834201910&q="+location)
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
        return  (<div className="container">
        <div className="row">
            <div className="col-1 ">
            <button className="btn btn-md btn-info" style={{marginTop: "20px"}}>Search: </button>
            </div>
            <div className="col-11 ">
            <input type="text" className="form-control" value={location} style={{width: "45%", marginTop: "20px"}} onChange={
           (e)=> {
               setLocation(e.target.value)
           }
        } />
            </div>

            <div className="col-12">
            <h1>Valid Input dijiye</h1>
            </div>

 
        </div>

     
    </div>)
    }
    console.log(cooWeather)
    const obj={
        latitude: cooWeather.coords[0],
        longitude: cooWeather.coords[1],
        width: "50vw",
        height: "50vh",
        zoom: 10,
        changing: false
    }
    return  (<div className="container" style={{marginTop: "20px"}}>
        <div className="row">
        <div className="col-1">
        <button className="btn btn-md btn-info" >Search: </button>
                </div>
            <div className="col-11">
            <input type="text" className="form-control" value={location} style={{width: "45%"}} onChange={
           (e)=> {
               setLocation(e.target.value)
           }
        } />
            </div>

            <div className="col-lg-12 col-md-12">
            <Weather weath={cooWeather.weather}/>
            </div>

            <div className="col-lg-9 col-md-12">
            <Map defViewPort={obj} changing={false}/>
            </div>
            <div className="col-lg-3 col-md-12">

</div>
        </div>

     
    </div>)
}

export default App
