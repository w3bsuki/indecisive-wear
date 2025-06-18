import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function createAdminUser({ container }: ExecArgs) {
  const userModuleService = container.resolve(Modules.USER);
  const authModuleService = container.resolve(Modules.AUTH);

  const email = process.env.ADMIN_EMAIL || "admin@indecisive-wear.com";
  const password = process.env.ADMIN_PASSWORD || "supersecret123";

  // Check if admin already exists
  const existingUsers = await userModuleService.listUsers({
    email,
  });

  if (existingUsers.length > 0) {
    console.log(`Admin user ${email} already exists`);
    return;
  }

  // Create admin user
  const user = await userModuleService.createUsers({
    email,
    first_name: "Admin",
    last_name: "User",
  });

  // Create auth identity
  await authModuleService.createAuthIdentities({
    provider_identities: [
      {
        entity_id: user.id,
        provider: "emailpass",
        provider_metadata: {
          email,
          password,
        }
      }
    ]
  });

  console.log(`Admin user created successfully!`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`\nYou can now log in to the admin panel.`);
}