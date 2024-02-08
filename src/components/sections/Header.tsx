type HeaderProps = {
  handleThemeSwitch: () => void;
};

export default function Header({ handleThemeSwitch }: HeaderProps) {
  return (
    <header className="dark:bg-darkblue-500 dark:text-white flex justify-between items-center px-3 py-4 text-black border-b">
      <div className="font-bold">Where in the world?</div>
      <div>
        <button
          className=" p-4 rounded-xl hover:opacity-75"
          onClick={handleThemeSwitch}
        >
          Dark Mode
        </button>
      </div>
    </header>
  );
}
