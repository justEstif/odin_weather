# Project: Odin Weather

## Using:

- Next.js
- Chakra UI
- OpenWeather API

## Steps

1. get data from api
2. show it on screen
3. get data of user input from form

- Main
  - Temperature
  - City Name
  - time and date
  - icons

- Secondary
  - wind speed
  - humidity
  - clouds percentage

- Daily forecast

```js
 public getTimeDate = (timezone: number): ITimeDate => {
   const localTime = new Date().getTime()
   const localOffset = new Date().getTimezoneOffset() * 60000
   const currentUtcTime = localOffset + localTime
   const cityOffset = currentUtcTime + 1000 * timezone
   const cityTimeDate = new Date(cityOffset).toTimeString().split(' ')
   return {
     time: cityTimeDate[0],
     date: cityTimeDate[1],
     timezone
   }
 }

```

- Use a drawer form
