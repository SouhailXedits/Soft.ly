import { useCreateTag } from "@/features/links/hooks/useCreateTag";
import { getAllUserTags } from "@/services/apiTag";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ userId , setTags}: { userId: string, setTags: any }) {
  const { data: tags, isPending: isTagsPending } = useQuery({
    queryKey: ["user-tags", userId],
    queryFn: () => getAllUserTags(userId),
  });

  console.log(tags);
  const {createTag, isPending} = useCreateTag();



  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const options = tags?.map((tag: any) => ({
    value: tag._id,
    label: tag.label,
  }));
  console.log(options)
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newOption = { value: inputValue.trim(), label: inputValue.trim() };
      setSelectedOptions([...selectedOptions, newOption]);
      setInputValue("");
      event.preventDefault(); // Prevents form submission
      createTag({userId, value: inputValue.trim(), label: inputValue.trim()})
    }
  };

  const handleChange = (selectedOptions: any) => {
    console.log(selectedOptions)
    const selectedIds = selectedOptions.map((option: any) => option.value);
    setTags(selectedIds);
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
