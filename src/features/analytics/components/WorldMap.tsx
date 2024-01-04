import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useEffect, useState } from "react";

 

// const countries = {
//   IN: 88,
//   CN: 33,
//   RU: 79,
//   MY: 2,
//   GB: 100,
//   FK: 10,
//   AR: 50,
//   VE: 90,
//   TN: 30,
//   US: 34,
// };

export const colorScale = ["#E2AEFF", "#5E32CA"];
function WorldMap({ countries }: any) {
  // const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);



  const handleRegionClick = ( code: string): void => {
  // const handleRegionClick = (event: any, code: string): void => {
    // Update the state with the selected country code
    setSelectedCountry(code);
    console.log(selectedCountry)

    // Perform an AJAX request to fetch detailed information about the selected country
    // Adjust the endpoint and data payload based on your backend setup
    // axios
    //   .post("/api/getCountryData", { countryId: code })
    //   .then((response) => {
    //     // Handle the response from the backend (update map or perform other actions)
    //     console.log("Country Data:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching country data:", error);
    //   });
  };
  useEffect(() => {
    console.log(selectedCountry);
  }, [selectedCountry]);
  return (
    <div className=" m-auto w-[700px] h-[600px]">
      <VectorMap
        regionsSelectableOne
        zoomMax={16}
        map={worldMill}
        style={{ width: "100%", height: "100%" }}
        backgroundColor="#ccc"
        onRegionClick={handleRegionClick} // Add this event handler
        //selectedRegions={[selectedCountry]}
        series={{
          regions: [
            {
              values: countries,
              scale: colorScale,
              attribute: "fill",
            },
          ],
        }}
      />
      
    </div>
    
  );
}

export default WorldMap;
