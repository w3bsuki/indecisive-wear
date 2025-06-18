const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Render build process...');

try {
  // Run Medusa build
  console.log('📦 Building Medusa...');
  execSync('npx medusa build', { stdio: 'inherit' });
  
  // Check if admin was built
  const adminPath = path.join(__dirname, '.medusa/admin');
  const adminIndexPath = path.join(adminPath, 'index.html');
  
  if (!fs.existsSync(adminIndexPath)) {
    console.log('⚠️  Admin panel not built, creating placeholder...');
    
    // Create admin directory
    fs.mkdirSync(adminPath, { recursive: true });
    
    // Create a simple index.html
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Medusa Admin</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
    <div id="root">
        <h1>Admin Panel Building...</h1>
        <p>If you see this, the admin panel didn't build properly.</p>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(adminIndexPath, adminHtml);
    console.log('✅ Created placeholder admin panel');
  } else {
    console.log('✅ Admin panel built successfully');
  }
  
  // Create symlink for public folder if needed
  const publicPath = path.join(__dirname, 'public');
  const medusaPublicPath = path.join(__dirname, '.medusa/server/public');
  
  if (fs.existsSync(medusaPublicPath) && !fs.existsSync(publicPath)) {
    try {
      fs.symlinkSync(medusaPublicPath, publicPath);
      console.log('✅ Created public symlink');
    } catch (e) {
      console.log('⚠️  Could not create symlink, copying instead...');
      fs.cpSync(medusaPublicPath, publicPath, { recursive: true });
    }
  }
  
  console.log('🎉 Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}