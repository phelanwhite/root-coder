import { v2 as cloudinaryConfig } from "cloudinary";
import envConfig from "./env.config.js";

cloudinaryConfig.config({
  cloud_name: envConfig.CLOUDINARY_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
});

export default cloudinaryConfig;

const folderSite = `test-mongodb`;

export async function cloudinary_uploadFile(file, folder = ``) {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;
  const fileUri = await cloudinaryConfig.uploader.upload(dataURI, {
    folder: `${folderSite}/${folder}`,
  });

  return fileUri;
}

export async function cloudinary_deleteFile(fileDeleteUrl, folder = ``) {
  const public_id = fileDeleteUrl?.split("/")?.pop()?.split(".")?.[0];
  console.log(public_id);
  await cloudinaryConfig.uploader.destroy(
    `${folderSite}/${folder}/` + public_id
  );
}
