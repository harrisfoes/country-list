import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Country from "./pages/Country";
import Main from "./components/sections/Main";

function App() {
  const [theme, setTheme] = useState<string | null>(null);

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

  const handleThemeSwitch = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/country-list"
          element={
            <Homepage handleThemeSwitch={handleThemeSwitch} theme={theme} />
          }
        >
          <Route index element={<Main />} />
          <Route
            path="/country-list/country/:countryId"
            element={<Country />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
