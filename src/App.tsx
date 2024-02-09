import "./index.css";
import { useState, useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";

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
        <main className="dark:bg-darkblue-600 min-h-screen dark:text-white text-darkblue-900 bg-lightgray flex flex-col items-center ">
          <div className="relative w-full  flex">
            <input
              type="text"
              name="search-country"
              id="search-country"
              placeholder="Search for a country..."
              className="my-6 mx-auto shadow-md dark:bg-darkblue-500 pl-12 py-4 border-1 rounded-md w-5/6 outline-none"
            />
          </div>
          <div>
            <select
              defaultValue="Search for a country..."
              className="p-2 rounded-lg bg-white text-darkblue-500"
            >
              <option value="">Select for a country...</option>
              <option value="">Africa</option>
              <option value="">Pusok</option>
            </select>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
