import * as fs from "fs";
import multer from "multer";

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

export function convertFile(filePath: string, mimetype: string) {
  let image = fs.readFileSync(filePath);
  let encodedImage = image.toString("base64");
  let finalImage = {
    contentType: mimetype,
    data: Buffer.from(encodedImage, "base64"),
  };
  fs.unlink(filePath, (err) => {});

  return finalImage;
}

export var upload = multer({ storage: storage });
