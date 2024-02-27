import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CountryAPISource } from "../types/api";

export default function Country() {
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

        //from all the borders in countryData[]
        //check all the country data, where alphacode coincides with countrydata entries
        //return the regular names of those countries to the array
        console.log(countryData[0]);
        console.log(countryData[0].borders);
        console.log(allData);
        const convertedBorders = countryData[0].borders?.map(
          (border: string) =>
            allData.filter(
              (country: CountryAPISource) => country.alpha3Code === border,
            )[0].name,
        );

        console.log(convertedBorders);
        setBorders(convertedBorders);

        console.log(countryData[0]);
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
          <button className="my-12 border px-4 py-2 shadow-lg hover:opacity-75">
            Back
          </button>
        </Link>

        {data && (
          <section>
            <div className="lg:flex lg:gap-8">
              <div className="lg:flex lg:w-1/2 lg:items-center lg:justify-center">
                <img
                  src={data.flag}
                  alt={data.name + " flag"}
                  className="w-[98%] shadow-lg"
                />
              </div>

              <div className="lg:w-1/2">
                <div className="my-6 text-2xl font-extrabold">{data.name}</div>
                <div className="text-group lg:flex">
                  <div className="grp-1 lg:w-1/2">
                    <div className="my-2">
                      <span className="font-semibold">Native Name: </span>
                      <span>{data.nativeName}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-semibold">Population: </span>
                      <span>{data.population}</span>
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
                    <div className="mb-2 mt-12 lg:mt-0">
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

                <div className="mb-12 mt-12 flex flex-col lg:flex-row lg:items-start lg:gap-4">
                  <h1 className="text-lg font-semibold">Border Countries:</h1>
                  <div>
                    {borders
                      ? borders?.map((borderCountry) => {
                          return (
                            <Link to={"/country-list/country/" + borderCountry}>
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
