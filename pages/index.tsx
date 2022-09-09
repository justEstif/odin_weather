import type { NextPage } from 'next'
import OpenWeather from 'services/openWeather.controller'
import { useEffect, useState } from 'react'
import { Form } from 'components'

const weather = new OpenWeather()

const Home: NextPage = () => {
  const [city, setCity] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await weather.getCurrentWeather(city)
      console.log(result)
    }
    if (city !== '') fetchData()
  }, [city])

  return <Form setCity={setCity} />
}

export default Home
