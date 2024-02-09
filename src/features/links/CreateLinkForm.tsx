import { Link } from "react-router-dom";
import { useShorterUrl } from "./hooks/useShortenLink";
import { ChangeEvent, useState } from "react";
import { BsArrowRight, BsLockFill } from "react-icons/bs";
import { useUser } from "../auth/useUser";
import { DOMAIN_NAME } from "@/config";

function CreateLinkForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [back_half, setBackhalf] = useState("");
  const [backHalfFormatWarning, setBackHalfFormatWarning] = useState(false);
  const { shortenUrl, isPending } = useShorterUrl();
  const isButtonDisabled = url === "";
  const { user} = useUser()
  // if(isLoading ) return Loader
  const userId = user?.id
  async function handleClick() {
    if(userId) {
      shortenUrl({ url, title, userId, back_half });
    }
  }

  const handleUrlBlur = () => {
    let updatedUrl = url.trim();

    if (
      updatedUrl !== "" &&
      !updatedUrl.startsWith("http://") &&
      !updatedUrl.startsWith("https://")
    ) {
      updatedUrl = "https://" + updatedUrl + "/";
      setUrl(updatedUrl);
    }
  };

  const handleBackHalfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBackHalf = e.target.value;

    // const backHalfRegex = /^[a-zA-Z0-9]{0,10}$/;

    setBackHalfFormatWarning(false);
    // setBackHalfFormatWarning(true);
    setBackhalf(newBackHalf);
    // if (!backHalfRegex.test(newBackHalf)) {
    // } else {
    // }
  };

  const domainName = DOMAIN_NAME


  return (
    <div className="flex bg-white min-h-screen px-12 py-7 justify-center">
      <div className=" flex flex-col justify-between">
        <div className="flex flex-col basis-[60%] px-5 py-10 gap-3 relative">
          <h1 className=" text-3xl font-bold">Create new</h1>
          <p>Destination URL</p>
          <input
            className="form-input"
            type="text"
            placeholder="https://example.com/my-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={handleUrlBlur}
          />

          <h1 className=" text-xl font-bold mt-6 mb-2">Code details</h1>
          <p>Title(optional)</p>
          <input
            className="form-input"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h1 className=" text-2xl font-bold mt-4 pt-6 border-t-2 ">
            Ways to share
          </h1>
          <h2 className=" text-lg font-bold">Short link</h2>
          <p className=" text-sm text-gray-600">
            The short link directs users to the website or content linked to
            your QR Code. If you update the short link after creating the QR
            Code it will change the code.
          </p>
          <div className="flex justify-between gap-5 items-center">
            <div className=" space-y-2 w-full">
              <p className=" flex items-center font-medium gap-1">
                Domain <BsLockFill />
              </p>
              <select
                disabled={true}
                className=" bg-gray-100 form-input w-full"
              >
                <option value="">{domainName}</option>
              </select>
            </div>
            <p>/</p>
            <div className="space-y-2 w-full">
              <p>
                Custom back-half <span>(optional)</span>
              </p>
              <input
                type="text"
                className="form-input w-full"
                defaultValue={back_half}
                onChange={handleBackHalfChange}
              />
              {backHalfFormatWarning && (
                <p className="text-red-500 mt-2">
                  Please enter a valid back-half with a maximum length of 10
                  alphanumeric characters.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" sticky px-4 bottom-0 py-3 flex justify-end space-x-4 items-center  border bg-white ">
          <Link to="/" className="border px-4 py-1.5 rounded">
            Cancel
          </Link>
          <button
            onClick={handleClick}
            disabled={isButtonDisabled || isPending}
            className={`btn-primary flex items-center gap1 ${
              isButtonDisabled ? "opacity-50" : ""
            }`}
          >
            Generate Short Link <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLinkForm;
