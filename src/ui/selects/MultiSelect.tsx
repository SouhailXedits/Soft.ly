import { useCreateTag } from "@/features/links/hooks/useCreateTag";
import { getAllUserTags } from "@/services/apiTag";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function AnimatedMulti({
  userId,
  setTags,
  tags: oldTags,
}: {
  userId: string;
  setTags: any;
  tags?: any;
}) {
  const queryClient = useQueryClient();
  const { data: tags } = useQuery({
    queryKey: ["user-tags", userId],
    queryFn: () => getAllUserTags(userId),
  });

  console.log(tags);
  console.log(oldTags);
  const oldReformedTags= oldTags?.map((tag: any) => ({ value: tag._id, label: tag.label }));
  const { createTag } = useCreateTag();

  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<any>(oldReformedTags);
  const options = tags?.map((tag: any) => ({
    value: tag._id,
    label: tag.label,
  }));
  console.log(options);
  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      console.log("clicked");
      console.log(selectedOptions);

      const newOption = { value: inputValue.trim(), label: inputValue.trim() };
      setSelectedOptions(selectedOptions && [...selectedOptions, newOption]);
      setInputValue("");
      event.preventDefault(); // Prevents form submission
      // const createdTag = createTag({
      //   userId,
      //   value: inputValue.trim(),
      //   label: inputValue.trim(),
      // }) as any;
      const existingTag = tags.find(
        (tag: any) => tag.label === inputValue.trim()
      );
      console.log(existingTag);
      if(existingTag) {
        setSelectedOptions(selectedOptions.concat(existingTag));
        console.log('already exists');
        return;
      }
      console.log('created');
      createTag({
        userId,
        value: inputValue.trim(),
        label: inputValue.trim(),
      }) as any;
      setTimeout(() => {
        const createdTag = queryClient.getQueryData(["created-tag"]) as any;
        console.log(createdTag);
        const { _id, label } = createdTag;
        setTags([...selectedOptions, createdTag]);
        setSelectedOptions([
          ...selectedOptions,
          {
            value: _id,
            label: label,
          },
        ]);
      }, 1000);
      // console.log(data);
    }
  };
  // console.log(tags);

  const handleChange = (selectedOptions: any) => {
    console.log(selectedOptions);
    setTags(selectedOptions);
    setSelectedOptions(selectedOptions);
  };
  const customNoOptionsMessage = ({ inputValue }: any) => {
    return `No options found. Press Enter to add "${inputValue}" as a new option.`;
  };
  console.log(selectedOptions);
  
  

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      inputValue={inputValue}
      onInputChange={(input) => {
        setInputValue(input);
      }}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={selectedOptions}
      isMulti
      options={options}
      noOptionsMessage={customNoOptionsMessage}
    />
  );
}
