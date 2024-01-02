

import { DataCountry } from "../../../types";

const CountryRow = ({ country }: DataCountry) => {
  return (
    <div className="flex justify-between mt-3">
      <p>{country.id}</p>
      <p className=" basis-[60%]">{country.name}</p>
      <p>{country.clicks}</p>
      <p>X</p>
    </div>
  );
};

export default CountryRow;
