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

- Use a drawer form

## TODOS

- Divide the page into two

  - main body

    - show the search result

  - side panel

    - form for searching city and picking unit

```js
const time =
  currentWeather &&
  ( new Date(currentWeather?.timeOffset).toTimeString().split(' ')[0] ).toString(0)
const cityTime = time && <p>{time.toString()}</p>`
```

```js
<Grid>
  <Text fontSize="6xl">
    {name}, {country}
  </Text>
  <Text fontSize="3xl">
    Current temp: {temp}
    {unit.temp}
  </Text>
  <Text fontSize="3xl">
    Feels like: {feelsLike}
    {unit.temp}
  </Text>
  <Text fontSize="3xl">{main}</Text>
  <Image
    src={`/weatherIcons/${weatherIcon}.svg`}
    width="60"
    height="60"
  />
</Grid>
```
