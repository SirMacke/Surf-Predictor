import axios from 'axios';
import randomUseragent from 'random-useragent';

export default defineEventHandler(async (event) => {
  let weather = {};

  /*let smhires = await axios('https://www.smhi.se/wpt-a/backend_tendayforecast_nextgen/forecast/fetcher/2664454/10dFormat');
  weather.smhi = { '1d': [], '10d': [] };
  
  for (let daySerie of smhires.data.daySerie) {
    for (let hour of daySerie.data) {
      if (weather.smhi['1d'].length < 24) {
        weather.smhi['1d'].push({
          timestamp: new Date(new Date(hour.accStart).getTime() + (1*60*60*1000)),
          temp: Math.round(hour.t),
          tempFeel: Math.round(hour.t_land1),
          rain: hour.tp,
          windSpeed: hour.ws,
          windGust: hour.gust,
          windDirection: hour.wd,
          humidity: hour.r,
          pressure: hour.msl,
          visibility: hour.vis,
          certainty: hour.uncert
        });
      }

      if (new Date(hour.accStart).getHours() == 14) {
        weather.smhi['10d'].push({
          timestamp: new Date(new Date(hour.accStart).getTime() + (1*60*60*1000)),
          temp: Math.round(hour.t),
          tempFeel: Math.round(hour.t_land1),
          rain: hour.tp,
          windSpeed: hour.ws,
          windGust: hour.gust,
          windDirection: hour.wd,
          humidity: hour.r,
          pressure: hour.msl,
          visibility: hour.vis,
          certainty: hour.uncert
        });
      }
    }
  }*/

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
  for (let series of yrres.data.properties.timeseries.data) {
    if (weather.yr['1d'].length < 24) {
      weather.yr['1d'].push({
        timestamp: new Date(series.time),
        temp: Math.round(series.data.instant.air_temperature),
        windSpeed: series.data.instant.wind_speed,
        windGust: series.data.instant.wind_speed_of_gust,
        windDirection: series.data.instant.wind_from_direction,
        humidity: series.data.instant.relative_humidity,
        pressure: series.data.instant.air_pressure_at_sea_level,
        visibility: 1 - series.data.instant.fog_area_fraction,
      });
    }
/*
    if (new Date(hour.accStart).getHours() == 14) {
      weather.smhi['10d'].push({
        timestamp: new Date(new Date(hour.accStart).getTime() + (1*60*60*1000)),
        temp: Math.round(hour.t),
        tempFeel: Math.round(hour.t_land1),
        rain: hour.tp,
        windSpeed: hour.ws,
        windGust: hour.gust,
        windDirection: hour.wd,
        humidity: hour.r,
        pressure: hour.msl,
        visibility: hour.vis,
        certainty: hour.uncert
      });
    }*/
  }

  console.log(weather.yr['1d'])

  return weather;
});