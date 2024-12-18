import express from "express";
import { StatusCodes } from "http-status-codes";
import upload from "#server/configs/multer-config";
import { handleResponse } from "#server/helpers/responses";
import storage_service from "#server/services/storage.service";

export const uploadRouter = express.Router();

uploadRouter.post("/single", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;

    const fileUpload = await storage_service.cloudinary.uploadImageFile(file);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "File uploaded successfully",
      data: fileUpload,
    });
  } catch (error) {
    next(error);
  }
});
uploadRouter.post("/array", upload.array("files"), async (req, res, next) => {
  try {
    const files = req.files;

    const filesUpload = [];
    for (const file of files) {
      const fileUpload = await storage_service.cloudinary.uploadImageFile(file);
      filesUpload.push(fileUpload);
    }

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Files uploaded successfully",
      data: filesUpload,
    });
  } catch (error) {
    next(error);
  }
});
uploadRouter.post(
  "/fields",
  upload.fields([
    {
      name: "files1",
    },
    {
      name: "files2",
    },
  ]),
  async (req, res, next) => {
    try {
      const files = req.files;
      const files1 = files.files1;
      const files2 = files.files2;

      const files1Upload = [];
      for (const file of files1) {
        const fileUpload = await storage_service.cloudinary.uploadImageFile(
          file
        );
        files1Upload.push(fileUpload);
      }

      const files2Upload = [];
      for (const file of files2) {
        const fileUpload = await storage_service.cloudinary.uploadImageFile(
          file
        );
        files2Upload.push(fileUpload);
      }

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Files uploaded successfully",
        data: {
          files1: files1Upload,
          files2: files2Upload,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);
uploadRouter.delete("/delete", async (req, res, next) => {
  try {
    const body = req.body;

    const fileDelete = await storage_service.cloudinary.deleteFile(
      body.file_url
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "File deleted successfully",
      data: fileDelete,
    });
  } catch (error) {
    next(error);
  }
});

export default uploadRouter;
