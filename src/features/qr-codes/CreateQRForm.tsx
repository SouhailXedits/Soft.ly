import { useState } from "react";
import { useGenerateQR } from "./hooks/useGenerateQR";
import { BsArrowRight, BsLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUser } from "../auth/useUser";

function CreateLinkForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const { generateQr } = useGenerateQR();

  const isButtonDisabled = url === "";
  const {user} = useUser()
  const userId = user?.id
  async function handleClick() {
    if (userId) {
      generateQr({ url, title, userId, tags: []});
    } else {
      console.error("User ID is undefined");
    }
  }

  return (
    <div className="flex bg-white min-h-screen">
      <div className=" flex flex-col justify-between">
        <div className="flex flex-col basis-[60%] px-5 py-10 gap-3 relative">
          <h1 className=" text-xl font-bold">Enter your QR Code destination</h1>
          <p>Destination URL</p>
          <input
            className="form-input"
            type="text"
            placeholder="https://example.com/my-long-url"
            defaultValue={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <h1 className=" text-xl font-bold mt-6 mb-2">Code details</h1>
          <p>Title(optional)</p>
          <input
            className="form-input"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className=" text-lg font-bold mt-6">Short link</h2>
          <p className=" text-sm text-gray-600">
            The short link directs users to the website or content linked to
            your QR Code. If you update the short link after creating the QR
            Code it will change the code.
          </p>
          <div className="flex justify-between gap-3 items-center">
            <div className=" space-y-2 w-full">
              <p className=" flex items-center font-medium gap-1">
                Domain <BsLockFill />
              </p>
              <select
                disabled={true}
                className=" bg-gray-100 form-input w-full"
              >
                <option value="">softy.link</option>
              </select>
            </div>
            <p>/</p>
            <div className="space-y-2 w-full">
              <p>
                Custom back-half <span>(optional)</span>
              </p>
              <input type="text" className="form-input w-full" />
            </div>
          </div>
        </div>
        <div className=" sticky px-4 bottom-0 py-3 flex justify-between items-center shadow-div bg-white">
          <Link to="/" className="border px-4 py-1.5 rounded">
            Cancel
          </Link>
          <button
            onClick={handleClick}
            disabled={isButtonDisabled}
            className={`btn-primary flex items-center gap1 ${
              isButtonDisabled ? "opacity-50" : ""
            }`}
          >
            Generate Qr Code <BsArrowRight />
          </button>
        </div>
      </div>
      <div className=" flex flex-col basis-[40%] items-center bg-gray-100 px-4 py-10 gap-7 ">
        <p className=" text-xl font-bold">Preview</p>
        <img className=" w-[70%] " src="/qr-preview.jpg" alt="Qr code image" />
      </div>
    </div>
  );
}

export default CreateLinkForm;
