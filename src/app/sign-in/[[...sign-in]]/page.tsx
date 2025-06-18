import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-cal text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Indecisive Wear account
          </p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none",
              formButtonPrimary: 
                "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-lg",
              formFieldInput: 
                "border-gray-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg",
              footerActionLink: 
                "text-pink-600 hover:text-pink-700 font-medium",
              identityPreviewText: "text-gray-700",
              identityPreviewEditButton: "text-pink-600 hover:text-pink-700",
              formFieldLabel: "text-gray-700 font-medium",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: 
                "border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500",
              formFieldInputShowPasswordButton: "text-gray-500 hover:text-gray-700",
              otpCodeFieldInput: "border-gray-200 focus:border-pink-500 focus:ring-pink-500",
              formResendCodeLink: "text-pink-600 hover:text-pink-700",
            },
            layout: {
              socialButtonsVariant: "blockButton",
              showOptionalFields: false,
            },
          }}
          signUpUrl="/sign-up"
          forceRedirectUrl="/shop"
          path="/sign-in"
          routing="path"
        />
      </div>
    </div>
  )
}