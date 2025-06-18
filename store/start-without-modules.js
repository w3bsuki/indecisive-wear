process.env.MEDUSA_DISABLE_MODULES = "tax,payment,fulfillment,stock-location,inventory";
process.env.SKIP_MIGRATIONS = "false";

console.log("Starting Medusa without problematic modules...");
require("@medusajs/medusa/dist/commands/start").default();