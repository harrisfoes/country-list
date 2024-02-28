import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CountryAPISource } from "../types/api";

export default function Country({ theme }: { theme: string }) {
  let { countryId } = useParams();
  const [data, setData] = useState<CountryAPISource | null>(null);
  const [borders, setBorders] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/country-list/data.json")
      .then((res) => res.json())
      .then((allData) => {
        const countryData = allData.filter(
          (data: CountryAPISource) => data.name === countryId,
        );

        const convertedBorders = countryData[0].borders?.map(
          (border: string) =>
            allData.filter(
              (country: CountryAPISource) => country.alpha3Code === border,
            )[0].name,
        );

        //console.log(convertedBorders);
        setBorders(convertedBorders);

        //console.log(countryData[0]);
        setData(countryData[0]);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation", error);
      });
  }, [countryId]);

  return (
    <>
      <div className="container mx-auto min-h-screen max-w-[90%]  dark:text-white lg:max-w-[1480px]">
        <Link to="/country-list">
          <button className="my-12 flex items-center gap-2 rounded-lg border px-12 py-4 shadow-lg hover:opacity-75 dark:border-0 dark:bg-darkblue-500 dark:shadow-lg">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.46447 0.107445L7.64298 1.28596L3.75389 5.17504L18.6031 5.17504L18.6031 6.82496L3.75389 6.82496L7.64298 10.714L6.46447 11.8926L0.57191 6L6.46447 0.107445Z"
                fill={`${theme === "light" ? "black" : "white"}`}
              />
            </svg>
            Back
          </button>
        </Link>

        {data && (
          <section>
            <div className="lg:flex lg:gap-14">
              <div className="lg:flex lg:w-1/2 lg:items-center lg:justify-center">
                <img
                  src={data.flag}
                  alt={data.name + " flag"}
                  className="w-[98%] max-w-[560px] shadow-lg"
                />
              </div>

              <div className="mt-12 lg:w-1/2">
                <div className="my-8 text-2xl font-extrabold">{data.name}</div>
                <div className="text-group lg:flex">
                  <div className="grp-1 lg:w-1/2">
                    <div className="my-2">
                      <span className="font-semibold">Native Name: </span>
                      <span>{data.nativeName}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-semibold">Population: </span>
                      <span>{data.population.toLocaleString()}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-semibold">Region: </span>
                      <span>{data.region}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-semibold">Sub Region: </span>
                      <span>{data.subregion}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-semibold">Capital: </span>
                      <span>{data.capital}</span>
                    </div>
                  </div>

                  <div className="grp-2 lg:w-1/2">
                    <div className="mb-2 mt-16 lg:mt-0">
                      <span className="font-semibold">Top Level Domain: </span>
                      <span>{data.topLevelDomain}</span>
                    </div>
                    <div className="my-2 ">
                      <span className="font-semibold">Currencies: </span>
                      <span>
                        {data.currencies
                          ?.map((currency) => currency.name)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="my-2 ">
                      <span className="font-semibold">Languages: </span>
                      <span>
                        {data.languages
                          .map((language) => language.name)
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-12 mt-16 flex flex-col lg:flex-row lg:items-start lg:gap-4">
                  <h1 className="text-lg font-semibold">Border Countries:</h1>
                  <div>
                    {borders
                      ? borders?.map((borderCountry) => {
                          return (
                            <Link to={"/country-list/" + borderCountry}>
                              <button className="mx-2 my-2 border p-4 shadow-md dark:border-0 dark:bg-darkblue-500">
                                {borderCountry}
                              </button>
                            </Link>
                          );
                        })
                      : "None"}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
