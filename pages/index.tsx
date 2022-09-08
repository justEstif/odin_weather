import type { NextPage } from "next";
import OpenWeather from "../services/openWeather.service";
import { useEffect } from "react";

const weather = new OpenWeather();

const Home: NextPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const cityInfo = await weather.getWeather("London");
      console.log(cityInfo)
    };
    fetchData()
  }, []);

  return (
    <form>
      <label>
        <p>New Item</p>
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Home;
