import type { NextPage } from 'next'
import OpenWeather from '../services/openWeather.service'
import { useEffect, useState } from 'react'
import { Form } from 'components'

const weather = new OpenWeather()

const Home: NextPage = () => {
  const [city, setCity] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const cityInfo = await weather.getCityInfo(city)
      console.log(cityInfo)
    }
    if (city !== '') fetchData()
  }, [city])

  return <Form setCity={setCity} />
}

export default Home
