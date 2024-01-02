import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

 

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
  return (
    <div className=" m-auto w-[700px] h-[600px]">
      <VectorMap
        map={worldMill}
        style={{ width: "700px", height: "600px" }}
        backgroundColor="#ccc"
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
