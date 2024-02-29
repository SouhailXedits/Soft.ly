import { Link } from "react-router-dom";

function HeadingCTA({variation}: {variation: "qrCode" | "url"}) {
    return (
      <div>
        <div className=" sm:flex-col flex items-center border-dashed border-2 border-gray-200 rounded-lg w-full justify-around h-full">
          <img
            src={`/${variation === "qrCode" ? "qr_" : "url-"}illustration.png`}
            alt={`/${variation === "qrCode" ? "qr code" : "url"} illustration`}
            className={`w-[60%] ${variation === "qrCode" ? "relative bottom-8" : ""}`}
          />
          <div className=" flex gap-4 items-center m-2">
            <p>{`Make it ${
              variation === "qrCode" ? " short" : "scannable"
            }`}</p>
            <Link
              to={variation === "qrCode" ? "/qrcodes" : "/links"}
              className=" border border-blue-600 rounded p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            >
              {`Go to ${variation === "qrCode" ? "QR Codes" : "links"}`}
            </Link>
          </div>
        </div>
      </div>
    );
}

export default HeadingCTA
