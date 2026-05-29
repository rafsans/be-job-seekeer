import prisma from './src/config/db.ts';

async function main() {
  const categories = [
    { name: 'Frontend Developer', title: 'frontend_dev' },
    { name: 'Backend Developer', title: 'backend_dev' },
    { name: 'Fullstack Developer', title: 'fullstack_dev' },
    { name: 'UI/UX Designer', title: 'ui_ux_designer' },
    { name: 'Project Manager', title: 'project_manager' }
  ];

  for (const cat of categories) {
    await prisma.jobCategory.upsert({
      where: { title: cat.title },
      update: {},
      create: cat,
    });
  }
  console.log('Categories seeded');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
