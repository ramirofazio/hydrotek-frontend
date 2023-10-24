import axios from "axios";


export async function uploadImagesCloudinary(files, upload_preset, public_id, signature) {
  console.log(files);
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const preset_key = "user_avatar"; //import.meta.env.VITE_CLOUDINARY_API_SECRET || '';

  const URL = "https://api.cloudinary.com/v1_1/djdtbqhxm/image/upload";

  const images_urls = [];
  const promises = [];

  files.forEach((file) => {
    /* let lector = "";
    const reader = new FileReader();
    reader.onload = () => {
      lector = typeof reader.result === "string" ? reader.result : "cacatua";
    };
    reader.readAsDataURL(file);
    console.log("leo: ", lector); */

    console.log(`-${signature.timestamp}-`);
    const formdata = new FormData();
    formdata.append("file", file.image);
    formdata.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    // formdata.append("public_id", "cacatua");
    // formdata.append("eager", "w_400,h_300,c_pad|w_260,h_200,c_crop");
    formdata.append("signature", signature.signature);
    formdata.append("timestamp", `${signature.timestamp}`);

    // formdata.append("upload_preset", "user_avatar");
    // formdata.append("folder", "avatars");
    //formdata.append("overwrite", true);
    promises.push(axios.post(URL, formdata));
  });

  try {
    const responses = await Promise.all(promises);
    responses.forEach((res) => {
      const url = res?.data?.secure_url;
      if (url) {
        images_urls.push(url);
      }
    });
  } catch (err) {
    console.log(err);
  }
  console.log(images_urls);
  return images_urls;
}
