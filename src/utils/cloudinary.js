import axios from "axios";

export async function uploadImagesCloudinary(files, upload_preset, public_id) {
  console.log(files);
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const preset_key = "user_avatar"; //import.meta.env.VITE_CLOUDINARY_API_SECRET || '';

  const URL = "https://api.cloudinary.com/v1_1/djdtbqhxm/image/upload";

  const images_urls = [];
  const promises = [];

  files.forEach((file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", preset_key);
    formdata.append("public_id", public_id);
    formdata.append("overwrite", true);
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
  console.log(images_urls)
  return images_urls;
}
