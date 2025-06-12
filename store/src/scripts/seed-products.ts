/**
 * Seed script for Indecisive Wear products
 * This will populate the production database with actual hat products
 */

// Hat products data (converted from frontend constants)
const hatProducts = [
  {
    title: "Indecisive №1",
    description: "Indecisive Club. За тези, които променят мнението си постоянно.",
    handle: "indecisive-1",
    status: "published",
    images: ["/products/the indecisive club - red.jpg"],
    options: [
      { title: "Size", values: ["One Size"] },
      { title: "Color", values: ["Red"] }
    ],
    variants: [
      {
        title: "Indecisive №1 - Red",
        prices: [
          { amount: 1700, currency_code: "bgn" }, // 17 лв in stotinki
          { amount: 1700, currency_code: "usd" }  // $17 in cents
        ],
        options: [
          { option: "Size", value: "One Size" },
          { option: "Color", value: "Red" }
        ],
        manage_inventory: true,
        inventory_quantity: 100
      }
    ],
    tags: ["new"],
    categories: ["Hats"]
  },
  {
    title: "Indecisive №2",
    description: "Indecisive Club. Черният цвят е винаги елегантен избор.",
    handle: "indecisive-2",
    status: "published",
    images: ["/products/the indecisive club black.jpg"],
    options: [
      { title: "Size", values: ["One Size"] },
      { title: "Color", values: ["Black"] }
    ],
    variants: [
      {
        title: "Indecisive №2 - Black",
        prices: [
          { amount: 1700, currency_code: "bgn" },
          { amount: 1700, currency_code: "usd" }
        ],
        options: [
          { option: "Size", value: "One Size" },
          { option: "Color", value: "Black" }
        ],
        manage_inventory: true,
        inventory_quantity: 100
      }
    ],
    tags: [],
    categories: ["Hats"]
  },
  {
    title: "Indecisive №3",
    description: "Indecisive Club. За любителите на минималистичния стил.",
    handle: "indecisive-3",
    status: "published",
    images: ["/products/the indecisive club - white.jpg"],
    options: [
      { title: "Size", values: ["One Size"] },
      { title: "Color", values: ["White"] }
    ],
    variants: [
      {
        title: "Indecisive №3 - White",
        prices: [
          { amount: 1700, currency_code: "bgn" },
          { amount: 1700, currency_code: "usd" }
        ],
        options: [
          { option: "Size", value: "One Size" },
          { option: "Color", value: "White" }
        ],
        manage_inventory: true,
        inventory_quantity: 100
      }
    ],
    tags: [],
    categories: ["Hats"]
  },
  {
    title: "Indecisive №4",
    description: "Indecisive Club. Спокойният син цвят за всеки ден.",
    handle: "indecisive-4",
    status: "published",
    images: ["/products/the indecisive club blue.jpg"],
    options: [
      { title: "Size", values: ["One Size"] },
      { title: "Color", values: ["Blue"] }
    ],
    variants: [
      {
        title: "Indecisive №4 - Blue",
        prices: [
          { amount: 1700, currency_code: "bgn" },
          { amount: 1700, currency_code: "usd" }
        ],
        options: [
          { option: "Size", value: "One Size" },
          { option: "Color", value: "Blue" }
        ],
        manage_inventory: true,
        inventory_quantity: 100
      }
    ],
    tags: ["new"],
    categories: ["Hats"]
  },
  {
    title: "No Money №1",
    description: "No Money No Honey. Истината, казана с чувство за хумор.",
    handle: "no-money-1",
    status: "published",
    images: ["/products/No Money No honey white.jpg"],
    options: [
      { title: "Size", values: ["One Size"] },
      { title: "Color", values: ["White"] }
    ],
    variants: [
      {
        title: "No Money №1 - White",
        prices: [
          { amount: 1700, currency_code: "bgn" },
          { amount: 1700, currency_code: "usd" }
        ],
        options: [
          { option: "Size", value: "One Size" },
          { option: "Color", value: "White" }
        ],
        manage_inventory: true,
        inventory_quantity: 100
      }
    ],
    tags: ["bestseller"],
    categories: ["Hats"]
  },
  {
    title: "MAMA №1",
    description: "Не просто дума, а суперсила. Символ на безусловна любов.",
    handle: "mama-1",
    status: "published",
    images: ["/products/MAMA-red.jpg"],
    options: [
      { title: "Size", values: ["One Size"] },
      { title: "Color", values: ["Red"] }
    ],
    variants: [
      {
        title: "MAMA №1 - Red",
        prices: [
          { amount: 1700, currency_code: "bgn" },
          { amount: 1700, currency_code: "usd" }
        ],
        options: [
          { option: "Size", value: "One Size" },
          { option: "Color", value: "Red" }
        ],
        manage_inventory: true,
        inventory_quantity: 100
      }
    ],
    tags: [],
    categories: ["Hats"]
  },
  {
    title: "Daddy Chill",
    description: "Daddy Chill. За моментите, когато просто искаш да се отпуснеш.",
    handle: "daddy-chill",
    status: "published",
    images: ["/products/Daddy Chill.jpg"],
    options: [
      { title: "Size", values: ["One Size"] },
      { title: "Color", values: ["Black"] }
    ],
    variants: [
      {
        title: "Daddy Chill - Black",
        prices: [
          { amount: 1700, currency_code: "bgn" },
          { amount: 1700, currency_code: "usd" }
        ],
        options: [
          { option: "Size", value: "One Size" },
          { option: "Color", value: "Black" }
        ],
        manage_inventory: true,
        inventory_quantity: 100
      }
    ],
    tags: [],
    categories: ["Hats"]
  }
]

export default hatProducts