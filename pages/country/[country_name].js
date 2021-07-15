import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/MainLayout';

export default function Country({ data }) {
  const [countryData, setCountryData] = useState(data.response[0])

  useEffect(() => {
    console.log(countryData)
  }, [])
  return (
    <MainLayout>
      <h1 className="country__header">{countryData.country}</h1>
      <p className="country__description">Континент: <span className="country__description-state">{countryData.continent}</span></p>
      <p className="country__description">Популяция: <span className="country__description-state">{countryData.population}</span></p>

      <div className="country__disease-wrap">

        <div className="country__disease-col">
          <p className="country__disease">Заболевшие: <span className="country__description-state">{countryData.cases.total}</span></p>
          <p className="country__disease-description">{countryData.cases['1M_pop']}/1 млн. населения</p>
          <p className="country__disease-item">Новые случаи за сутки: <span className="country__disease-item-state country__disease-item-state_color_danger">{countryData.cases.new}</span></p>
          <p className="country__disease-item">Болеют в активной стадии: <span className="country__disease-item-state">{countryData.cases.active}</span></p>
          <p className="country__disease-item">Критическое состояние: <span className="country__disease-item-state">{countryData.cases.critical}</span></p>
          <p className="country__disease-item">Выздоровели: <span className="country__disease-item-state">{countryData.cases.recovered}</span></p>
        </div>

        <div className="country__disease-col">
          <p className="country__disease">Умерли: <span className="country__description-state">{countryData.deaths.total}</span></p>
          <p className="country__disease-description">{countryData.deaths['1M_pop']}/1 млн. населения</p>
          <p className="country__disease-item">Новые случаи за сутки: <span className="country__disease-item-state country__disease-item-state_color_danger">{countryData.deaths.new}</span></p>
        </div>

        <div className="country__disease-col">
          <p className="country__disease">Сдали тест: <span className="country__description-state">{countryData.tests.total}</span></p>
          <p className="country__disease-description">{countryData.tests['1M_pop']}/1 млн. населения</p>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps({query}) {
  const res = await fetch(`https://covid-193.p.rapidapi.com/statistics/?country=${query.country_name}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "153640a0d9msh22dce673d9a032ep189581jsn3935bb2bbec8",
      "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
  });
  const data = await res.json();
  console.log(data);
  if (data.results == 0) {
    return {
      notFound: true,
    }
  }
  return { props: { data } }
};