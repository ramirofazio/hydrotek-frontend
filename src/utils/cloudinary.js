import axios from "axios";
/* eslint-disable */

export async function uploadImagesCloud(files = [], clientId) {
  const cloud_name = import.meta.env.CLOUDINARY_CLOUD_NAME;

  const URL = "https://api.cloudinary.com/v1_1/" + cloud_name + "/image/upload";

  const photos = [];
  const promises = [];

  files.forEach((file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", clientId);
    promises.push(axios.post(URL, formdata));
  });

  try {
    const responses = await Promise.all(promises);
    responses.forEach((res) => {
      const url = res?.data?.secure_url;
      if (url) {
        photos.push(url);
      }
    });
  } catch (err) {
    console.log(err);
  }

  return photos;
}

// ? En desuso, pero puede ser muy util para pedidos desde el front
export async function uploadImagesCloudinary(files, upload_preset, public_id, signatures) {
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const preset_key = "user_avatar"; //import.meta.env.VITE_CLOUDINARY_API_SECRET || '';

  const URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const images_urls = [];
  const promises = [];

  files.forEach((file) => {
    const { signature, timestamp } = signatures;
    const formdata = new FormData();
    formdata.append("file", file.image);
    formdata.append("public_id", "id_de_la_img");
    formdata.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formdata.append("api_secret", import.meta.env.VITE_CLOUDINARY_API_SECRET);
    formdata.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    // formdata.append("signature", signature);
    // formdata.append("timestamp", `${timestamp}`);
    //formdata.append("upload_preset", preset_key);
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
  return images_urls;
}
