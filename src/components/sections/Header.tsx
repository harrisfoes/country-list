type HeaderProps = {
  theme: string | null;
  handleThemeSwitch: () => void;
};

export default function Header({ handleThemeSwitch, theme }: HeaderProps) {
  return (
    <header className="dark:bg-darkblue-500 dark:text-white  px-3 py-4 text-black border-b-2 dark:border-b-darkblue-500 dark:border-b-2">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="font-bold">Where in the world?</div>
        <div>
          <button
            className="flex gap-2 items-center p-4 rounded-xl hover:opacity-75"
            onClick={handleThemeSwitch}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.8426 11.052C7.73486 11.052 5.21543 8.74226 5.21543 5.89457C5.21543 4.82024 5.57343 3.82526 6.18514 3C3.75229 3.75612 2 5.86498 2 8.35045C2 11.4708 4.75943 14 8.16286 14C10.8743 14 13.1757 12.3945 14 10.1636C13.1 10.7238 12.0129 11.052 10.8426 11.052Z"
                fill="white"
                stroke={`${theme === "light" ? "black" : ""}`}
              />
            </svg>
            Dark Mode
          </button>
        </div>
      </div>
    </header>
  );
}
