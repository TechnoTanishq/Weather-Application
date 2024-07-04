// As github don't allow security pins or api pins to be public,so commenting it...
// const apiKey="16fa928b6b350f32cacc2c2710dfe249"
const apiURL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn=document.querySelector("#search") ;
const city_name=document.querySelector("#city");
const icon=document.querySelector("#image");

let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; 
let year = currentDate.getFullYear();
const monthIndex = currentDate.getMonth();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const currentMonthName = monthNames[monthIndex];
let new_date=`${day} ${currentMonthName} ${year}`;
console.log(new_date)


//promise function to handle request to openweather
async function checkWeather(city)
{
    try
    {
        const response=await fetch(apiURL + city +`&appid=${apiKey}`);

        if(response.status==404)
            {
                throw new Error("City not found")
            }
        if(response.status!=200){
            throw new Error("Network error")
        }

        var data=await response.json();
        console.log(data);
        document.querySelector("#how").innerHTML=data.weather[0].main;
        document.querySelector("#humidity_val").innerHTML=data.main.humidity+"%";
        document.querySelector("#wind_val").innerHTML=data.wind.speed+" km/hr";
        document.querySelector("#temperature_val").innerHTML=data.main.temp+" °C";
        document.querySelector("#feels").innerHTML=data.main.feels_like+" °C";
        document.querySelector("#temp").innerHTML=Math.round(data.main.temp)+" °C";
        document.querySelector("#location").innerHTML=data.name;
        document.querySelector("#date").innerHTML=new_date;
    
        //for updating image
        if (data.weather[0].main != null) {
            // icon.src = data.weather[0].main + ".png"
            icon.src = "images/"+data.weather[0].main + ".png"
          }
    
    }
    catch(error)
    {
        console.log("Error Occured",error);
        let newMsg="Sorroy, "+error;
        document.querySelector(".heading").innerHTML=newMsg;
    }
    
}

searchBtn.addEventListener("click",()=>{
    document.querySelector(".heading").innerHTML="Weather app by Tanishq";
    checkWeather(city_name.value)
})

function checkEnterKey(event) {
    console.log("entered");
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search").click(); 
    }
}
