import axios from 'axios';
import randomUseragent from 'random-useragent';

export default defineEventHandler(async (event) => {
  let weather = {};

  let smhires = await axios('https://www.smhi.se/wpt-a/backend_tendayforecast_nextgen/forecast/fetcher/2664454/10dFormat');
  weather.smhi = { '1d': [], '10d': [] };
  let skip = 0;
  
  for (let daySerie of smhires.data.daySerie) {
    for (let hour of daySerie.data) {
      if (weather.smhi['1d'].length < 24) {
        weather.smhi['1d'].push({
          timestamp: new Date(new Date(hour.accStart).getTime() + (1*60*60*1000)),
          temp: Math.round(hour.t),
          tempFeel: Math.round(hour.t_land1),
          rain: parseInt(hour.tp),
          windSpeed: parseFloat(hour.ws),
          windGust: parseFloat(hour.gust),
          windDirection: parseFloat(hour.wd),
          humidity: parseFloat(hour.r),
          pressure: parseFloat(hour.msl),
          visibility: parseFloat(hour.vis),
          certainty: parseFloat(hour.uncert)
        });
      }

      if (new Date(hour.accStart).getHours() == 14) {
        skip += 1;
        if (skip == 1) continue;
        weather.smhi['10d'].push({
          timestamp: new Date(new Date(hour.accStart).getTime() + (1*60*60*1000)),
          temp: Math.round(hour.t),
          tempFeel: Math.round(hour.t_land1),
          rain: parseFloat(hour.tp),
          windSpeed: parseFloat(hour.ws),
          windGust: parseFloat(hour.gust),
          windDirection: parseFloat(hour.wd),
          humidity: parseFloat(hour.r),
          pressure: parseFloat(hour.msl),
          visibility: parseFloat(hour.vis),
          certainty: parseFloat(hour.uncert)
        });
      }
    }
  }

  let yrres = await axios({
    method: 'get',
    url: 'https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.611366&lon=16.545025',
    headers: {
      accept: 'application/json',
      'user-agent': randomUseragent.getRandom()
    }
  });

  weather.yr = { '1d': [], '10d': [] };
  console.log(yrres)
  console.log(yrres.data.properties.timeseries[0].data.instant)
  for (let series of yrres.data.properties.timeseries) {
    if (yrres.data.properties.timeseries[0].time == series.time) continue;
    if (weather.yr['1d'].length < 24) {
      weather.yr['1d'].push({
        timestamp: new Date(series.time),
        temp: Math.round(series.data.instant.details.air_temperature),
        rain: 0,
        windSpeed: series.data.instant.details.wind_speed,
        windGust: series.data.instant.details.wind_speed_of_gust,
        windDirection: series.data.instant.details.wind_from_direction,
        humidity: series.data.instant.details.relative_humidity,
        pressure: series.data.instant.details.air_pressure_at_sea_level,
        visibility: 1 - series.data.instant.details.fog_area_fraction,
      });
    }
    console.log(series);
    if (weather.yr['10d'].length < 14 && new Date(series.time).getHours() == 1) {
      weather.yr['10d'].push({
        timestamp: new Date(series.time),
        temp: Math.round(series.data.instant.details.air_temperature),
        rain: 0,
        windSpeed: series.data.instant.details.wind_speed,
        windGust: series.data.instant.details.wind_speed_of_gust == undefined ? series.data.instant.details.wind_speed : series.data.instant.details.wind_speed_of_gust,
        windDirection: series.data.instant.details.wind_from_direction,
        humidity: series.data.instant.details.relative_humidity,
        pressure: series.data.instant.details.air_pressure_at_sea_level,
        visibility: 1 - series.data.instant.details.fog_area_fraction,
      });
    }
  }
  
  weather.average = {};
  weather.average['1d'] = {};
  weather.average['10d'] = new Object(weather.yr['10d']);
  for (let x of weather.smhi['1d']) {
    for (let y of weather.yr['1d']) {
      if (new Date(x.timestamp).getTime() == new Date(y.timestamp).getTime()) {
        console.log(x, y)
        //console.log(weather.smhi['1d'][x].timestamp)
        //console.log(weather.yr['1d'][y].timestamp)

        weather.average['1d'].push({
          temp: Math.round((x.temp + y.temp) / 2),
          rain: (x.rain + y.rain) / 2,
          windSpeed: Math.round((x.windSpeed + y.windSpeed) / 2 * 10) / 10,
          windGust: Math.round((x.windGust + y.windGust) / 2 * 10) / 10,
          windDirection: (x.windDirection + y.windDirection) / 2
        })

        weather.average['1d'][x].
        console.log(x.windSpeed)
        console.log(y.windSpeed)
        console.log('-')
      }
    }
  }

  /*for (let x of weather.average['10d']) {
    for (let y of weather.smhi['10d']) {
      if (x.timestamp == y.timestamp) {
        x.temp = (x.temp + y.temp) / 2;
        x.rain = (x.rain + y.rain) / 2;
        x.windSpeed = (x.windSpeed + y.windSpeed) / 2;
        x.windGust = (x.windGust + y.windGust) / 2;
        x.windDirection = (x.windDirection + y.windDirection) / 2;
      }
    }
  }*/
  
  console.log(weather.average['1d'])

  return weather;
});