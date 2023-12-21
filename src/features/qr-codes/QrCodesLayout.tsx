import { Link } from "react-router-dom";
import { getQrCodes } from "../../services/apiQr";
import { useQuery } from "@tanstack/react-query";
import QrRow from "./components/QrRow";
import { useState } from "react";


function LinksLayout() {
  const [showFilter, setShowFilter ] = useState('active')
  const { data, error } = useQuery({
    queryKey: ["qr-codes"],
    queryFn: getQrCodes,
  });
  
  if (error) {
    console.log(error);
  }
  console.log(data);
  return (
    <div className="flex flex-col items-center text-center gap-5 px-4 py-9  w-full max-w-[70rem] mx-auto">
      {data?.length !== 0 ? (
        <div className=" flex items-center justify-between w-full">
          <h2 className=" text-3xl font-bold ">QR Codes</h2>
          <div className="flex items-center gap-2">
            <button
              className=" flex items-center gap-1 rounded border p-2 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled
            >
              Export
            </button>
            <select className="p-2.5 rounded" value={showFilter} onChange={(e) => setShowFilter(e.target.value)} >
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
              <option value="customized">Customized</option>
            </select>
          </div>
        </div>
      ) : (
        ""
      )}

      {data?.length !== 0 ? (
        data?.map((qr) => <QrRow key={qr.id} qr={qr} />)
      ) : (
        <>
          <img
            className=" max-w-[400px]"
            src="qrc-list-empty.png"
            alt="Qr code list empty"
          />
          <h2 className=" text-3xl font-bold">
            Connect your audience with a simple scan
          </h2>
          <p className=" text-xl text-gray-700 font-light">
            Create a QR Code from any short link. Then edit, customize, and
            track your QR Codes here.
          </p>
        </>
      )}
      <Link className="btn-primary" to="create">
        Create a QR Code
      </Link>
      <Link>Learn more</Link>
    </div>
  );
}

export default LinksLayout;
