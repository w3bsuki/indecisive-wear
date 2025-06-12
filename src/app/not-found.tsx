import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-pink-50/30">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-black/90 sm:text-5xl">404</h1>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-black/80">Page not found</h2>
        <p className="mb-8 text-lg text-black/60">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link href="/" className="inline-block">
          <Button
            className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/90"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  )
} 