import Header from "../components/sections/Header";
import Main from "../components/sections/Main";
import Footer from "../components/sections/Footer";

type HomePageProps = {
  handleThemeSwitch: () => void;
  theme: string | null;
};

export default function Homepage({ handleThemeSwitch, theme }: HomePageProps) {
  return (
    <>
      <div className="mx-auto dark:bg-darkblue-600">
        <Header handleThemeSwitch={handleThemeSwitch} theme={theme} />
        <Main />
        <Footer />
      </div>
    </>
  );
}
