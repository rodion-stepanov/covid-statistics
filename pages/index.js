import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MainLayout } from '../components/MainLayout';
const API_KEY = process.env.API_KEY;

export default function Home({ data }) {

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [activeLetter, setActiveLetter] = useState('');

  const inputHandler = (e) => {
    const inputValue = e.target.value.toLowerCase()
    setSearchInput(inputValue);
  }

  useEffect(() => {
    if (searchInput == '') {
      setFilteredCountries([]);
      return;
    }
    setFilteredCountries(data.filter((item) => item.toLowerCase().startsWith(searchInput)))
  }, [searchInput]);

  useEffect(() => {
    if (activeLetter == '') {
      setFilteredCountries([]);
      return;
    }
    setFilteredCountries(data.filter((item) => item.toLowerCase().startsWith(activeLetter.toLocaleLowerCase())))
  }, [activeLetter])

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const alphabetNavigationHandler = (e) => {
    const letter = e.target.textContent.toLowerCase();
    const findedCountries = data.filter((item) => item.toLowerCase().startsWith(letter))
    setFilteredCountries(findedCountries)
    setActiveLetter(letter);
  }

  const leftArrowHandler = () => {
    if (activeLetter) {
      const index = alphabet.findIndex(letter => letter.toLowerCase() == activeLetter.toLowerCase());
      if (index == 0) {
        setActiveLetter(alphabet[alphabet.length - 1]);
        return;
      }
      setActiveLetter(alphabet[index - 1])
    }
  }

  const rightArrowHandler = () => {
    if (activeLetter) {
      const index = alphabet.findIndex(letter => letter.toLowerCase() == activeLetter.toLowerCase());
      if (index == alphabet.length - 1) {
        setActiveLetter(alphabet[0]);
        return;
      }
      setActiveLetter(alphabet[index + 1])
    }
  }


  return (
    <MainLayout title="Статистика по Covid">
      <p className="main__description">Поиск по стране</p>
      <div className="main__input-wrap">
        <input type="text" className="main__input-search" onChange={inputHandler} /><div className="main__input-image" />
      </div>
      <ul className="main__list">
        {filteredCountries.map((item, i) => (
          <li key={i} className="main__list-item">
            <Link href={`/country/[country_name]`} as={`country/${item}`}><a className="main__list-item-link">{item}</a></Link>
          </li>
        ))}
      </ul>
      <div className="main__pagination">
        <div className="main__pagination-button" onClick={leftArrowHandler} />
        {alphabet.map((letter, i) => (
          <button className={`main__pagination-letter ${letter == activeLetter.toUpperCase() ? 'main__pagination-letter_active' : null}`} key={i} onClick={alphabetNavigationHandler}>{letter}</button>
        ))}
        <div className="main__pagination-button" onClick={rightArrowHandler} />
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch("https://covid-193.p.rapidapi.com/countries", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": `${API_KEY}`,
      "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
  });
  const res = await response.json();
  if (!res) {
    return { data: null };
  }
  const data = await res.response
  return { props: { data } }
};