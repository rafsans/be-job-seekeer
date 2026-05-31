import fs from 'fs';
import path from 'path';

// Helper for random choice
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickMultiple = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- DUMMY DATA POOLS ---
const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Budi', 'Siti', 'Agus', 'Dewi', 'Eko'];
const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Santoso', 'Wijaya', 'Kusuma', 'Putra', 'Setiawan'];

const companiesData = [
  { name: 'Tech Innovators', ind: 'Technology', city: 'Jakarta' },
  { name: 'Creative Designs', ind: 'Design', city: 'Bandung' },
  { name: 'Global Finance', ind: 'Finance', city: 'Surabaya' },
  { name: 'Health First', ind: 'Healthcare', city: 'Yogyakarta' },
  { name: 'EduSmart', ind: 'Education', city: 'Semarang' },
  { name: 'Green Energy Corp', ind: 'Energy', city: 'Medan' },
  { name: 'Urban Logistics', ind: 'Logistics', city: 'Makassar' },
  { name: 'NextGen Retail', ind: 'Retail', city: 'Denpasar' },
  { name: 'Foodie Delivery', ind: 'Food & Beverage', city: 'Jakarta' },
  { name: 'Safe Network', ind: 'Cybersecurity', city: 'Bandung' }
];

const jobTitles = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer',
  'Data Scientist', 'Data Analyst', 'UI/UX Designer', 'Product Manager',
  'Marketing Specialist', 'Sales Executive', 'HR Specialist', 'Customer Support',
  'DevOps Engineer', 'Cloud Architect', 'Quality Assurance', 'Systems Administrator'
];

const jobCategories = [
  'Software Developer', 'Frontend Developer', 'Backend Developer', 'Data Science & AI',
  'Data Analyst & BI', 'UI/UX Design', 'Management', 'Digital Marketing',
  'Sales', 'HR & Recruitment', 'Customer Service', 'Cloud & DevOps'
];

const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Remote', 'Semarang', 'Medan', 'Makassar', 'Denpasar'];
const employmentTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'];
const locationTypes = ['ONSITE', 'REMOTE', 'HYBRID'];
const expLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead / Manager'];
const eduLevels = ['High School', 'Associate Degree', 'Bachelor Degree', 'Master Degree'];

const requirementsPool = [
  'Minimum 2 years of relevant experience.',
  'Strong problem-solving skills.',
  'Excellent written and verbal communication.',
  'Ability to work independently and as part of a team.',
  'Familiarity with Agile development methodologies.',
  'Knowledge of clean code principles.',
  'Experience with version control systems (e.g., Git).',
  'Degree in Computer Science or related field.',
  'Proven track record of delivering projects on time.',
  'Strong attention to detail.'
];

const responsibilitiesPool = [
  'Develop and maintain high-quality software applications.',
  'Collaborate with cross-functional teams to define and design new features.',
  'Troubleshoot, test and maintain the core product software.',
  'Ensure the performance, quality, and responsiveness of applications.',
  'Identify and correct bottlenecks and fix bugs.',
  'Help maintain code quality, organization, and automatization.',
  'Participate in code reviews to maintain high-quality code standards.',
  'Write clean, readable, and testable code.',
  'Contribute to all phases of the development lifecycle.',
  'Provide technical leadership and mentorship to junior developers.'
];

const benefitsPool = [
  'Competitive salary and performance bonuses.',
  'Comprehensive health, dental, and vision insurance.',
  'Flexible working hours and remote work options.',
  'Generous paid time off and public holidays.',
  'Professional development and learning budget.',
  'Free gym membership and wellness programs.',
  'Modern office environment with free snacks and beverages.',
  'Team building events and annual company retreats.',
  'Employee stock ownership plan.',
  'Maternity and paternity leave.'
];

const skillsPool = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Docker', 'AWS', 'Figma', 'Marketing', 'Sales', 'Communication', 'Java', 'C++', 'Go', 'PHP'];

// --- GENERATORS ---

const generateUsers = () => {
  const users = [];
  // 5 Recruiters
  for (let i = 1; i <= 5; i++) {
    users.push({
      email: `recruiter${i}@example.com`,
      role: 'RECRUITER',
      firstName: pick(firstNames),
      lastName: pick(lastNames)
    });
  }
  // 5 Seekers
  for (let i = 1; i <= 5; i++) {
    users.push({
      email: `seeker${i}@example.com`,
      role: 'CANDIDATE',
      firstName: pick(firstNames),
      lastName: pick(lastNames)
    });
  }
  return users;
};

const generateCompanies = () => {
  return companiesData.map((c, i) => ({
    name: c.name,
    description: `Leading company in ${c.ind} industry.`,
    industry: c.ind,
    email: `contact@${c.name.replace(/\s+/g, '').toLowerCase()}.com`,
    phone: '1234567890',
    address: '123 Main Street',
    city: c.city,
    province: 'Province',
    country: 'Indonesia',
    companySize: '100-500',
    isVerified: true
  }));
};

const generateJobs = (num) => {
  const jobs = [];
  for (let i = 1; i <= num; i++) {
    const minSal = randomInt(5000000, 10000000);
    const maxSal = minSal + randomInt(2000000, 10000000);
    
    jobs.push({
      title: pick(jobTitles),
      description: 'We are looking for a dedicated professional to join our team and contribute to our exciting projects. If you are passionate about what you do, we want to hear from you.',
      employmentType: pick(employmentTypes),
      locationType: pick(locationTypes),
      location: pick(locations),
      salaryMin: minSal,
      salaryMax: maxSal,
      currency: 'IDR',
      experienceLevel: pick(expLevels),
      educationLevel: pick(eduLevels),
      isActive: true,
      categoryTitle: pick(jobCategories), // Will map to category in seed.js
      requirements: pickMultiple(requirementsPool, randomInt(3, 6)),
      responsibilities: pickMultiple(responsibilitiesPool, randomInt(3, 6)),
      benefits: pickMultiple(benefitsPool, randomInt(3, 6)),
      skills: pickMultiple(skillsPool, randomInt(2, 5))
    });
  }
  return jobs;
};

// --- RUN ---
const dir = path.join(process.cwd(), 'prisma', 'data');

const run = () => {
  fs.writeFileSync(path.join(dir, 'skills.json'), JSON.stringify(skillsPool, null, 2));
  fs.writeFileSync(path.join(dir, 'users.json'), JSON.stringify(generateUsers(), null, 2));
  fs.writeFileSync(path.join(dir, 'companies.json'), JSON.stringify(generateCompanies(), null, 2));
  fs.writeFileSync(path.join(dir, 'jobs.json'), JSON.stringify(generateJobs(150), null, 2));
  
  console.log('JSON Seed data generated successfully in prisma/data/');
};

run();
