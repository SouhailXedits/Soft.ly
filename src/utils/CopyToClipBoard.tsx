
import copy from "clipboard-copy";
import { BsCopy } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { CopyToClipboardButtonProps } from "../types";

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  text,
}) => {


  const handleCopyClick = async () => {
    try {
      await copy(text);

      toast.success('coppied successfully')

    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div>
      <button className=" flex items-center gap-2 rounded border p-2" onClick={handleCopyClick}>
        <BsCopy /> <span className=" sm:hidden"> copy</span>
      </button>
    </div>
  );
};

export default CopyToClipboardButton;
