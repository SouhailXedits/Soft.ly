import { getRandomColor } from "./helpers";

export function getDevicesObj(data: any) {
    const devicesObj = data?.count?.devices;
    let devicesClicks: {
      id: number;
      name: string;
      value: number;
      color: string;
    }[] = [];
    if (devicesObj) {
      devicesClicks = Object.keys(devicesObj).map((device, index) => ({
        id: index + 1,
        name: device.toLowerCase(),
        value: devicesObj[device],
        color: getRandomColor(),
      }));
    }
    return devicesClicks;

}
export function getReferresClicks(data: any) {
  const referrersObj = data?.count?.referrerDomains;
  let referrersClicks: { id: number; name: string; value: number }[] = [];
  if (referrersObj) {
    referrersClicks = Object.keys(referrersObj).map((referrer, index) => ({
      id: index + 1,
      name: referrer.toLowerCase(),
      value: referrersObj[referrer],
    }));
  }

  return referrersClicks;
}
export function getCountriesClicks(data: any) {
  const countriesObj = data?.count?.country_name;
  let countriesClicks: { id: number; name: string; clicks: number }[] = [];
  if (countriesObj) {
    countriesClicks = Object.keys(countriesObj).map((country, index) => ({
      id: index + 1,
      name: country.toLowerCase(),
      clicks: countriesObj[country],
    }));
  }

  return countriesClicks;
}
export function getCitiesClicks(data: any) {
  const citiesObj = data?.count?.Location;
  let citiesClicks: { id: number; name: string; clicks: number }[] = [];
  if (citiesObj) {
    citiesClicks = Object.keys(citiesObj).map((city, index) => ({
      id: index + 1,
      name: city.toLowerCase(),
      clicks: citiesObj[city],
    }));
  }
  return citiesClicks;
}