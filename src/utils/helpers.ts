import download from "downloadjs";


export const downloadfile = (qrImage: string) => {
  download(qrImage, "downloaded_image.jpg", "image/jpeg");
};


export function formatDate(inputDate: string): string {
  const dateObject = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
}


