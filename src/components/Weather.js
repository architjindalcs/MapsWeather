import React from "react"
import "./Weather.css"
const Weather=(props)=>
{
    const current=props.weath.current;
    const location=props.weath.location;
    const city=location.name
    const state=location.region
    const tz=location.tz_id
    const country=location.country
    const localtime=location.localtime
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(localtime.substr(0,10));
    var dayName = days[d.getDay()];
    const text=current.condition.text
    const icon="http://"+current.condition.icon.substr(2).replace("64x64","128x128")
    const temp=current.temp_c
    console.log("Icon",icon)
    return (
            <div className="container">
                <div className="aboveall">
                                        <div className="row headers">
        <div className="col-12">
            <h3>{city}, {state}, {country}</h3>
        </div>
        <div className="col-12">
    <h3 className="td">{localtime.substr(11)}, {dayName} , {localtime.substr(0,10)}</h3>
        </div>
        <div className="col-12">
            <h3 className="td">{text}</h3>
        </div>

        </div>


        <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12 text">
            <img src={icon} style={{display: "inline"}}/>
            {temp}<sup>		&#730;C</sup>
        </div>
 
        <div className="col-lg-6 col-md-12 col-sm-12 addons td">
        Precipitation: {current.precip_mm} mm
        <br/>
        Humidity: {current.humidity} %
        <br/>
        Wind: {current.wind_kph} km/h
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12 text">
           
        </div>
    </div>
                </div>

    </div>
        
)
}
export default Weather