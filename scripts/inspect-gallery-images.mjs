import { readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const directories = [
  "exteriors",
  "gallery",
  "hospitality",
  "interiors",
];

const excludedFiles = [
  "/images/exteriors/banner-about.jpg",
];

const images = [];

for (const directory of directories) {
  const folder = path.join(
    "public",
    "images",
    directory
  );

  const files = readdirSync(folder, {
    withFileTypes: true,
  })
    .filter(
      (file) =>
        file.isFile() &&
        /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name)
    )
    .map((file) => file.name)
    .sort();

  for (const file of files) {
    const src = `/images/${directory}/${file}`;

    if (excludedFiles.includes(src)) continue;

    const filePath = path.join(folder, file);

    try {
      const result = execFileSync(
        "sips",
        [
          "-g",
          "pixelWidth",
          "-g",
          "pixelHeight",
          filePath,
        ],
        { encoding: "utf8" }
      );

      const width = Number(
        result.match(/pixelWidth:\s*(\d+)/)?.[1]
      );

      const height = Number(
        result.match(/pixelHeight:\s*(\d+)/)?.[1]
      );

      if (
        !Number.isInteger(width) ||
        !Number.isInteger(height) ||
        width <= 0 ||
        height <= 0
      ) {
        throw new Error("Invalid image dimensions");
      }

      images.push({
        src,
        width,
        height,
      });
    } catch (error) {
      console.error(
        `Unable to inspect: ${filePath}`,
        error.message
      );

      process.exitCode = 1;
    }
  }
}

console.log(JSON.stringify(images, null, 2));

console.error(`Total images: ${images.length}`);