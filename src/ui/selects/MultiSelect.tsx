import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function AnimatedMulti() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleKeyDown = (event:any) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newOption = { value: inputValue.trim(), label: inputValue.trim() };
      setSelectedOptions([...selectedOptions, newOption]);
      setInputValue("");
      event.preventDefault(); // Prevents form submission
    }
  };

  const handleChange = (selectedOptions:any) => {
    setSelectedOptions(selectedOptions);
  };
  const customNoOptionsMessage = ({ inputValue }: any) => {
    return `No options found. Press Enter to add "${inputValue}" as a new option.`;
  };


  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      inputValue={inputValue}
      onInputChange={(input) => setInputValue(input)}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={selectedOptions}
      isMulti
      options={options}
      noOptionsMessage={customNoOptionsMessage}
    />
  );
}
