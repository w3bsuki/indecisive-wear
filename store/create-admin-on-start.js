const { execSync } = require('child_process');

async function createAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    console.log('⚠️  ADMIN_EMAIL and ADMIN_PASSWORD not set, skipping admin creation');
    return;
  }
  
  try {
    console.log('👤 Creating admin user...');
    execSync(`npx medusa user -e ${adminEmail} -p ${adminPassword}`, { 
      stdio: 'inherit',
      timeout: 30000 
    });
    console.log('✅ Admin user created successfully');
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('✅ Admin user already exists');
    } else {
      console.log('⚠️  Could not create admin user:', error.message);
    }
  }
}

createAdminUser();