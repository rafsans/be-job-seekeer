import express from "express";
// import type {Request, Response} from 'express';
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from './config/swagger.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

if (!port) {
  throw new Error("PORT is not defined");
}

app.use(express.json());

app.use("/api/v1/users", userRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World with Express');
// });

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Job Portal API Docs",
  }),
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
