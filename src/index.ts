import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT;

if (!port) {
  throw new Error("PORT is not defined");
}

app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`Access from: http://localhost:${port}`);
});

