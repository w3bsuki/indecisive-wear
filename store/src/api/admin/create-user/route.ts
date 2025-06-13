import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createAdminUser } from "@medusajs/medusa/core-flows"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // SECURITY: Remove this endpoint after creating your admin user!
  const { email, password, first_name, last_name } = req.body

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ 
      error: "Email and password are required" 
    })
  }

  try {
    const { user } = await createAdminUser({
      email,
      password,
      first_name: first_name || "Admin",
      last_name: last_name || "User",
    })

    return res.json({
      success: true,
      message: "Admin user created successfully",
      user: {
        id: user.id,
        email: user.email,
      }
    })
  } catch (error) {
    return res.status(500).json({ 
      error: "Failed to create admin user",
      details: error.message 
    })
  }
}