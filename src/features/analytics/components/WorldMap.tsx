// import { VectorMap } from "@react-jvectormap/core";
// import { worldMill } from "@react-jvectormap/world";
// import { useEffect, useState } from "react";

// export const colorScale = ["#E2AEFF", "#5E32CA"];

// function WorldMap({ countries }: any) {
//   console.log(countries)
//   const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

//   const handleRegionClick = (_, code: string): void => {
//     setSelectedCountry(code);
//   };

//   // ['TN': 3]

//   // const handleRegionTipShow = (e: any, label: string, code: string): void => {
//   //   // You can customize the tooltip content here based on the country code
//   //   const customData = getCustomDataForCountry(code);
//   //   const customTooltip = `<div class="custom-tooltip">
//   //                            <p>${label}</p>
//   //                            ssss
//   //                            <p>Custom Data: ${customData}</p>
//   //                          </div>`;

//   //   e.html = customTooltip;
//   // };

//   useEffect(() => {
//     console.log(selectedCountry);
//   }, [selectedCountry]);

//   // const getCustomDataForCountry = (code: string): string => {
//   //   const customDataMap = {
//   //     // Add custom data for each country as needed
//   //     US: "Custom Data for the United States",

//   //   };

//   //   return customDataMap[code] || "No custom data available";
//   // };

//   return (
//     <div className="m-auto w-[700px] h-[600px]">
//       <VectorMap
//         regionsSelectableOne
//         zoomMax={16}
//         map={worldMill}
//         style={{ width: "100%", height: "100%" }}
//         backgroundColor="#ccc"
//         onRegionClick={handleRegionClick}
//         onRegionTipShow={function regionalTip(_, label, code) {
//           // setTimeout(() => {
//           //   console.log("Country Code:", code);
//           //   console.log("Countries:", countries);
//           // }, 0);

//           const countryData = countries[code] || "No data available";
//           return label.html(
//             `<div><p>${label.html()} </p><p>${countryData} </p></div>`
//           );
//         }}
//         series={{
//           regions: [
//             {
//               values: countries,
//               scale: colorScale,
//               attribute: "fill",
//             },
//           ],
//         }}
//       />
//     </div>
//   );
// }

// export default WorldMap;
