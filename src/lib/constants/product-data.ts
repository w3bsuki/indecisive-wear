export interface Product {
  id: number;
  name: string;
  slogan: string;
  price: string;
  image: string;
  color: string;
  category: "hats" | "t-shirts" | "accessories";
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Hat Products
const hatProducts: Product[] = [
  {
    id: 1,
    name: "Indecisive №1",
    slogan: "Indecisive Club. За тези, които променят мнението си постоянно.",
    price: "17 лв",
    image: "/products/the indecisive club - red.jpg",
    color: "Red",
    category: "hats",
    isNew: true,
  },
  {
    id: 2,
    name: "Indecisive №2",
    slogan: "Indecisive Club. За тези, които не могат да изберат.",
    price: "17 лв",
    image: "/products/the indecisive club purple - black font.jpg",
    color: "Purple",
    category: "hats",
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Indecisive №3",
    slogan: "Indecisive Club. За моментите с безброй възможности.",
    price: "17 лв",
    image: "/products/the indecisive club - purple.jpg",
    color: "Purple",
    category: "hats",
  },
  {
    id: 4,
    name: "Nothing To Wear",
    slogan: "Когато 100 дрехи не са достатъчни за сутрешния избор.",
    price: "17 лв",
    image: "/products/nothing to wear.jpg",
    color: "Blue",
    category: "hats",
    isNew: true,
  },
  {
    id: 5,
    name: "No Money №1",
    slogan: "No Money No Honey. Истината, казана с чувство за хумор.",
    price: "17 лв",
    image: "/products/No Money No honey white.jpg",
    color: "White",
    category: "hats",
    isBestSeller: true,
  },
  {
    id: 6,
    name: "No Money №2",
    slogan: "No Money No Honey. Кратко и ясно, без излишни обяснения.",
    price: "17 лв",
    image: "/products/No money No Honey.jpg",
    color: "Black",
    category: "hats",
  },
  {
    id: 7,
    name: "MAMA №1",
    slogan: "Не просто дума, а суперсила. Символ на безусловна любов.",
    price: "17 лв",
    image: "/products/MAMA-red.jpg",
    color: "Red",
    category: "hats",
  },
  {
    id: 8,
    name: "MAMA №2",
    slogan: "За жената, която превръща обикновеното в незабравимо.",
    price: "17 лв",
    image: "/products/MAMA-orange.jpg",
    color: "Orange",
    category: "hats",
  },
  {
    id: 9,
    name: "MAMA №3",
    slogan: "За силната жена, създаваща безценни моменти всеки ден.",
    price: "17 лв",
    image: "/products/MAMA-black.jpg",
    color: "Black",
    category: "hats",
  },
  {
    id: 10,
    name: "Leave Me Alone",
    slogan: "Когато кафето не помага и ти трябва лично пространство.",
    price: "17 лв",
    image: "/products/Leave me alone.jpg",
    color: "Black",
    category: "hats",
    isNew: true,
  },
  {
    id: 11,
    name: "It Is What It Is",
    slogan: "Когато приемаш живота такъв, какъвто е. Без обяснения.",
    price: "17 лв",
    image: "/products/It is what it is.jpg",
    color: "Pink",
    category: "hats",
  },
  {
    id: 12,
    name: "Хулиганка №1",
    slogan: "За момичета извън рамките, следващи своя собствен път.",
    price: "17 лв",
    image: "/products/Хулиганка.jpg",
    color: "White",
    category: "hats",
    isBestSeller: true,
  },
  {
    id: 13,
    name: "Хулиганка №2",
    slogan: "Бунт с усмивка. Нарушаване на правилата с чар и стил.",
    price: "17 лв",
    image: "/products/Хулиганка-black.jpg",
    color: "Black",
    category: "hats",
  },
  {
    id: 14,
    name: "Хулиганка №3",
    slogan: "Невинен поглед, бунтарски вайб. Силен характер и мека душа.",
    price: "17 лв",
    image: "/products/Хулиганка- green.jpg",
    color: "Green",
    category: "hats",
  },
  {
    id: 15,
    name: "Do Not Disturb",
    slogan: "Когато музиката е на пауза и ти трябва време само за себе си.",
    price: "17 лв",
    image: "/products/do not disturb.jpg",
    color: "White",
    category: "hats",
  },
  {
    id: 16,
    name: "Dirty Cash",
    slogan: "Пари със стил (и малко драма). Знаеш как да получиш каквото искаш.",
    price: "17 лв",
    image: "/products/Dirty Cash.jpg",
    color: "Pink",
    category: "hats",
    isNew: true,
  },
  {
    id: 17,
    name: "Daddy Chill",
    slogan: "Перфектният отговор на всяка драма. Запази спокойствие.",
    price: "17 лв",
    image: "/products/Daddy Chill.jpg",
    color: "Black",
    category: "hats",
  },
  {
    id: 18,
    name: "Daddy Issues",
    slogan: "Малко хаос, много чар. Честно признание с щипка самоирония.",
    price: "17 лв",
    image: "/products/Daddy Issues.jpg",
    color: "Black",
    category: "hats",
  },
  {
    id: 19,
    name: "Caffeinated",
    slogan: "Caffeinated & Complicated. Комбинация от кофеин и характер.",
    price: "17 лв",
    image: "/products/Caffeinated and Complicated.jpg",
    color: "Pink",
    category: "hats",
    isNew: true,
  },
];

// T-Shirt Products (coming soon)
const tshirtProducts: Product[] = [
  {
    id: 101,
    name: "Indecisive T-Shirt",
    slogan: "Комфорт и стил за ежедневие. Premium качество памук.",
    price: "25 лв",
    image: "",
    color: "Purple",
    category: "t-shirts",
    isNew: true,
  },
  {
    id: 102,
    name: "MAMA T-Shirt",
    slogan: "Силата на майчинството в стилен дизайн.",
    price: "25 лв",
    image: "",
    color: "Red",
    category: "t-shirts",
    isBestSeller: true,
  },
  {
    id: 103,
    name: "Caffeinated Tee",
    slogan: "За всички, които се движат на кофеин и мечти.",
    price: "25 лв",
    image: "",
    color: "Pink",
    category: "t-shirts",
  },
  {
    id: 104,
    name: "Nothing To Wear Tee",
    slogan: "Ирониятакъв, който всеки разбира.",
    price: "25 лв",
    image: "",
    color: "Blue",
    category: "t-shirts",
    isNew: true,
  },
  {
    id: 105,
    name: "Daddy Chill Tee",
    slogan: "Спокойствие в стилен дизайн.",
    price: "25 лв",
    image: "",
    color: "Black",
    category: "t-shirts",
  },
  {
    id: 106,
    name: "Хулиганка Tee",
    slogan: "Бунтарски дух в комфортен материал.",
    price: "25 лв",
    image: "",
    color: "Green",
    category: "t-shirts",
    isBestSeller: true,
  },
];

// Accessories Products (coming soon)
const accessoryProducts: Product[] = [
  {
    id: 201,
    name: "Indecisive Stickers Pack",
    slogan: "Набор от стикери за личност с отношение.",
    price: "8 лв",
    image: "",
    color: "Multi",
    category: "accessories",
    isNew: true,
  },
  {
    id: 202,
    name: "MAMA Tote Bag",
    slogan: "Практична чанта за истинските super мами.",
    price: "15 лв",
    image: "",
    color: "Red",
    category: "accessories",
    isBestSeller: true,
  },
  {
    id: 203,
    name: "Indecisive Phone Case",
    slogan: "Защити телефона си със стил и характер.",
    price: "12 лв",
    image: "",
    color: "Black",
    category: "accessories",
  },
  {
    id: 204,
    name: "Coffee Addict Mug",
    slogan: "За тези, които живеят на кафе и амбиции.",
    price: "18 лв",
    image: "",
    color: "Pink",
    category: "accessories",
    isNew: true,
  },
  {
    id: 205,
    name: "Attitude Pin Set",
    slogan: "Малки детайли, голямо въздействие.",
    price: "10 лв",
    image: "",
    color: "Multi",
    category: "accessories",
  },
  {
    id: 206,
    name: "Indecisive Keychain",
    slogan: "Носи отношението си навсякъде.",
    price: "6 лв",
    image: "",
    color: "Blue",
    category: "accessories",
  },
];

// Combined products array
export const products: Product[] = [
  ...hatProducts,
  ...tshirtProducts,
  ...accessoryProducts,
];

// Category-specific exports
export const hatsList = hatProducts;
export const tshirtsList = tshirtProducts;
export const accessoriesList = accessoryProducts;

// Helper function to get products by category
export const getProductsByCategory = (category: Product["category"]) => {
  return products.filter(product => product.category === category);
}; 