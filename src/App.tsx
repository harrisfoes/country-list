import "./index.css";
import { useState, useEffect } from "react";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";

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
      <Header handleThemeSwitch={handleThemeSwitch} />
      <main className="min-h-screen dark:bg-darkblue-600 dark:text-white text-darkblue-900 bg-lightgray flex flex-col items-center justify-center">
        <h1 className="text3xl underline"></h1>
        Hello Nation
        <div>Wish you were here for</div>
        <ul>
          <li>This thing</li>
          <li>This other thing</li>
          <li>What are you getting at?</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default App;
