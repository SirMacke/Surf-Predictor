import axios from 'axios';

export default defineEventHandler(async (event) => {
  let weather = {};

  let smhires = await axios('https://www.smhi.se/wpt-a/backend_tendayforecast_nextgen/forecast/fetcher/2664454/10dFormat');
  weather.smhi = { '1d': [], '10d': [] };
  for (let daySerie of smhires.data.daySerie) {
    for (let hour of daySerie.data) {
      if (weather.smhi['1d'].length == 24) break;
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
  }

  return weather;
});