export type Language = 'en' | 'ar' | 'fr' | 'zh';

export type TranslationDictionary = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: TranslationDictionary = {
  en: {
    // Navbar
    navHome: "Home",
    navProducts: "Products",
    navProfile: "Company Profile",
    navContact: "Contact",
    
    // Product Detail
    unitPrice: "Unit Price",
    minimumOrder: "Minimum Order",
    quickSpecs: "Quick Specs",
    viewAllSpecs: "View all specifications ↓",
    initiateOrder: "Initiate Order",
    b2bPricing: "Direct B2B Pricing • Secure Escrow",
    productSpecs: "Product Specifications",
    productSpecsSub: "Comprehensive technical details and features.",
    gallery: "Gallery",
    showcase: "Showcase",
    
    // Global
    language: "EN",
  },
  ar: {
    // Navbar
    navHome: "الرئيسية",
    navProducts: "المنتجات",
    navProfile: "ملف الشركة",
    navContact: "اتصل بنا",
    
    // Product Detail
    unitPrice: "سعر الوحدة",
    minimumOrder: "الحد الأدنى للطلب",
    quickSpecs: "مواصفات سريعة",
    viewAllSpecs: "عرض كل المواصفات ↓",
    initiateOrder: "بدء الطلب",
    b2bPricing: "تسعير B2B مباشر • ضمان آمن",
    productSpecs: "مواصفات المنتج",
    productSpecsSub: "التفاصيل والميزات التقنية الشاملة.",
    gallery: "المعرض",
    showcase: "العرض",
    
    // Global
    language: "AR",
  },
  fr: {
    // Navbar
    navHome: "Accueil",
    navProducts: "Produits",
    navProfile: "Profil de l'entreprise",
    navContact: "Contact",
    
    // Product Detail
    unitPrice: "Prix Unitaire",
    minimumOrder: "Commande Minimale",
    quickSpecs: "Spécifications Rapides",
    viewAllSpecs: "Voir toutes les spécifications ↓",
    initiateOrder: "Initier la Commande",
    b2bPricing: "Prix B2B Direct • Sécurisé",
    productSpecs: "Spécifications du Produit",
    productSpecsSub: "Détails techniques et caractéristiques complètes.",
    gallery: "Galerie",
    showcase: "Vitrine",
    
    // Global
    language: "FR",
  },
  zh: {
    // Navbar
    navHome: "首页",
    navProducts: "产品",
    navProfile: "公司简介",
    navContact: "联系我们",
    
    // Product Detail
    unitPrice: "单价",
    minimumOrder: "最小起订量",
    quickSpecs: "快速规格",
    viewAllSpecs: "查看所有规格 ↓",
    initiateOrder: "发起订单",
    b2bPricing: "直接 B2B 定价 • 安全担保",
    productSpecs: "产品规格",
    productSpecsSub: "全面的技术细节和功能。",
    gallery: "图库",
    showcase: "展示",
    
    // Global
    language: "ZH",
  }
};
