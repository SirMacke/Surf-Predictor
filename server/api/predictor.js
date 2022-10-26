import spawn from 'child_process';
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const reqQuery = useQuery(event);
  console.log(reqQuery);

  let weather = {};

  let smhires = await axios('https://www.smhi.se/wpt-a/backend_tendayforecast_nextgen/forecast/fetcher/2664454/10dFormat');
  weather.smhi = { '1d': [] };
  
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
    }
  }
  reqQuery.timeStartHour = parseInt(reqQuery.timeStartHour);
  reqQuery.timeDuration = 3;

  let avgWindSpeed = 0;
  let avgWindGust = 0;

  for (let y = parseInt(reqQuery.timeStartHour); y < reqQuery.timeStartHour + reqQuery.timeDuration; y++) {
    let z = y > 23 ? y - 24 : y;

    for (let x = 0; x < 24; x++) {
      let hour = weather.smhi['1d'][x];

      if (new Date(hour.timestamp.setTime(hour.timestamp.getTime() - 2*60*60*1000)).getHours() == z) {
        avgWindSpeed += parseFloat(hour.windSpeed);
        avgWindGust += parseFloat(hour.windGust);
      }
    }
  }

  avgWindSpeed = Math.round(avgWindSpeed / reqQuery.timeDuration * 100) / 100;
  avgWindGust = Math.round(avgWindGust / reqQuery.timeDuration * 100) / 100;

  console.log(avgWindSpeed, avgWindGust)

  const pythonProcess = spawn.spawnSync('python', ['C:/Webdevelopment/surfpredictor/server/scripts/predictor.py', avgWindSpeed, avgWindGust]);
  let pythonres = JSON.parse(pythonProcess.output[1].toString());

  let res = [];
  for (let sail of Object.keys(pythonres)) res.push(sail);
  res = res.join('/');
  console.log(res)

  return res;
});