import { useEffect, useState } from "react";

import { addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const pastMonth = Date.now();

export default function DateRangePicker({ setdate, defaultSelected }: any) {
  // const defaultSelected: DateRange = {
  //   from: pastMonth,
  //   to: addDays(pastMonth, 4),
  // };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  useEffect(() => {
    // Only call setdate when range changes
    if (range) {
      setdate(range);
    }
  }, [range]);
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
