import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new NextResponse('Error occured', {
      status: 400
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, created_at } = evt.data

    // Create customer in Medusa
    try {
      const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000'
      
      // TODO: Once Medusa is properly connected, uncomment this
      // const response = await fetch(`${medusaUrl}/store/customers`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: email_addresses[0]?.email_address,
      //     first_name: first_name || '',
      //     last_name: last_name || '',
      //     metadata: {
      //       clerk_id: id,
      //       created_at: created_at,
      //     }
      //   }),
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to create customer in Medusa')
      // }

      console.log('User created in Clerk:', {
        id,
        email: email_addresses[0]?.email_address,
        name: `${first_name} ${last_name}`,
      })
    } catch (error) {
      console.error('Error creating customer in Medusa:', error)
      // Don't fail the webhook, just log the error
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data

    // Update customer in Medusa
    try {
      const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000'
      
      // TODO: Once Medusa is properly connected, uncomment this
      // First, find the customer by clerk_id in metadata
      // const searchResponse = await fetch(`${medusaUrl}/store/customers?metadata[clerk_id]=${id}`)
      // const customers = await searchResponse.json()
      
      // if (customers.customers?.length > 0) {
      //   const customerId = customers.customers[0].id
        
      //   const response = await fetch(`${medusaUrl}/store/customers/${customerId}`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       email: email_addresses[0]?.email_address,
      //       first_name: first_name || '',
      //       last_name: last_name || '',
      //     }),
      //   })

      //   if (!response.ok) {
      //     throw new Error('Failed to update customer in Medusa')
      //   }
      // }

      console.log('User updated in Clerk:', {
        id,
        email: email_addresses[0]?.email_address,
        name: `${first_name} ${last_name}`,
      })
    } catch (error) {
      console.error('Error updating customer in Medusa:', error)
      // Don't fail the webhook, just log the error
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    // Soft delete or deactivate customer in Medusa
    try {
      // TODO: Implement customer deactivation once Medusa is connected
      console.log('User deleted in Clerk:', { id })
    } catch (error) {
      console.error('Error handling user deletion:', error)
    }
  }

  return new NextResponse('', { status: 200 })
}