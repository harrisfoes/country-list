import "./index.css";
import React, { useState, useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import data from "./data/data.json";
import FlagCard from "./components/ui/FlagCard";

const regionOptions = ["Africa", "America", "Asia", "Europe", "Oceania"];

function App() {
  const [theme, setTheme] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(data);
  const [region, setRegion] = useState("");

  //Theme preferred by browser
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  //Theme switcher
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    const filterCountries = data
      .map((country) => {
        return country;
      })
      .filter((country) => {
        return country.name.toLowerCase().includes(input.toLowerCase());
      });

    console.log(filteredCountries);
    console.log(input);
    setFilteredCountries(filterCountries);
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRegion(value);
  };

  //useffect reset if input is empty
  //useffect fires to filter out based on input
  useEffect(() => {
    //empty --> show everything from data
    if (input === "") {
      setFilteredCountries(data);
    }
    //input --> show everything that includes input string
    if (input.length > 0) {
      const updateDataFilter = filteredCountries.filter((country) => {
        return country.name.toLowerCase().includes(input.toLowerCase());
      });
      setFilteredCountries(updateDataFilter);
    }
  }, [input]);

  useEffect(() => {
    if (region !== "") {
      console.log(input);
      console.log(region);
      const updateRegionFilter = filteredCountries.filter((country) => {
        return country.region.toLowerCase() === region.toLowerCase();
      });
      console.log(updateRegionFilter);
      setFilteredCountries(updateRegionFilter);
    }
  }, [region]);

  return (
    <>
      <div className="mx-auto dark:bg-darkblue-600">
        <Header handleThemeSwitch={handleThemeSwitch} theme={theme} />

        <main className="container mx-auto flex min-h-screen flex-col items-center bg-lightgray text-darkblue-900 dark:bg-darkblue-600 dark:text-white">
          <div className="mx-auto flex w-10/12 flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <input
                type="text"
                name="search-country"
                id="search-country"
                placeholder="Search for a country..."
                className="border-1 mx-auto my-6 w-[480px] max-w-[95%] rounded-md py-4 pl-12 shadow-md outline-sky-600 dark:bg-darkblue-500"
                value={input}
                onChange={handleSearch}
              />
            </div>

            <div className="">
              <select
                defaultValue="Search for a country..."
                className="text-md cursor-pointer rounded-lg border-0 bg-white py-4 pl-4 pr-6 text-darkblue-500 outline-sky-600 drop-shadow-md focus:ring-0 dark:bg-darkblue-500 dark:text-white"
                onChange={selectChange}
              >
                <option selected value="">
                  Filter by Region
                </option>
                {regionOptions.map((items) => {
                  return (
                    <option key={items} value={items}>
                      {items}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="mx-auto my-6 grid w-full grid-flow-row auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCountries.length > 0 &&
              filteredCountries.map((items, index) => {
                return (
                  <FlagCard
                    key={items.name + "_" + index}
                    image={items.flags.png}
                    name={items.name}
                    population={items.population.toString()}
                    region={items.region}
                    capital={items.capital}
                  />
                );
              })}
            {filteredCountries.length === 0 && (
              <div className="text-center text-2xl font-semibold">
                No match found
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
