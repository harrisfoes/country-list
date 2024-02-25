import "./index.css";
import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";

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
    <>
      <Homepage handleThemeSwitch={handleThemeSwitch} theme={theme} />
    </>
  );
}

export default App;
