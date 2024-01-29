"use server";
import DatauriParser from "datauri/parser";
import path from "path";
import cloudinary from "cloudinary";
import { writeFile, unlink, mkdir } from "fs/promises";
import { randomUUID } from "crypto";
import { existsSync } from "fs";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const parser = new DatauriParser();

export async function uploadFile(file: File, folder: string) {
  const [name, extension] = await fileNameAndExt(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  if (process.env.NODE_ENV === "development" && file) {
    console.log("__dirname: ", __dirname);
    try {
      const fileName = `${name}-${Date.now()}`;

      if (!existsSync(__dirname + `/../../../../../public/${folder}`)) {
        await mkdir(__dirname + `/../../../../../public/${folder}`);
      }

      const filePath = `/${folder}/${fileName}.${extension}`;
      const dest = path.join(process.cwd(), "/public", filePath);

      writeFile(dest, buffer);
      console.info("file upload locally at: ", dest);
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  if (process.env.NODE_ENV === "production" && file) {
    try {
      const { base64 } = parser.format(extension as string, buffer);
      const file = `data:image/${extension};base64,${base64}`;

      const { secure_url } = await cloudinary.v2.uploader.upload(file, {
        public_id: randomUUID(),
      });
      console.info("file upload to cloudinary at: ", secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  }
}

export async function deleteFile(filePath: string) {
  if (process.env.NODE_ENV === "development") {
    try {
      const dest = path.join(process.cwd(), "/public", filePath);
      await unlink(dest).then(() =>
        console.info("file deleted locally at: ", dest),
      );
      return;
    } catch (error) {
      console.error(error);
    }
  }

  if (process.env.NODE_ENV === "production") {
    try {
      await cloudinary.v2.uploader.destroy(filePath, {
        resource_type: "image",
      });
      console.info("file deleted in cloudinary at: ", filePath);
      return;
    } catch (error) {
      console.error(error);
    }
  }
}

async function fileNameAndExt(str: string) {
  const file = str.split("/").pop();
  return [
    file?.substring(0, file?.lastIndexOf(".")),
    file?.substring(file?.lastIndexOf(".") + 1, file?.length),
  ];
}
