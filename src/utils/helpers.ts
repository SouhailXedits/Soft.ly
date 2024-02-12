import download from "downloadjs";


export const downloadfile = (qrImage: string) => {
  download(qrImage, "downloaded_image.svg", "image/svg");
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


export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}