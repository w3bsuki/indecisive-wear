import { Metadata } from "next"
import { ShopPageSimple } from "@/components/features/shop/ShopPageSimple"

export const metadata: Metadata = {
  title: "Shop - Indecisive Wear",
  description: "Browse our collection of premium streetwear hats and accessories. Express your indecisive style with confidence.",
  keywords: ["streetwear", "hats", "caps", "fashion", "accessories", "indecisive wear"],
}

export default function Shop() {
  return <ShopPageSimple />
}