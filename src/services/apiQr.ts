import QRCode from "qrcode";
import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth";

export const GenerateQR = async (NewUrl: string, title: string) => {
  console.log("✅", title);
  try {
    const data = await QRCode.toDataURL(NewUrl);
    await setQRCode({ NewQr: data, NewLongUrl: NewUrl, NewTitle: title });
    console.log("after");
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

async function setQRCode({
  NewQr,
  NewLongUrl,
  NewTitle,
}: {
  NewQr: string;
  NewLongUrl: string;
  NewTitle?: string;
}): Promise<void> {
  console.log(NewQr, NewLongUrl, NewTitle);
  const user = await getCurrentUser();
  console.log(user);
  const { error } = await supabase
    .from("qr-codes")
    .insert([
      {
        qrImageUrl: NewQr,
        longUrl: NewLongUrl,
        title: NewTitle,
        user_id: user?.id,
      },
    ])
    .select();
  if (error) {
    console.log(error);
  }
}

export async function getQrCodes() {
  const { data, error } = await supabase.from("qr-codes").select("*");
  if (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}

export const deleteQrCode = async (id: number) => {
  const { error } = await supabase
    .from("qr-codes")
    .delete()
    .eq("id", id);
  if(error) return error.message
};
