import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Reading seed JSON files...");
  
  const dataDir = path.join(process.cwd(), 'prisma', 'data');
  const usersData = JSON.parse(fs.readFileSync(path.join(dataDir, 'users.json'), 'utf-8'));
  const companiesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'companies.json'), 'utf-8'));
  const jobsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'jobs.json'), 'utf-8'));
  const skillsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'skills.json'), 'utf-8'));

  const categories = [
    { name: 'Administration', title: 'administration' },
    { name: 'Backend Developer', title: 'backend_dev' },
    { name: 'Cloud & DevOps', title: 'cloud_devops' },
    { name: 'Customer Service', title: 'customer_service' },
    { name: 'Data Analyst & BI', title: 'data_analyst_bi' },
    { name: 'Data Science & AI', title: 'data_science_ai' },
    { name: 'UI/UX Design', title: 'design_uiux' },
    { name: 'Digital Marketing', title: 'digital_marketing' },
    { name: 'Finance & Accounting', title: 'finance_accounting' },
    { name: 'Frontend Developer', title: 'frontend_dev' },
    { name: 'HR & Recruitment', title: 'hr_recruitment' },
    { name: 'Internship', title: 'internship' },
    { name: 'Management', title: 'management' },
    { name: 'Mobile Developer', title: 'mobile_dev' },
    { name: 'Network Security', title: 'network_security' },
    { name: 'Procurement', title: 'procurement' },
    { name: 'Sales', title: 'sales' },
    { name: 'Software Developer', title: 'software_dev' },
    { name: 'Technical Support', title: 'technical_support' }
  ];

  console.log("Start seeding job categories...");
  const categoryMap = {};
  for (const cat of categories) {
    const created = await prisma.jobCategory.upsert({
      where: { title: cat.title },
      update: {},
      create: cat
    });
    categoryMap[cat.name] = created.id;
  }

  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash("password123", 10);
  
  console.log("Start seeding users...");
  const createdUsers = [];
  for (const uData of usersData) {
    const user = await prisma.user.upsert({
      where: { email: uData.email },
      update: {},
      create: {
        email: uData.email,
        password: hashedPassword,
        role: uData.role,
        isVerified: true,
        userDetails: {
          create: {
            firstName: uData.firstName,
            lastName: uData.lastName
          }
        }
      }
    });
    createdUsers.push(user);
    
  }

  const recruiters = createdUsers.filter(u => u.role === 'RECRUITER');

  console.log("Start seeding companies...");
  const createdCompanies = [];
  for (let i = 0; i < companiesData.length; i++) {
    const cData = companiesData[i];
    const recruiter = recruiters[i % recruiters.length]; // Round robin assign recruiters to companies
    
    const company = await prisma.companies.upsert({
      where: { userId: recruiter.id },
      update: {},
      create: {
        userId: recruiter.id,
        ...cData
      }
    });
    createdCompanies.push(company);
  }

  console.log("Start seeding jobs (150+ jobs)...");
  
  console.log("Start seeding master skills from skills.json...");
  const skillMap = {};
  for (const sName of skillsData) {
    let skill = await prisma.skills.findFirst({ where: { name: { equals: sName, mode: 'insensitive' } } });
    if (!skill) {
      skill = await prisma.skills.create({ data: { name: sName } });
    }
    skillMap[sName] = skill.id;
  }

  // Clear existing jobs to ensure clean slate (Optional depending on how migrate reset handles it, but migrate reset clears it all)
  
  for (let i = 0; i < jobsData.length; i++) {
    const jData = jobsData[i];
    const company = createdCompanies[i % createdCompanies.length];
    
    // Match category
    // Just use a random category if exact match fails
    const catKeys = Object.keys(categoryMap);
    let catId = categoryMap[jData.categoryTitle];
    if (!catId) catId = categoryMap[catKeys[Math.floor(Math.random() * catKeys.length)]];

    const d = new Date();
    d.setDate(d.getDate() + 30); // deadline 30 days from now

    await prisma.jobs.create({
      data: {
        companyId: company.id,
        title: jData.title,
        description: jData.description,
        employmentType: jData.employmentType,
        locationType: jData.locationType,
        location: jData.location,
        salaryMin: jData.salaryMin,
        salaryMax: jData.salaryMax,
        currency: jData.currency,
        experienceLevel: jData.experienceLevel,
        educationLevel: jData.educationLevel,
        isActive: jData.isActive,
        categoryId: catId,
        deadLine: d,
        requirements: {
          create: jData.requirements.map(r => ({ item: r }))
        },
        responsibilities: {
          create: jData.responsibilities.map(r => ({ item: r }))
        },
        benefits: {
          create: jData.benefits.map(b => ({ item: b }))
        },
        jobSkills: {
          create: jData.skills.map(sName => ({
            skillId: skillMap[sName]
          }))
        }
      }
    });

    if ((i + 1) % 25 === 0) {
      console.log(`Seeded ${i + 1} jobs...`);
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
  });
