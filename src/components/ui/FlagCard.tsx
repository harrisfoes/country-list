type FlagCardProps = {
  image: string;
  name: string;
  population: string;
  region: string;
  capital: string | undefined;
};

export default function FlagCard({
  image,
  name,
  population,
  region,
  capital,
}: FlagCardProps) {
  return (
    <>
      <div className="flag-card mx-auto mt-4 w-[264px] shadow-md">
        <img
          src={image}
          alt="flag-image"
          className="mx-auto h-[160px] border shadow-md dark:border-darkblue-500"
        />
        <div className="flag-text mx-5 mt-4 pb-6">
          <span className="text-lg font-extrabold">{name}</span>
          <div className="details mt-4 flex flex-col">
            <div>
              <span className="font-medium">Population: </span>
              <span className="font-light">{population}</span>
            </div>
            <div>
              <span className="font-medium">Region: </span>
              <span className="font-light">{region}</span>
            </div>
            <div>
              <span className="font-medium">Capital: </span>
              <span className="font-light">{capital ? capital : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
