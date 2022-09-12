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

```
const time =
  currentWeather &&
  new Date(currentWeather?.timeOffset).toTimeString().split(' ')[0]
const cityTime = time && <p>{time.toString()}</p>`
```
