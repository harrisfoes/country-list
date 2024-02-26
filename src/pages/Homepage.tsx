import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import { Outlet } from "react-router-dom";

type HomePageProps = {
  handleThemeSwitch: () => void;
  theme: string | null;
};

export default function Homepage({ handleThemeSwitch, theme }: HomePageProps) {
  return (
    <>
      <div className="mx-auto dark:bg-darkblue-600">
        <Header handleThemeSwitch={handleThemeSwitch} theme={theme} />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
