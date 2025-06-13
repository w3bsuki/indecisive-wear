import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      })
    }

    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
    
    // Check if user already exists
    const { data: existingUsers } = await query.graph({
      entity: "user",
      filters: { email },
      fields: ["id", "email"]
    })

    if (existingUsers?.length > 0) {
      return res.status(400).json({
        error: "User already exists"
      })
    }

    // Create the admin user using raw query
    const userModule = req.scope.resolve("@medusajs/user")
    const user = await userModule.createUsers({
      email,
      password,
      first_name: "Admin",
      last_name: "User",
    })

    return res.json({
      success: true,
      message: "Admin created successfully! You can now login at /app",
      user: { 
        id: user.id, 
        email: user.email 
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create admin",
      message: error.message
    })
  }
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  return res.json({
    message: "POST to this endpoint with { email, password } to create admin user",
    warning: "DELETE THIS ENDPOINT AFTER CREATING YOUR ADMIN!"
  })
}