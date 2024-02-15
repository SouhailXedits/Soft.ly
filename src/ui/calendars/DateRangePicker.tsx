import { useEffect, useState } from "react";

import {  format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


export default function DateRangePicker({ setdate, defaultSelected }: any) {
  // const defaultSelected: DateRange = {
  //   from: pastMonth,
  //   to: addDays(pastMonth, 4),
  // };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  console.log(range);
  useEffect(() => {
    if (range) {
      // If only 'from' is selected and 'to' is not selected, set 'to' to be the same as 'from'
      if (range.from && !range.to) {
        setRange((prevRange:any) => ({
          ...prevRange,
          to: range.from,
        }));
      }
      setdate(range);
    }
  }, [range, setdate]);
  // setdate(range);
  const css = `
  .rdp-day_selected { 
    background-color: #0000ff;
    color: white
  }


`;

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <>
      <style>{css}</style>

      <DayPicker
        id="test"
        mode="range"
        // defaultMonth={pastMonth}
        selected={range}
        footer={footer}
        onSelect={setRange}
      />
    </>
  );
}
