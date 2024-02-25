import React, { useState, useEffect } from "react";
import FlagCard from "../ui/FlagCard";
import { CountryAPISource } from "../../types/api";

const regionOptions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function Home() {
  const [input, setInput] = useState("");
  const [allData, setAllData] = useState<CountryAPISource[] | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<
    CountryAPISource[] | null
  >(null);
  const [region, setRegion] = useState("default");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (allData != null) {
      const filterCountries = allData
        .map((country) => {
          return country;
        })
        .filter((country) => {
          return country.name.toLowerCase().includes(input.toLowerCase());
        });

      console.log(filteredCountries);
      console.log(input);
      setFilteredCountries(filterCountries);
    }
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRegion(value);
  };

  useEffect(() => {
    fetch("/country-list/data.json")
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData);
        setAllData(allData);
        setFilteredCountries(allData);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation", error);
      });
  }, []);

  //useffect reset if input is empty
  //useffect fires to filter out based on input
  useEffect(() => {
    //empty --> show everything from data
    if (allData != null) {
      if (input === "") {
        if (region !== "default") {
          const updateRegionFilter = allData.filter((country) => {
            return country.region.toLowerCase() === region.toLowerCase();
          });
          setFilteredCountries(updateRegionFilter);
        } else {
          setFilteredCountries(allData);
        }
      }

      //input --> show everything that includes input string
      if (input.length > 0) {
        const updateDataFilter = allData.filter((country) => {
          return country.name.toLowerCase().includes(input.toLowerCase());
        });

        if (region !== "default") {
          const updateRegionFilter = updateDataFilter.filter((country) => {
            return country.region.toLowerCase() === region.toLowerCase();
          });
          setFilteredCountries(updateRegionFilter);
        } else {
          setFilteredCountries(updateDataFilter);
        }
      }
    }
  }, [input, region]);
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center bg-lightgray text-darkblue-900 dark:bg-darkblue-600 dark:text-white">
      <div className="mx-auto flex w-10/12 flex-col md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <div className="absolute inset-0 left-4 top-11">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z"
                fill="#B2B2B2"
              />
            </svg>
          </div>
          <input
            type="text"
            name="search-country"
            id="search-country"
            placeholder="Search for a country..."
            className="border-1 mx-auto my-6 w-[480px] max-w-[95%] rounded-md  py-4 pl-12 shadow-md outline-sky-600 dark:bg-darkblue-500"
            value={input}
            onChange={handleSearch}
          />
        </div>

        <div className="">
          <select
            value={region}
            className="text-md cursor-pointer rounded-lg border-0 bg-white py-4 pl-4 pr-6 text-darkblue-500 outline-sky-600 drop-shadow-md focus:ring-0 dark:bg-darkblue-500 dark:text-white"
            onChange={selectChange}
          >
            <option selected value="default">
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
        {filteredCountries &&
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
        {filteredCountries && filteredCountries.length === 0 && (
          <div className="text-center text-2xl font-semibold">
            No match found
          </div>
        )}
      </div>
    </main>
  );
}
