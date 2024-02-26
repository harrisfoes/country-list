import { useParams } from "react-router-dom";
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
  }, []);

  return (
    <>
      <div className="container mx-auto min-h-screen max-w-[90%]">
        <button className="my-4 border px-4 py-2 shadow-lg hover:opacity-75">
          Back
        </button>

        {data && (
          <section>
            <div>{data.name}</div>
            <div>{data.flag}</div>
            <div>{data.population}</div>
            <div>{data.region}</div>
            <div>{data.subregion}</div>
            <div>{data.capital}</div>

            <div>{data.topLevelDomain}</div>
            <div>{data.currencies?.map((currency) => currency.name)}</div>
            <div>{data.languages.map((language) => language.name)}</div>
            <div>{borders?.map((borderCountry) => borderCountry)}</div>
          </section>
        )}
      </div>
    </>
  );
}
