import axios from "axios";

export async function uploadImagesCloudinary(files, upload_preset, public_id, signatures) {
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

    const { signature, timestamp } = signatures;
    const formdata = new FormData();
    formdata.append("file", file.image);
    formdata.append("public_id", "cacatua");
    formdata.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formdata.append("api_secret", import.meta.env.VITE_CLOUDINARY_API_SECRET);
    formdata.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    // formdata.append("signature", signature);
    // formdata.append("timestamp", `${timestamp}`);
    //formdata.append("upload_preset", "pelusa");
    /* upload_preset: "user_avatar",
    formdata.append("overwrite", true);
        public_id: "cacatua",
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        overwrite: true, */
    // formdata.append("folder", "avatars");
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
