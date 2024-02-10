import "./index.css";
import { useState, useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import data from "./data/data.json";

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
        <main className="flex min-h-screen flex-col items-center bg-lightgray text-darkblue-900 dark:bg-darkblue-600 dark:text-white ">
          <div className="flex w-full flex-col md:flex-row md:items-center md:justify-around">
            <div className="relative flex w-full">
              <input
                type="text"
                name="search-country"
                id="search-country"
                placeholder="Search for a country..."
                className="border-1 mx-auto my-6 w-5/6 max-w-[480px] rounded-md py-4 pl-12 shadow-md outline-none dark:bg-darkblue-500"
              />
            </div>

            <div className="mx-auto  w-5/6">
              <select
                defaultValue="Search for a country..."
                className="text-md cursor-pointer rounded-lg border-0 bg-white px-4 py-4 text-darkblue-500 drop-shadow-md focus:ring-0 dark:bg-darkblue-500 dark:text-white"
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

          <div className="my-6">
            <div className="flag-card my-4 w-full pb-6 shadow-md">
              <img src={data[1].flags.png} alt="flag-imge" />
              <div className="flag-text mx-5 my-6">
                <span className="text-lg font-extrabold">{data[1].name}</span>
                <div className="details mt-4 flex flex-col">
                  <div>
                    <span className="font-medium">Population: </span>
                    <span className="font-light">{data[1].population}</span>
                  </div>
                  <div>
                    <span className="font-medium">Region: </span>
                    <span className="font-light">{data[1].region}</span>
                  </div>
                  <div>
                    <span className="font-medium">Capital: </span>
                    <span className="font-light">{data[1].capital}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
