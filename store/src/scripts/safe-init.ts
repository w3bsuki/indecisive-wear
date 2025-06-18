import { ExecArgs } from "@medusajs/framework/types";

export default async function safeInit({ container }: ExecArgs) {
  const logger = container.resolve("logger");
  const database = container.resolve("__pg_connection__");
  
  try {
    logger.info("Checking database initialization...");
    
    // Check if key tables exist
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
    `;
    
    const result = await database.raw(tablesQuery);
    const tables = result.rows.map((row: any) => row.table_name);
    
    logger.info(`Found ${tables.length} tables in database`);
    
    // Check for essential tables
    const essentialTables = ['store', 'user', 'product', 'sales_channel'];
    const missingTables = essentialTables.filter(table => !tables.includes(table));
    
    if (missingTables.length > 0) {
      logger.warn(`Missing essential tables: ${missingTables.join(', ')}`);
      logger.info("Running migrations...");
      
      // Run migrations programmatically
      const { execSync } = require('child_process');
      try {
        execSync('npx medusa db:migrate', { stdio: 'inherit' });
        logger.info("Migrations completed successfully");
      } catch (error) {
        logger.error("Migration failed:", error);
      }
    } else {
      logger.info("All essential tables exist");
    }
    
  } catch (error) {
    logger.error("Error during safe initialization:", error);
  }
}