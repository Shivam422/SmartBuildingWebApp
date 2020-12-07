//update dashboard data every 3 seconds
async function refreshDom()
{
    return new Promise(async (resolve) =>
    {
        await weatherAPI();
        setTimeout(refreshDom, 30000);
        resolve();
    });
}
var userLocation = "Houston"
function openWeatherAPISettings()
{
  userLocation = $("#userLocation").val();
}
async function weatherAPI()
{
    return new Promise(async (resolve) =>
    { 
      var currentDate = new Date();
      $("#currentDate").text(currentDate.getMonth() + "/" + currentDate.getDate());
      $("#currentTime").text(currentDate.getHours() + ":" + currentDate.getMinutes());
        var data;
        await $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+ userLocation +"&appid=c58af4076d3eb08b2068fd9e44e792ab&units=imperial",
            method: "GET",
            dataType: "jsonp",
            statusCode: {
              200: (response) => {
                data = response;
              },
              404: () => {
                console.log("failed");
              },
            },
        });
        $("#currentWeatherText").text(data.weather[0].main);
        $("#currentWeatherTemp").text(data.main.temp + "\u00B0F");
        $("#weatherAPILocation").text(data.name);
        if(data.weather[0].main == "Clear")
        {
          $(".currentWeatherPng").attr('src',"/SmartBuildingWebApp/images/039-sun.svg");
        }
        else if(data.weather[0].main == "Thunderstorm")
        {
          $(".currentWeatherPng").attr('src',"/SmartBuildingWebApp/images/008-storm.svg");
        }
        resolve();
    });  
}
