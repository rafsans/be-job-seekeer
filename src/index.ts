import express from "express";
// import type {Request, Response} from 'express';
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import onboardingRoutes from "./routes/candidate/onboardingRoutes.js";
import profileRoutes from "./routes/candidate/profileRoutes.js";
import experienceRoutes from "./routes/candidate/experienceRoutes.js";
import educationRoutes from "./routes/candidate/educationRoutes.js";
import resumeRoutes from "./routes/candidate/resumeRoutes.js";
import skillRoutes from "./routes/candidate/skillRoutes.js";
import jobRoutes from "./routes/candidate/jobRoutes.js";
import certificationRoutes from "./routes/candidate/certificationRoutes.js";
import recruiterCompanyRoutes from "./routes/recruiter/companyRoutes.js";
import recruiterJobRoutes from "./routes/recruiter/jobRoutes.js";
import recruiterApplicantRoutes from "./routes/recruiter/applicantRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

if (!port) {
  throw new Error("PORT is not defined");
}

app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/candidate/onboarding", onboardingRoutes);
app.use("/api/v1/candidate/profile", profileRoutes);
app.use("/api/v1/candidate/experiences", experienceRoutes);
app.use("/api/v1/candidate/educations", educationRoutes);
app.use("/api/v1/candidate/resume", resumeRoutes);
app.use("/api/v1/candidate/skills", skillRoutes);
app.use("/api/v1/candidate/certifications", certificationRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/recruiter", recruiterCompanyRoutes);
app.use("/api/v1/recruiter/jobs", recruiterJobRoutes);
app.use("/api/v1/recruiter/applicants", recruiterApplicantRoutes);






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
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`Access from: http://localhost:${port}`);
});
