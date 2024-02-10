import "./index.css";
import { useState, useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import data from "./data/data.json";
import FlagCard from "./components/ui/FlagCard";

const selectOptions = ["Africa", "America", "Asia", "Europe", "Oceania"];

function App() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

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

  return (
    <>
      <div className="mx-auto">
        <Header handleThemeSwitch={handleThemeSwitch} theme={theme} />
        <main className="container mx-auto flex min-h-screen flex-col items-center bg-lightgray text-darkblue-900 dark:bg-darkblue-600 dark:text-white ">
          <div className="flex w-full flex-col md:flex-row md:items-center md:justify-around">
            <div className="relative flex w-full">
              <input
                type="text"
                name="search-country"
                id="search-country"
                placeholder="Search for a country..."
                className="border-1 mx-auto my-6 w-5/6 max-w-[480px] rounded-md py-4 pl-12 shadow-md outline-sky-600 dark:bg-darkblue-500"
              />
            </div>

            <div className="mx-auto  w-5/6">
              <select
                defaultValue="Search for a country..."
                className="text-md cursor-pointer rounded-lg border-0 bg-white py-4 pl-4 pr-6 text-darkblue-500 outline-sky-600 drop-shadow-md focus:ring-0 dark:bg-darkblue-500 dark:text-white"
              >
                <option selected>Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Asia">America</option>
                <option value="Asia">Asia</option>
                <option value="Asia">Europe</option>
                <option value="Asia">Oceania</option>
              </select>
            </div>
          </div>

          <div className="mx-auto my-6 grid w-full grid-flow-row auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((items, index) => {
              //console.log(typeof items.capital);
              if (typeof items.capital == undefined) {
                console.log(items.capital);
              }

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
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
