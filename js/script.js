var today = document.getElementById('today');
var todayTemp_c = document.querySelector('#today .temp')
var locationInput = document.getElementById('locationInput');
var forecastContainers = document.querySelectorAll(".dashboard .forecastDay");
var date = new Date();

getApi('cairo');



locationInput.addEventListener('input', function () {
  getApi(this.value);
})

async function getApi(location) {

  var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bbb40c94716a49e6bc3195839251103&q=${location}&days=3&aqi=yes&alerts=yes`);
  var data = await response.json();
  DisplayToday(data.forecast.forecastday[0], data.location);
  DisplayForecast(data.forecast.forecastday);
  
}

function DisplayToday( todayForecast ,location) {

  var index = getCurrentHour(todayForecast);
 
  var htmlContainer = `
                <div id="today" class="col col-color1">
                <div class="date date-color1 d-flex justify-content-between align-content-center p-2">
                <p>${weekdayDate(todayForecast.date)}</p>
                <p>${todayDate(todayForecast.date)}</p>
                </div>
                <div class="degree">
                <p class="location">${location.name}</p>
                <p class="temp fw-bold">${todayForecast.hour[index].temp_c + 'C'} <img src="${todayForecast.hour[index].condition.icon}" alt="condition"/> </p>
                <p class="cast pb-3">${todayForecast.hour[index].condition.text}</p>
                <span class="pe-2 "><i class="fa-solid fa-droplet px-1"></i>${todayForecast.hour[index].humidity}</span>
                <span class="px-2 "><i class="fa-solid fa-wind px-1"></i>${todayForecast.hour[index].wind_kph + 'km/h'}</span>
                <span class="px-2 "><i class="fa-solid fa-compass px-1"></i>${todayForecast.hour[index].wind_dir}</span>
                </div>
                </div>
                `
  document.getElementById('today').innerHTML = htmlContainer;

}


function DisplayForecast(forecastDays) {
  var dates = [forecastDays[0].date,forecastDays[1].date,forecastDays[2].date];
  var weekDays = weekdayDate(dates);
  
  for(var i = 1 ;i < forecastDays.length; i++){
    var htmlContainer = `
            <div class="date date-color2 p-2">${weekDays[i]}</div>
              <div class="degree">
              <img src="${forecastDays[i].day.condition.icon}" alt="condition"/>
                <p class="fs-3 fw-semibold text-white">${forecastDays[i].day.maxtemp_c} oC</p>
                <p class="fs-5 pb-2 ">${forecastDays[i].day.mintemp_c} oC</p>
                <p class="cast">${forecastDays[i].day.condition.text}</p>
              </div> 
              `
              document.getElementsByClassName('forecastDay')[i-1].innerHTML = htmlContainer;
  }

}


function todayDate(dateString) {
  var date = new Date(dateString);
  var today = "";
  today += date.getDate() + " ";
  today += date.toLocaleDateString("en-US", { month: 'long' });
  return today;
}

function weekdayDate(dateStringArray){
  if(typeof dateStringArray == "string"){
    var date = new Date(dateStringArray);
    return date.toLocaleString('en-US' , {weekday : 'long'});
  }else{
    var weekDays = [];
    for(var i = 1 ; i < 3; i++){
      var date = new Date(dateStringArray[i]);
      weekDays[i] = date.toLocaleString('en-US' , {weekday : 'long'});
    }
    return weekDays;
  }
}

function getCurrentHour(todayForecast){
  var currentHour = date.getHours();
  
  for(var i = 0 ;i < 24; i++){
    date = new Date(todayForecast.hour[i].time);
    if(currentHour == date.getHours())
    {
      return i;
    }
  }
}