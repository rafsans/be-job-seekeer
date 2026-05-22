import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const skills = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Node.js",
  "React",
  "Angular",
  "Vue.js",
  "Next.js",
  "Express.js",
  "NestJS",
  "Django",
  "Flask",
  "Laravel",
  "Spring Boot",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "SASS",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "Prisma ORM",
  "Mongoose",
  "Docker",
  "Kubernetes",
  "AWS",
  "Google Cloud Platform (GCP)",
  "Microsoft Azure",
  "CI/CD",
  "Git",
  "GitHub",
  "GitLab",
  "RESTful APIs",
  "GraphQL",
  "gRPC",
  "Unit Testing",
  "Integration Testing",
  "Jest",
  "Mocha",
  "Cypress",
  "Agile / Scrum",
  "Jira",
  "UI/UX Design",
  "Figma"
];

async function main() {
  console.log("Start seeding master skills...");
  
  for (const skillName of skills) {
    const existing = await prisma.skills.findFirst({
      where: {
        name: {
          equals: skillName,
          mode: "insensitive"
        }
      }
    });

    if (!existing) {
      const created = await prisma.skills.create({
        data: {
          name: skillName
        }
      });
      console.log(`Seeded skill: ${created.name}`);
    } else {
      console.log(`Skill already exists: ${existing.name}`);
    }
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
