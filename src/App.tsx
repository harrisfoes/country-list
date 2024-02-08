import "./index.css";
import { useState, useEffect } from "react";

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
    <main className="min-h-screen dark:bg-black dark:text-white flex flex-col items-center justify-center">
      <h1 className="text3xl underline"></h1>
      Hello Nation
      <div>Wish you were here for</div>
      <button
        className="bg-slate-800 p-4 rounded-xl hover:opacity-75 text-white font-bold dark:bg-white dark:text-slate-800"
        onClick={handleThemeSwitch}
      >
        Change Theme
      </button>
      <ul>
        <li>This thing</li>
        <li>This other thing</li>
        <li>What are you getting at?</li>
      </ul>
    </main>
  );
}

export default App;
