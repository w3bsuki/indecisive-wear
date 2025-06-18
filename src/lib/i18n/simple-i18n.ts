/**
 * Simple i18n implementation without external dependencies
 * Supports Bulgarian and English
 */

export type Locale = 'bg' | 'en' | 'es' | 'fr' | 'de' | 'it'

// Get current locale from Next.js router
export function getCurrentLocaleFromRouter(): Locale {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/en')) return 'en'
    if (path.startsWith('/bg')) return 'bg'
    if (path.startsWith('/es')) return 'es'
    if (path.startsWith('/fr')) return 'fr'
    if (path.startsWith('/de')) return 'de'
    if (path.startsWith('/it')) return 'it'
  }
  return 'bg'
}

export const translations = {
  bg: {
    // Navigation
    shop: 'МАГАЗИН',
    home: 'НАЧАЛО',
    about: 'ЗА НАС',
    contact: 'КОНТАКТ',
    new: 'НОВО',
    hot: 'ГОРЕЩО',
    sale: 'РАЗПРОДАЖБА',
    
    // Hero Section
    'hero.title': 'За тези, които променят мнението си',
    'hero.subtitle': 'Индивидуални шапки за индивидуални хора',
    'hero.shopNow': 'Пазарувай сега',
    'hero.joinWaitlist': 'Присъедини се',
    'hero.comingSoon': 'Скоро',
    'hero.previewCollections': 'Прегледай колекциите',
    'hero.shopCollection': 'Виж колекцията',
    'hero.launchingIn': 'Стартираме след:',
    
    // Waitlist Dialog
    'waitlist.title': 'Получи ексклузивен достъп',
    'waitlist.description': 'Присъедини се към нашия списък за ранен достъп, специални оферти и новини за стартирането.',
    'waitlist.emailPlaceholder': 'Твоя имейл адрес',
    'waitlist.joinButton': 'Присъедини се',
    'waitlist.joinLater': 'Ще се присъединя по-късно',
    'waitlist.thankYou': 'Благодарим, че се присъедини!',
    
    // Collections
    'collections.summer.name': 'Лятна колекция',
    'collections.summer.desc': 'Смели и ярки дизайни за най-горещите дни',
    'collections.essentials.name': 'Основни',
    'collections.essentials.desc': 'Вечни стилове за всекидневно носене',
    'collections.limited.name': 'Лимитирана серия',
    'collections.limited.desc': 'Ексклузивни дизайни, които няма да намериш другаде',
    
    // Coming Soon Section
    'comingSoon.badge': 'Скоро',
    'comingSoon.title': 'Какво следва',
    'comingSoon.description': 'Изработваме първокласни изделия за всеки нерешителен момент. Бъдете първите, които ще знаят кога излизат.',
    'comingSoon.expectedPrice': 'Очаквана цена',
    'comingSoon.notifyMe': 'Уведоми ме',
    'comingSoon.notifyAlert': 'Ще бъдете уведомени когато {{category}} са налични! 💜',
    
    // Coming Soon Products
    'products.indecisiveCap.title': 'Нерешителна шапка',
    'products.indecisiveCap.desc': 'Първокласна шапка с бродерия за красиво нерешителните',
    'products.indecisiveTee.title': 'Нерешителна тениска',
    'products.indecisiveTee.desc': 'Мека памучна тениска с деликатно поставено лого',
    'products.indecisiveBag.title': 'Нерешителна чанта',
    'products.indecisiveBag.desc': 'Минималистична чанта за ежедневните ви принадлежности',
    'products.indecisiveKicks.title': 'Нерешителни маратонки',
    'products.indecisiveKicks.desc': 'Удобни маратонки от първокласни материали',
    'products.indecisiveAccessories.title': 'Нерешителни аксесоари',
    'products.indecisiveAccessories.desc': 'Внимателно подбрани аксесоари за нерешителната душа',
    
    // Social Media Section
    'social.title': 'СОЦИАЛНИ МРЕЖИ',
    'social.viewAllPosts': 'Вижте всички {{platform}} публикации',
    'social.tagPrompt': 'Маркирайте с <strong>#indecisive_wear</strong> за да бъдете представени! ❤️',
    
    // Waitlist Dialog (Full Component)
    'waitlist.exclusiveAccess': 'Ексклузивен достъп',
    'waitlist.brandTitle': 'Indecisive Wear',
    'waitlist.ctaTitle': 'Бъдете първите, които ще пазарувате нашата първокласна колекция',
    'waitlist.name': 'Име',
    'waitlist.namePlaceholder': 'Вашето име',
    'waitlist.email': 'Имейл',
    'waitlist.emailFormat': 'ваш@имейл.com',
    'waitlist.agreeToUpdates': 'Искам да получавам новини за нови продукти и ексклузивни оферти',
    'waitlist.joiningClub': 'Присъединяване към клуба...',
    'waitlist.joinTheClub': 'Присъедини се към клуба',
    'waitlist.noSpam': 'Без спам, само ексклузивни новини. Отписване по всяко време.',
    'waitlist.successTitle': 'Вие сте в списъка! 🎉',
    'waitlist.successMessage': 'Благодарим, че се присъединихте към семейството на нерешителните! Ще ви уведомим веднага щом ексклузивната ни колекция бъде пусната.',
    'waitlist.earlyAccess': 'Ранен достъп до нови продукти',
    'waitlist.memberDiscounts': 'Ексклузивни отстъпки за членове',
    'waitlist.limitedPreviews': 'Прегледи на лимитирани издания',
    'waitlist.followUs': 'Последвайте ни:',
    'waitlist.errors.fillFields': 'Моля, попълнете всички полета',
    'waitlist.errors.validEmail': 'Моля, въведете валиден имейл адрес',
    'waitlist.errors.general': 'Нещо се обърка. Моля, опитайте отново.',
    
    // Footer Translations
    'footer.joinClub': 'Присъединете се към <strong>Нерешителния</strong> клуб',
    'footer.subscribeDesc': 'Абонирайте се за ексклузивни оферти, актуализации на стила и ранен достъп до нови колекции.',
    'footer.emailPlaceholder': 'Въведете вашия имейл',
    'footer.company': 'Компания',
    'footer.aboutUs': 'За нас',
    'footer.contact': 'Контакт',
    'footer.blog': 'Блог',
    'footer.careers': 'Кариери',
    'footer.support': 'Поддръжка',
    'footer.helpCenter': 'Център за помощ',
    'footer.orderStatus': 'Статус на поръчката',
    'footer.returns': 'Връщания и замени',
    'footer.sizeGuide': 'Ръководство за размери',
    'footer.legal': 'Правни условия',
    'footer.privacy': 'Политика за поверителност',
    'footer.terms': 'Условия за ползване',
    'footer.cookies': 'Политика за бисквитки',
    'footer.accessibility': 'Достъпност',
    'footer.contactUs': 'Свържете се с нас',
    'footer.address': '123 Модна улица, Град на стила, 12345',
    'footer.email': 'hello@indecisivewear.com',
    'footer.phone': '(123) 456-7890',
    'footer.copyright': '© {{year}} Indecisive Wear. Всички права запазени.',
    'footer.craftedWith': 'Създадено с ❤️ за хронично нерешителните любители на модата.',
    'footer.perfectPlace': 'Не можете да се решите? Перфектно. Вие сте на правилното място! 😊',
    
    // Shop Page Translations
    'shop.new': 'НОВО',
    'shop.bestseller': 'БЕСТСЕЛЪР',
    'shop.sale': 'РАЗПРОДАЖБА',
    'shop.outOfStock': 'Няма наличност',
    'shop.freeShipping': 'Безплатна доставка',
    'shop.inStock': 'В наличност',
    'shop.readyToShip': 'Готов за изпращане',
    'shop.addToCart': 'Добави в количката',
    'shop.quickView': 'Бърз преглед',
    'product.comingSoon': 'Очаквайте скоро',
    'shop.freeShippingTrust': 'Безплатна доставка',
    'shop.returnsPolicy': '30-дневни връщания',
    'shop.save': 'Спести {{amount}} лв',
    
    // Banner
    'banner.title': 'Открий своя стил',
    'banner.description': 'Колекция от уникални шапки, създадени за хора с характер',
    'banner.trustSignals.freeShipping': 'Безплатна доставка над 50 лв',
    'banner.trustSignals.returns': '30-дневна гаранция',
    'banner.trustSignals.reviews': '4.9/5 от 1000+ отзива',
    
    // Common navigation
    'common:navigation.searchPlaceholder': 'Търси шапки...',
    
    // Filters & Sorting
    'filters.title': 'Филтри',
    'sorting.featured': 'Препоръчани',
    'sorting.newest': 'Най-нови',
    'sorting.priceAsc': 'Цена: Ниска към висока',
    'sorting.priceDesc': 'Цена: Висока към ниска',
    'sorting.name': 'По име',
    
    // Results
    'results.found': 'Намерени {{count}} продукта',
    'results.noResults': 'Няма намерени продукти',
    'results.noResultsDesc': 'Опитайте с други ключови думи или премахнете филтрите',
    'results.clearFilters': 'Изчисти филтрите',
    
    // Product
    'product.add-to-cart': 'Добави в количката',
    'product.out-of-stock': 'Няма наличност',
    'product.new': 'НОВО',
    'product.bestseller': 'БЕСТСЕЛЪР',
    'product.price': '{{price}} лв',
    
    // Cart
    'cart.title': 'Количка',
    'cart.empty': 'Количката е празна',
    'cart.total': 'Общо: {{total}} лв',
    'cart.checkout': 'Поръчай',
    'cart.continue-shopping': 'Продължи пазаруването',
    'cart.remove': 'Премахни',
    'cart.quantity': 'Количество',
    
    // Footer
    'footer.newsletter': 'Абонирай се за новини',
    'footer.email-placeholder': 'Твоят имейл...',
    'footer.subscribe': 'Абонирай се',
    'footer.follow': 'Последвай ни',
    
    // Common
    'common.loading': 'Зарежда...',
    'common.error': 'Възникна грешка',
    'common.retry': 'Опитай отново',
    'common.close': 'Затвори',
    'common.submit': 'Изпрати',
    'common.cancel': 'Отказ',
  },
  en: {
    // Navigation
    shop: 'SHOP',
    home: 'HOME',
    about: 'ABOUT',
    contact: 'CONTACT',
    new: 'NEW',
    hot: 'HOT',
    sale: 'SALE',
    
    // Hero Section  
    'hero.title': 'For Those Who Change Their Mind',
    'hero.subtitle': 'Individual hats for individual people',
    'hero.shopNow': 'Shop Now',
    'hero.joinWaitlist': 'Join Waitlist',
    'hero.comingSoon': 'Coming Soon',
    'hero.previewCollections': 'Preview Collections',
    'hero.shopCollection': 'Shop Collection',
    'hero.launchingIn': 'Launching in:',
    
    // Waitlist Dialog
    'waitlist.title': 'Get Exclusive Access',
    'waitlist.description': 'Join our waitlist for early access, special offers and updates about our launch.',
    'waitlist.emailPlaceholder': 'Your email address',
    'waitlist.joinButton': 'Join Waitlist',
    'waitlist.joinLater': "I'll join later",
    'waitlist.thankYou': 'Thanks for joining!',
    
    // Collections
    'collections.summer.name': 'Summer Collection',
    'collections.summer.desc': 'Bold and vibrant designs for the hottest days',
    'collections.essentials.name': 'Essentials',
    'collections.essentials.desc': 'Timeless styles for everyday wear',
    'collections.limited.name': 'Limited Edition',
    'collections.limited.desc': 'Exclusive designs you won\'t find anywhere else',
    
    // Coming Soon Section
    'comingSoon.badge': 'Coming Soon',
    'comingSoon.title': 'What\'s Next',
    'comingSoon.description': 'We\'re crafting premium pieces for every indecisive moment. Be the first to know when they drop.',
    'comingSoon.expectedPrice': 'Expected price',
    'comingSoon.notifyMe': 'Notify Me',
    'comingSoon.notifyAlert': 'You\'ll be notified when {{category}} are available! 💜',
    
    // Coming Soon Products
    'products.indecisiveCap.title': 'Indecisive Cap',
    'products.indecisiveCap.desc': 'Premium embroidered cap for the beautifully indecisive',
    'products.indecisiveTee.title': 'Indecisive Tee',
    'products.indecisiveTee.desc': 'Soft cotton tee with subtle logo placement',
    'products.indecisiveBag.title': 'Indecisive Bag',
    'products.indecisiveBag.desc': 'Minimalist tote bag for your everyday essentials',
    'products.indecisiveKicks.title': 'Indecisive Kicks',
    'products.indecisiveKicks.desc': 'Comfortable sneakers with premium materials',
    'products.indecisiveAccessories.title': 'Indecisive Accessories',
    'products.indecisiveAccessories.desc': 'Carefully curated accessories for the indecisive soul',
    
    // Social Media Section
    'social.title': 'SOCIAL FEED',
    'social.viewAllPosts': 'View All {{platform}} Posts',
    'social.tagPrompt': 'Tag <strong>#indecisive_wear</strong> to be featured! ❤️',
    
    // Waitlist Dialog (Full Component)
    'waitlist.exclusiveAccess': 'Exclusive Access',
    'waitlist.brandTitle': 'Indecisive Wear',
    'waitlist.ctaTitle': 'Be the first to shop our premium collection',
    'waitlist.name': 'Name',
    'waitlist.namePlaceholder': 'Your name',
    'waitlist.email': 'Email',
    'waitlist.emailFormat': 'your@email.com',
    'waitlist.agreeToUpdates': 'I\'d like to receive updates about new products and exclusive offers',
    'waitlist.joiningClub': 'Joining the club...',
    'waitlist.joinTheClub': 'Join the Club',
    'waitlist.noSpam': 'No spam, just exclusive updates. Unsubscribe anytime.',
    'waitlist.successTitle': 'You\'re on the list! 🎉',
    'waitlist.successMessage': 'Thanks for joining the indecisive family! We\'ll notify you as soon as our exclusive collection drops.',
    'waitlist.earlyAccess': 'Early access to new drops',
    'waitlist.memberDiscounts': 'Exclusive member discounts',
    'waitlist.limitedPreviews': 'Limited edition previews',
    'waitlist.followUs': 'Follow us:',
    'waitlist.errors.fillFields': 'Please fill in all fields',
    'waitlist.errors.validEmail': 'Please enter a valid email address',
    'waitlist.errors.general': 'Something went wrong. Please try again.',
    
    // Footer Translations
    'footer.joinClub': 'Join the <strong>Indecisive</strong> Club',
    'footer.subscribeDesc': 'Subscribe for exclusive offers, style updates, and early access to new collections.',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.support': 'Support',
    'footer.helpCenter': 'Help Center',
    'footer.orderStatus': 'Order Status',
    'footer.returns': 'Returns & Exchanges',
    'footer.sizeGuide': 'Size Guide',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.accessibility': 'Accessibility',
    'footer.contactUs': 'Contact Us',
    'footer.address': '123 Fashion Street, Style City, 12345',
    'footer.email': 'hello@indecisivewear.com',
    'footer.phone': '(123) 456-7890',
    'footer.copyright': '© {{year}} Indecisive Wear. All rights reserved.',
    'footer.craftedWith': 'Crafted with ❤️ for the chronically indecisive fashion lovers.',
    'footer.perfectPlace': 'Can\'t decide? Perfect. You\'re in the right place! 😊',
    
    // Shop Page Translations
    'shop.new': 'NEW',
    'shop.bestseller': 'BESTSELLER',
    'shop.sale': 'SALE',
    'shop.outOfStock': 'Out of Stock',
    'shop.freeShipping': 'Free Shipping',
    'shop.inStock': 'In Stock',
    'shop.readyToShip': 'Ready to ship',
    'shop.addToCart': 'Add to Cart',
    'shop.quickView': 'Quick View',
    'product.comingSoon': 'Coming Soon',
    'shop.freeShippingTrust': 'Free shipping',
    'shop.returnsPolicy': '30-day returns',
    'shop.save': 'Save ${{amount}}',
    
    // Banner
    'banner.title': 'Discover Your Style',
    'banner.description': 'Unique hat collection created for people with character',
    'banner.trustSignals.freeShipping': 'Free shipping over $25',
    'banner.trustSignals.returns': '30-day guarantee',
    'banner.trustSignals.reviews': '4.9/5 from 1000+ reviews',
    
    // Common navigation
    'common:navigation.searchPlaceholder': 'Search hats...',
    
    // Filters & Sorting
    'filters.title': 'Filters',
    'sorting.featured': 'Featured',
    'sorting.newest': 'Newest',
    'sorting.priceAsc': 'Price: Low to High',
    'sorting.priceDesc': 'Price: High to Low',
    'sorting.name': 'Name',
    
    // Results
    'results.found': 'Found {{count}} products',
    'results.noResults': 'No products found',
    'results.noResultsDesc': 'Try different keywords or remove filters',
    'results.clearFilters': 'Clear filters',
    
    // Product
    'product.add-to-cart': 'Add to Cart',
    'product.out-of-stock': 'Out of Stock',
    'product.new': 'NEW',
    'product.bestseller': 'BESTSELLER',
    'product.price': '${{price}}',
    
    // Cart
    'cart.title': 'Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total: ${{total}}',
    'cart.checkout': 'Checkout',
    'cart.continue-shopping': 'Continue Shopping',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',
    
    // Footer
    'footer.newsletter': 'Subscribe to Newsletter',
    'footer.email-placeholder': 'Your email...',
    'footer.subscribe': 'Subscribe',
    'footer.follow': 'Follow Us',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Try Again',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
  }
}

// Simple translation function
export function t(key: string, params?: Record<string, string | number>, locale: Locale = 'bg'): string {
  const translation = translations[locale][key as keyof typeof translations['bg']] || key
  
  if (!params) return translation
  
  // Simple parameter substitution
  return translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
    return params[paramKey]?.toString() || match
  })
}

// Currency formatting
export function formatPrice(price: number, locale: Locale = 'bg'): string {
  if (locale === 'bg') {
    return `${price} лв`
  }
  return `£${price}`
}

// Simple locale management
export function getCurrentLocale(): Locale {
  // Unified locale detection strategy:
  // 1. URL path (highest priority for SEO and sharing)
  // 2. Saved user preference 
  // 3. Browser language detection
  // 4. Default to Bulgarian (main market)
  
  // 1. Check URL path first
  const routerLocale = getCurrentLocaleFromRouter()
  if (routerLocale) return routerLocale
  
  if (typeof window !== 'undefined') {
    // 2. Check saved preference
    const saved = localStorage.getItem('indecisive-locale') as Locale
    if (saved && ['bg', 'en', 'es', 'fr', 'de', 'it'].includes(saved)) {
      return saved
    }
    
    // 3. Auto-detect from browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('bg')) return 'bg'
    if (browserLang.startsWith('en')) return 'en'
    if (browserLang.startsWith('es')) return 'es'
    if (browserLang.startsWith('fr')) return 'fr'
    if (browserLang.startsWith('de')) return 'de'
    if (browserLang.startsWith('it')) return 'it'
  }
  
  return 'bg' // Default to Bulgarian (main market)
}

export function setLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('indecisive-locale', locale)
    window.dispatchEvent(new CustomEvent('localeChange', { detail: locale }))
  }
}