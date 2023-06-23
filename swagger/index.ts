import fs from "fs";

export const options = { explorer: true };
export const swaggerDocument = JSON.parse(
  fs.readFileSync("./swagger/swagger.json", "utf-8")
);
