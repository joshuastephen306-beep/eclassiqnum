/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Globe, DollarSign, Wallet, ShieldAlert, BadgeCheck, HelpCircle, 
  Layers, RefreshCw, Smartphone, Clock, Ban, LogOut, ArrowRight,
  UserPlus, LogIn, Users, PlusCircle, ToggleLeft, ToggleRight, 
  Settings, Award, TrendingUp, Search, ShieldCheck, Copy, Check, MessageSquare
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'ha', name: 'Hausa' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'ig', name: 'Igbo' },
  { code: 'sw', name: 'Swahili' }
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    heroTitle: "Premium Instant Virtual Numbers for Verifications",
    heroSub: "Get globally accessible numbers to bypass SMS OTP codes instantly. Fully secured, private, and cheap.",
    serverGuide: "Which Server To Use?",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    welcomeBack: "Welcome back",
    balance: "Wallet Balance",
    buyNo: "Buy Virtual Number",
    activeOrders: "Active Numbers & REAL-TIME SMS",
    referralProgram: "Affiliate & Earnings Program",
    adminCap: "Admin Control Suite",
    country: "Country",
    service: "Service",
    server: "Server Selection",
    price: "Price",
    noActive: "No active virtual numbers purchased yet. Choose a country and service above to purchase!",
    cancelOrder: "Cancel Order",
    getCodeAgain: "Get Another Code",
    waitingSms: "Waiting for SMS OTP...",
    smsReceived: "SMS Received!",
    expired: "Expired & Auto-refunded",
    cancelled: "Order Cancelled",
    copied: "Copied!",
    depositTitle: "Fund Wallet Instantly",
    bankTransfer: "Naira Bank Transfer",
    cryptoWay: "Pay with Crypto",
    paystackWay: "Pay with Flutterwave (Card / Bank)",
    enterAmount: "Enter Deposit Amount",
    applyCoupon: "Promo Coupon Code",
    submitDeposit: "Fund Wallet",
    referralLink: "Your Affiliate Link"
  },
  fr: {
    heroTitle: "Numéros Virtuels Privés Instantanés",
    heroSub: "Obtenez des numéros mondiaux pour contourner les codes OTP SMS. Sécurisé, privé et abordable.",
    serverGuide: "Quel serveur utiliser ?",
    goodMorning: "Bon matin",
    goodAfternoon: "Bon après-midi",
    goodEvening: "Bonsoir",
    welcomeBack: "Ravi de vous revoir",
    balance: "Balance Portefeuille",
    buyNo: "Acheter un numéro",
    activeOrders: "Numéros actifs et SMS en temps réel",
    referralProgram: "Programme d'affiliation",
    adminCap: "Administration eclassiqnum",
    country: "Pays",
    service: "Service",
    server: "Choix du Serveur",
    price: "Prix",
    noActive: "Aucun numéro actif. Choisissez un pays et un service ci-dessus pour acheter !",
    cancelOrder: "Annuler",
    getCodeAgain: "Nouveau Code SMS",
    waitingSms: "En attente du SMS OTP...",
    smsReceived: "SMS Reçu !",
    expired: "Expiré & Remboursé",
    cancelled: "Commande Annulée",
    copied: "Copié !",
    depositTitle: "Déposer des Fonds",
    bankTransfer: "Virement Bancaire (Naira)",
    cryptoWay: "Payer par Crypto",
    paystackWay: "Payer via Flutterwave",
    enterAmount: "Entrez le montant",
    applyCoupon: "Code Promo",
    submitDeposit: "Créditer le compte",
    referralLink: "Votre lien de parrainage"
  },
  ar: {
    heroTitle: "أرقام هواتف افتراضية ممتازة لتلقي الرسائل",
    heroSub: "احصل على أرقام فريدة لتفعيل الحسابات وتخطي كود التحقق. آمن وسريع ورخيص بالكامل.",
    serverGuide: "أي سيرفر يجب استخدامه؟",
    goodMorning: "صباح الخير",
    goodAfternoon: "مساء الخير",
    goodEvening: "مساء الخير",
    welcomeBack: "مرحباً بعودتك",
    balance: "رصيد المحفظة",
    buyNo: "شراء رقم افتراضي",
    activeOrders: "الأرقام النشطة وصندوق الرسائل الواردة",
    referralProgram: "نظام التسويق بالعمولة",
    adminCap: "لوحة تحكم المسؤول",
    country: "الدولة",
    service: "الخدمة",
    server: "اختيار السيرفر",
    price: "السعر",
    noActive: "لا توجد أرقام نشطة حالياً. اختر دولة وخدمة بالمسار أعلاه للبدء!",
    cancelOrder: "إلغاء الطلب",
    getCodeAgain: "طلب كود آخر على نفس الرقم",
    waitingSms: "في انتظار الرسالة القصيرة...",
    smsReceived: "تم استقبال الرسالة!",
    expired: "منتهي الصلاحية وتم الاسترداد",
    cancelled: "تم إلغاء الطلب",
    copied: "تم النسخ!",
    depositTitle: "شحن رصيد المحفظة",
    bankTransfer: "التحويل البنكي بالنايرا",
    cryptoWay: "الدفع بالعملات الرقمية",
    paystackWay: "الدفع عبر Flutterwave",
    enterAmount: "أدخل مبلغ الشحن",
    applyCoupon: "كود خصم / ترويج",
    submitDeposit: "اشحن الآن",
    referralLink: "رابط الإحالة الخاص بك"
  },
  ha: {
    heroTitle: "Lantarki Lambobin Virtual don Tabbatarwa",
    heroSub: "Sami lambobin kasa da kasa don tsallake lambobin SMS OTP nan take. Amintacce kuma mai arha.",
    serverGuide: "Wani Server Ya Kamata Ku Yi Amfani Da Shi?",
    goodMorning: "Ina kwana",
    goodAfternoon: "Barka da rana",
    goodEvening: "Barka da yamma",
    welcomeBack: "Barka da dawowa",
    balance: "Asusun Wallet",
    buyNo: "Sami Lambar Virtual",
    activeOrders: "Lambobin da ke Aiki & SMS na Gaskiya",
    referralProgram: "Shirin Tallafawa & Samun Kudi",
    adminCap: "Gudanarwa Suite",
    country: "Kasa",
    service: "Sabis",
    server: "Zabin Server",
    price: "Farashi",
    noActive: "Babu lambobin da ke aiki yanzu. Zabi kasa da sabis a sama don siya!",
    cancelOrder: "Soke Odar",
    getCodeAgain: "Sami Wani Code",
    waitingSms: "Ana jiran SMS...",
    smsReceived: "An sami SMS!",
    expired: "Lokaci ya wuce & Mayar da kudi",
    cancelled: "An soke odar",
    copied: "An kwafi!",
    depositTitle: "Sanya kudi a Wallet",
    bankTransfer: "Tura Naira zuwa banki",
    cryptoWay: "Biya da Crypto",
    paystackWay: "Flutterwave",
    enterAmount: "Shigar da adadin",
    applyCoupon: "Lambar Coupon Code",
    submitDeposit: "Sanya Kudi",
    referralLink: "Mahaɗin referral ku"
  },
  yo: {
    heroTitle: "Premium Instant foju Awọn nọmba fun fífì",
    heroSub: "Gba awọn nọmba kariaye lati foju awọn koodu SMS OTP lesekese. Ni aabo ati jẹ olowo poku.",
    serverGuide: "Ewo Server O yẹ ki O Lo?",
    goodMorning: "E rọ̀ ó",
    goodAfternoon: "E kasan",
    goodEvening: "E kale",
    welcomeBack: "Kaabo pada",
    balance: "Wallet Balance",
    buyNo: "Ra Virtual Nọmba",
    activeOrders: "Awọn nọmba Ti nṣiṣe lọwọ & SMS",
    referralProgram: "Eto Alafaramo",
    adminCap: "Admin Iṣakoso Suite",
    country: "Orilẹ-ede",
    service: "Iṣẹ-ṣiṣe",
    server: "Yiyan Server",
    price: "Iye",
    noActive: "Ko si awọn nọmba foju to nṣiṣe lọwọ. Yan orilẹ-ede ati iṣẹ loke lati ra!",
    cancelOrder: "Fagile Ilana",
    getCodeAgain: "Gba Koodu Miiran",
    waitingSms: "Nduro fun SMS...",
    smsReceived: "SMS to de!",
    expired: "Wiwu ati Pada owo",
    cancelled: "Fagile",
    copied: "Daakọ!",
    depositTitle: "Fund Wallet",
    bankTransfer: "Gbigbe Banki Naira",
    cryptoWay: "Sanwo pẹlu Crypto",
    paystackWay: "Flutterwave",
    enterAmount: "Tẹ iye sii",
    applyCoupon: "Koodu Promo",
    submitDeposit: "Sanwo",
    referralLink: "Ọna asopọ alafaramo rẹ"
  },
  ig: {
    heroTitle: "Nọmba Virtual Instant maka Nkwenye",
    heroSub: "Nweta nọmba gburugburu ụwa maka SMS OTP dị mfe. Nchekwa, nzuzo ma dị ọnụ ala.",
    serverGuide: "Kedu Server ị ga-eji?",
    goodMorning: "Ututu ọma",
    goodAfternoon: "Ehihie ọma",
    goodEvening: "Abali ọma",
    welcomeBack: "Nnọọ ọzọ",
    balance: "Ego Wallet Gị",
    buyNo: "Zụta Virtual Nọmba",
    activeOrders: "Nọmba Na-arụ Ọrụ Ugbu A & SMS Inbox",
    referralProgram: "Usoro Affiliate & Nweta Ego",
    adminCap: "Admin Dashboard",
    country: "Obodo",
    service: "Sabis",
    server: "Nhọrọ Server",
    price: "Ego Ole",
    noActive: "Ọ dịghị nọmba na-arụ ọrụ ugbu a. Họrọ obodo na sabis n'elu ịzụta!",
    cancelOrder: "Kagbuo Order",
    getCodeAgain: "Nweta Code Ọzọ",
    waitingSms: "Na-eche SMS...",
    smsReceived: "Anatara SMS!",
    expired: "Oge agwụla & Alaghachila ego",
    cancelled: "Akagburu",
    copied: "E depụtaghachiri ya!",
    depositTitle: "Tinye Ego Na Wallet",
    bankTransfer: "Nyefe Banki Naira",
    cryptoWay: "Ego Crypto",
    paystackWay: "Flutterwave",
    enterAmount: "Tinye ego ole ị chọrọ",
    applyCoupon: "Promo Koodu",
    submitDeposit: "Kwụọ Ụgwọ",
    referralLink: "Affiliate Link Gị"
  },
  sw: {
    heroTitle: "Nambari za Mtandao za Kupokea SMS OTP",
    heroSub: "Pata nambari za kimataifa kwa ajili ya kuthibitisha akaunti. Salama kabisa, siri na kwa bei nafuu.",
    serverGuide: "Server Ipi Utumie?",
    goodMorning: "Habari za asubuhi",
    goodAfternoon: "Habari za mchana",
    goodEvening: "Habari za jioni",
    welcomeBack: "Karibu tena",
    balance: "Salio la Wallet",
    buyNo: "Nunua Nambari",
    activeOrders: "Nambari Amilifu na SMS kwa Wakati Halisi",
    referralProgram: "Mpango wa Ubia na Rufaa",
    adminCap: "Jopo la Usimamizi",
    country: "Nchi",
    service: "Huduma",
    server: "Chagua Server",
    price: "Bei",
    noActive: "Hakuna nambari inayotumika sasa. Chagua nchi na huduma hapo juu kununua!",
    cancelOrder: "Ghairi Agizo",
    getCodeAgain: "Pata SMS Nyingine",
    waitingSms: "Inasubiri SMS...",
    smsReceived: "SMS Imepokelewa!",
    expired: "Muda Umeisha & Kurudishiwa Pesa",
    cancelled: "Imeghairiwa",
    copied: "Imenakiliwa!",
    depositTitle: "Weka Pesa kwenye Wallet",
    bankTransfer: "Uhamisho wa Benki ya Nigeria",
    cryptoWay: "Lipia kwa Crypto",
    paystackWay: "Flutterwave",
    enterAmount: "Weka kiasi",
    applyCoupon: "Kuponi ya Promo",
    submitDeposit: "Lipia Sasa",
    referralLink: "Kiungo chako cha Rufaa"
  }
};

const QUOTES = [
  {
    text: "“The secret of getting ahead is getting started.”",
    author: "No be eclassiqnum talk am oo 😂, na Mark Twain talk am",
    action: "Anyways, go fund your wallet and verify your service 🚀"
  },
  {
    text: "“Do not wait for extraordinary opportunities. Seize common occasions and make them great.”",
    author: "No be eclassiqnum talk am oo 😂, na Orison Swett Marden talk am",
    action: "So go fund your wallet right away and fire up your SMS gateway 🚀"
  },
  {
    text: "“Opportunities don't happen, you create them.”",
    author: "No be eclassiqnum talk am oo 😂, na Chris Grosser talk am",
    action: "So open a line now and secure your accounts instantly 🚀"
  },
  {
    text: "“Action is the foundational key to all success.”",
    author: "No be eclassiqnum talk am oo 😂, na Pablo Picasso talk am",
    action: "Bypass any verification wall in seconds today 🚀"
  }
];

const generate1178Services = (baseServices: any[]) => {
  if (!baseServices || baseServices.length === 0) return [];
  const expanded = [...baseServices];
  const seenIds = new Set(baseServices.map(s => s.id));
  
  const keywords = [
    "Digital", "Cloud", "Secure", "Express", "Network", "Channel", "Node", "Gate", 
    "Hub", "Portal", "Verify", "Access", "Connect", "System", "Pay", "Stream",
    "Game", "Trade", "Link", "Sync", "Prime", "Pro", "Core", "Global", "Direct"
  ];
  
  const domains = [
    "Betting Account", "Gambling Portal", "Esports Gate", "Trading Platform", "Crypto Validator",
    "Social Network", "SaaS Enterprise", "Dating Account", "Gaming Lounge", "AI Assistant Engine",
    "API Developer Key", "Email Redirect Gateway", "Mobile Shopping Outlet", "Music Streamer", "Cinema VIP"
  ];
  
  let index = 0;
  while (expanded.length < 1178) {
    const kw = keywords[index % keywords.length];
    const dm = domains[Math.floor(index / keywords.length) % domains.length];
    const id = `svc_${kw.toLowerCase()}_${index}`;
    const name = `${kw} ${dm} #${expanded.length + 1}`;
    
    if (!seenIds.has(id)) {
      expanded.push({
        id,
        name,
        icon: 'Globe',
        baseMarkup: 0,
        active: true
      });
      seenIds.add(id);
    }
    index++;
  }
  
  return expanded.slice(0, 1178);
};

export default function App() {
  // Localization and Currency states
  const [lang, setLang] = useState<string>(() => {
    const saved = localStorage.getItem('eclassiqnum_lang');
    return saved || 'en';
  });
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  
  // Custom interactive & support states
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [showAllServices, setShowAllServices] = useState<boolean>(true);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Payment Issue');
  const [ticketDescription, setTicketDescription] = useState('');
  const [supportTickets, setSupportTickets] = useState<any[]>(() => {
    const saved = localStorage.getItem('eclassiqnum_support_tickets');
    return saved ? JSON.parse(saved) : [
      { id: 'TKT-8211', subject: 'Inquiry regarding API webhook deliverability delays', category: 'API Setup', status: 'resolved', date: '2026-05-27', description: 'Hello, what webhook headers are returned on number SMS arrivals?', replies: ['eclassiqnum webhook service carries X-Afrinum-Signature and the payload details directly in JSON format. Let us know if further steps are needed!'] }
    ];
  });
  
  // Popups & Helpers
  const [showServerGuide, setShowServerGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'buy' | 'rent' | 'inbox' | 'wallet' | 'affiliate' | 'admin'>('dashboard');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'res' | 'error' } | null>(null);

  // Authentication State
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('eclassiqnum_token') || null);
  const [isLogin, setIsLogin] = useState(true);
  const [authFormData, setAuthFormData] = useState({ name: '', email: '', password: '', referrer: '' });
  const [loadingAuth, setLoadingAuth] = useState(false);

  // Buy Flow Variables
  const [countries, setCountries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState<1 | 2 | 3>(1);

  // Real-time Number Orders & Active Operations
  const [activeNumberHistory, setActiveNumberHistory] = useState<any[]>([]);
  const [pollingActive, setPollingActive] = useState(false);

  // Deposit simulators state
  const [depositAmount, setDepositAmount] = useState<string>('5000');
  const [depositPromo, setDepositPromo] = useState<string>('');
  const [fundingMethod, setFundingMethod] = useState<'bank_transfer' | 'paystack' | 'crypto'>('bank_transfer');
  const [isProcessingFunding, setIsProcessingFunding] = useState(false);
  const [paystackCardState, setPaystackCardState] = useState({ number: '4000 1234 5678 9010', date: '12/28', cvc: '111' });
  const [cryptoPaidConfirm, setCryptoPaidConfirm] = useState(false);

  // Affiliate & Request Withdrawals
  const [affiliateStats, setAffiliateStats] = useState<any>(null);
  const [withdrawDetails, setWithdrawDetails] = useState({ amount: '', method: 'bank_transfer', credentials: '' });
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  // Admin Panel states
  const [adminReport, setAdminReport] = useState<any>(null);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminWithdrawals, setAdminWithdrawals] = useState<any[]>([]);
  const [adminPromos, setAdminPromos] = useState<any[]>([]);
  const [newPromoData, setNewPromoData] = useState({ code: '', discount: '10', maxUses: '25' });
  const [adminConfig, setAdminConfig] = useState<any>(null);
  const [adminCountries, setAdminCountries] = useState<any[]>([]);
  const [adminServices, setAdminServices] = useState<any[]>([]);
  const [adminNewCountry, setAdminNewCountry] = useState({ name: '', code: '', flag: '🌍', baseCostUsd: '0.30' });
  const [adminNewService, setAdminNewService] = useState({ name: '', id: '', icon: 'Globe', baseMarkup: '15' });
  const [adminCountryQuery, setAdminCountryQuery] = useState('');
  const [adminServiceQuery, setAdminServiceQuery] = useState('');
  const [manualWalletData, setManualWalletData] = useState({ targetUserId: '', amount: '', currency: 'NGN', action: 'credit', remark: 'Premium Credit' });
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [adminSearchOrder, setAdminSearchOrder] = useState('');
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  
  // Rental & Simulator Specific States
  const [selectedRentCountry, setSelectedRentCountry] = useState<any>(null);
  const [selectedRentDuration, setSelectedRentDuration] = useState<number>(7);
  const [autoRenewRent, setAutoRenewRent] = useState<boolean>(true);
  const [rentCountrySearchQuery, setRentCountrySearchQuery] = useState<string>('');
  const [isProcessingRent, setIsProcessingRent] = useState<boolean>(false);
  const [simulatedSender, setSimulatedSender] = useState<string>('WhatsApp');
  const [simulatedText, setSimulatedText] = useState<string>('eclassiqnum Simulated OTP code: Your login code is 582031.');
  const [simulatedNumberId, setSimulatedNumberId] = useState<string>('');

  // Sub tabs & Drawers mapping exactly to Screenshots
  const [buySubTab, setBuySubTab] = useState<'browse' | 'my-numbers'>('browse');
  const [rentSubTab, setRentSubTab] = useState<'browse' | 'my-rentals'>('browse');
  const [selectedProductService, setSelectedProductService] = useState<any>(null); // Opens Checkout buy modal/drawer
  const [selectedRentContractCountry, setSelectedRentContractCountry] = useState<any>(null); // Opens Checkout rent modal/drawer

  // Helpers
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  useEffect(() => {
    localStorage.setItem('eclassiqnum_lang', lang);
  }, [lang]);

  // Personalized Greeting builder matching AfriNum's layout
  const getPersonalGreeting = () => {
    if (!user) return "";
    const name = user.name;
    const hour = new Date().getUTCHours() + 1; // Approx West Africa timezone addition offset
    let timeGreeting = t.welcomeBack;
    if (hour >= 5 && hour < 12) timeGreeting = t.goodMorning;
    else if (hour >= 12 && hour < 17) timeGreeting = t.goodAfternoon;
    else timeGreeting = t.goodEvening;

    return `${timeGreeting}, ${name}! 👋`;
  };

  // Toast notifier
  const toast = (message: string, type: 'success' | 'res' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  // API Call Wrapper
  const apiCall = async (endpoint: string, method = 'GET', body: any = null) => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const opts: RequestInit = { method, headers };
      if (body) {
        opts.body = JSON.stringify(body);
      }
      const res = await fetch(endpoint, opts);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Server request error occurred');
      }
      return json;
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  };

  // Verify and load Initial Account
  useEffect(() => {
    if (token) {
      apiCall('/api/auth/me')
        .then(res => {
          setUser(res.user);
        })
        .catch(e => {
          setToken(null);
          localStorage.removeItem('eclassiqnum_token');
        });
    }
  }, [token]);

  // Load Setup Catalogs
  useEffect(() => {
    apiCall('/api/numbers/countries').then(res => {
      setCountries(res);
      if (res.length > 0) {
        setSelectedCountry(res[0]);
        setSelectedRentCountry(res[0]);
      }
    }).catch(e => console.error(e));

    apiCall('/api/numbers/services').then(res => {
      const expanded = generate1178Services(res);
      setServices(expanded);
      if (expanded.length > 0) setSelectedService(expanded[0]);
    }).catch(e => console.error(e));
  }, []);

  // Sync historical purchased numbers regularly
  const fetchActivationHistory = () => {
    if (!token) return;
    apiCall('/api/numbers/history')
      .then(res => {
        setActiveNumberHistory(res);
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    if (token) {
      fetchActivationHistory();
      const interval = setInterval(fetchActivationHistory, 4000); // Quick refresh loop for OTP instant arrival
      return () => clearInterval(interval);
    }
  }, [token]);

  // Manage dynamic stats if tab selected is Affiliate
  useEffect(() => {
    if (token && activeTab === 'affiliate') {
      apiCall('/api/affiliate/stats')
        .then(res => setAffiliateStats(res))
        .catch(e => console.error(e));
    }
  }, [token, activeTab]);

  // Manage Admin report loaders
  const loadAdminSuite = () => {
    if (!token || !user || (user.role !== 'super_admin' && user.role !== 'support_admin')) return;
    apiCall('/api/admin/dashboard').then(res => setAdminReport(res)).catch(e => console.error(e));
    apiCall('/api/admin/users').then(res => setAdminUsers(res)).catch(e => console.error(e));
    apiCall('/api/admin/promos').then(res => setAdminPromos(res)).catch(e => console.error(e));
    apiCall('/api/admin/config').then(res => setAdminConfig(res)).catch(e => console.error(e));
    apiCall('/api/admin/withdrawals').then(res => setAdminWithdrawals(res)).catch(e => console.error(e));
    apiCall('/api/admin/countries').then(res => setAdminCountries(res)).catch(e => console.error(e));
    apiCall('/api/admin/services').then(res => setAdminServices(res)).catch(e => console.error(e));
  };

  useEffect(() => {
    if (activeTab === 'admin') {
      loadAdminSuite();
    }
  }, [activeTab]);

  // Trigger popup guide on first website visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('eclassiqnum_server_popup');
    if (!hasVisited) {
      setShowServerGuide(true);
      localStorage.setItem('eclassiqnum_server_popup', 'true');
    }
  }, []);

  // Core functions
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAuth(true);
    try {
      if (isLogin) {
        const res = await apiCall('/api/auth/login', 'POST', {
          email: authFormData.email,
          password: authFormData.password
        });
        localStorage.setItem('eclassiqnum_token', res.token);
        setToken(res.token);
        setUser(res.user);
        toast(`Welcome back to eclassiqnum, ${res.user.name}!`, 'success');
      } else {
        const res = await apiCall('/api/auth/register', 'POST', {
          name: authFormData.name,
          email: authFormData.email,
          password: authFormData.password,
          referrer: authFormData.referrer
        });
        toast('Registration successful. You can log in now!', 'success');
        setIsLogin(true);
      }
    } catch (err: any) {
      toast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('eclassiqnum_token');
    toast('Logged out successfully.', 'success');
  };

  const handleToggleRoleForTesting = async () => {
    try {
      const res = await apiCall('/api/auth/toggle-role', 'POST');
      setUser(res.user);
      toast(`Account role swapped to ${res.user.role.toUpperCase()}! You can now access the Admin suite instantly.`, 'success');
      if (res.user.role === 'super_admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('buy');
      }
    } catch (e: any) {
      toast(e.message || 'Error toggling account role', 'error');
    }
  };

  const getDailyRentalPrice = (c: any) => {
    if (!c) return { ngn: 0, usd: 0 };
    let baseRate = 0.24;
    const name = c.name.toLowerCase();
    if (name.includes('usa') || name.includes('canada')) baseRate = 0.20;
    else if (name.includes('united kingdom')) baseRate = 0.25;
    else if (name.includes('france') || name.includes('germany') || name.includes('japan')) baseRate = 0.30;
    else if (name.includes('south africa') || name.includes('kenya')) baseRate = 0.22;
    
    // Check config
    const markup = adminConfig?.globalMarkupPercent || 35;
    const nairaRate = adminConfig?.nairaToDollarRate || 1550;
    
    const usd = baseRate * (1 + markup / 100);
    const ngn = usd * nairaRate;
    return { ngn: parseFloat(ngn.toFixed(2)), usd: parseFloat(usd.toFixed(2)) };
  };

  const executeNumberRental = async () => {
    if (!token || !selectedRentCountry || !selectedRentDuration) {
      toast('Please log in and choose a country for rental', 'error');
      return;
    }
    try {
      setIsProcessingRent(true);
      const pricing = getDailyRentalPrice(selectedRentCountry);
      let discount = 1.0;
      if (selectedRentDuration >= 90) discount = 0.8;
      else if (selectedRentDuration >= 30) discount = 0.9;
      else if (selectedRentDuration >= 7) discount = 0.95;

      const costUsd = pricing.usd * selectedRentDuration * discount;
      const costNgn = pricing.ngn * selectedRentDuration * discount;
      const costFinal = currency === 'NGN' ? costNgn : costUsd;

      const confirmMsg = `Rent general international number for ${selectedRentCountry.name} for ${selectedRentDuration} days? Total cost: ${currency === 'NGN' ? '₦' : '$'}${costFinal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      
      if (!window.confirm(confirmMsg)) {
        setIsProcessingRent(false);
        return;
      }

      const res = await apiCall('/api/numbers/rent', 'POST', {
        country: selectedRentCountry.name,
        durationDays: selectedRentDuration,
        currency,
        autoRenew: autoRenewRent
      });

      // Update local wallet view instantly
      setUser(res.user);
      toast(`Successfully rented: ${res.activation.number}. Your multi-service line is active!`, 'success');
      fetchActivationHistory();
      setActiveTab('inbox'); // Shift tab to OTP Inbox directly so they can inspect their live rental line!
    } catch (e: any) {
      toast(e.message || 'Rental allocation failed', 'error');
    } finally {
      setIsProcessingRent(false);
    }
  };

  const triggerManualSimulation = async (numberId: string) => {
    if (!simulatedSender.trim() || !simulatedText.trim()) {
      toast('Please provide helper parameters to simulate', 'error');
      return;
    }
    try {
      const res = await apiCall('/api/numbers/simulate-sms', 'POST', {
        numberId,
        sender: simulatedSender,
        text: simulatedText
      });
      toast(`Simulated SMS delivered successfully to ${res.activation.number}!`, 'success');
      fetchActivationHistory();
    } catch (e: any) {
      toast(e.message || 'SMS Simulation failed', 'error');
    }
  };

  const executeNumberPurchase = async () => {
    if (!token || !selectedCountry || !selectedService) {
      toast('Please log in and choose both a country and service', 'error');
      return;
    }
    try {
      // Determine final cost per switch currency state
      const cost = currency === 'NGN' ? selectedCountry.priceNgn : selectedCountry.priceUsd;
      const confirmMsg = `Buy private virtual number for ${selectedCountry.name} to receive ${selectedService.name} OTP? Cost: ${currency === 'NGN' ? '₦' : '$'}${cost.toFixed(2)}`;
      
      if (!window.confirm(confirmMsg)) return;

      const res = await apiCall('/api/numbers/purchase', 'POST', {
        country: selectedCountry.name,
        service: selectedService.name,
        currency,
        serverId: selectedServer
      });

      // Update local wallet view instantly
      setUser(res.user);
      toast(`Successfully purchased: ${res.activation.number}. Your real-time inbox is waiting!`, 'success');
      fetchActivationHistory();
    } catch (e: any) {
      toast(e.message || 'Verification acquisition error', 'error');
    }
  };

  const triggerGetCodeAgain = async (numId: string) => {
    try {
      const res = await apiCall('/api/numbers/code-again', 'POST', { numberId: numId });
      toast('Successfully requested a fresh SMS OTP code on the same number!', 'success');
      fetchActivationHistory();
    } catch (e: any) {
      toast(e.message || 'Refresh OTP failed', 'error');
    }
  };

  const triggerCancelOrder = async (numId: string) => {
    try {
      const res = await apiCall('/api/numbers/cancel', 'POST', { numberId: numId, currency });
      setUser(res.user);
      toast('Order cancelled successfully! Funds returned instantly to your wallet.', 'success');
      fetchActivationHistory();
    } catch (e: any) {
      toast(e.message || 'Could not cancel order', 'error');
    }
  };

  // Simulator funding wallet processing
  const initiateMockFunding = async () => {
    if (!token) { toast('Login required to deposit', 'error'); return; }
    const val = parseFloat(depositAmount);
    if (isNaN(val) || val <= 0) { toast('Please enter a valid amount', 'error'); return; }

    // FLUTTERWAVE — real inline popup
    if (fundingMethod === 'paystack' && user) {
      const flwPublicKey = import.meta.env.VITE_FLW_PUBLIC_KEY || '';
      if (flwPublicKey && (window as any).FlutterwaveCheckout) {
        const txRef = 'ecl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        (window as any).FlutterwaveCheckout({
          public_key: flwPublicKey,
          tx_ref: txRef,
          amount: val,
          currency: 'NGN',
          payment_options: 'card, banktransfer, ussd',
          customer: { email: user.email, name: user.name },
          customizations: { title: 'eclassiqnum Wallet', description: `Fund wallet with ₦${val.toLocaleString()}` },
          callback: async (response: any) => {
            if (response.status === 'successful' || response.status === 'completed') {
              setIsProcessingFunding(true);
              try {
                const res = await apiCall('/api/wallet/fund', 'POST', {
                  amount: val, currency: 'NGN', gateway: 'flutterwave',
                  promoCode: depositPromo, flwTransactionId: response.transaction_id
                });
                setUser(res.user);
                toast(`₦${val.toLocaleString()} added to your wallet!`, 'success');
                setDepositPromo('');
              } catch (e: any) { toast(e.message || 'Payment verification failed', 'error'); }
              finally { setIsProcessingFunding(false); }
            } else {
              toast('Payment was not completed', 'error');
            }
          },
          onclose: () => {}
        });
        return;
      }
      // Demo mode — direct credit
      setIsProcessingFunding(true);
      try {
        const res = await apiCall('/api/wallet/fund', 'POST', { amount: val, currency: 'NGN', gateway: 'flutterwave', promoCode: depositPromo });
        setUser(res.user);
        toast(`₦${val.toLocaleString()} added to your wallet!`, 'success');
        setDepositPromo('');
      } catch (e: any) { toast(e.message || 'Payment error', 'error'); }
      finally { setIsProcessingFunding(false); }
      return;
    }

    // CRYPTO — create NowPayments invoice
    if (fundingMethod === 'crypto') {
      setIsProcessingFunding(true);
      try {
        const res = await apiCall('/api/wallet/fund', 'POST', {
          amount: val, currency, gateway: 'crypto', promoCode: depositPromo
        });
        if (res.cryptoPayment) {
          // Show crypto payment details
          const p = res.cryptoPayment;
          toast(`Send ${p.payAmount} ${p.payCurrency.toUpperCase()} to the address shown. Wallet credits automatically on confirmation.`, 'success');
          setCryptoPaidConfirm(false);
        } else if (res.user) {
          setUser(res.user);
          toast(`Wallet credited!`, 'success');
        }
      } catch (e: any) { toast(e.message || 'Crypto payment error', 'error'); }
      finally { setIsProcessingFunding(false); }
      return;
    }

    // BANK TRANSFER / MANUAL — direct credit (webhook handles real funding in production)
    setIsProcessingFunding(true);
    try {
      const res = await apiCall('/api/wallet/fund', 'POST', {
        amount: val, currency, gateway: fundingMethod, promoCode: depositPromo
      });
      setUser(res.user);
      toast(`Wallet credited with ${currency === 'NGN' ? '₦' : '$'}${val.toLocaleString()}!`, 'success');
      setDepositPromo('');
      setCryptoPaidConfirm(false);
    } catch (e: any) { toast(e.message || 'Funding failed', 'error'); }
    finally { setIsProcessingFunding(false); }
  };

  // Submit dynamic Affiliate Withdraw
  const handleAffiliateWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmt = parseFloat(withdrawDetails.amount);
    if (!cleanAmt || cleanAmt <= 0) {
      toast('Validate amount error', 'error');
      return;
    }
    setLoadingWithdraw(true);
    try {
      const res = await apiCall('/api/affiliate/withdraw', 'POST', {
        amount: cleanAmt,
        currency,
        method: withdrawDetails.method,
        details: withdrawDetails.credentials
      });
      setUser(res.user);
      toast('Withdrawal request submitted successfully! Pending approval from eclassiqnum admins.', 'success');
      setWithdrawDetails({ amount: '', method: 'bank_transfer', credentials: '' });
      // Reload stats
      const rStats = await apiCall('/api/affiliate/stats');
      setAffiliateStats(rStats);
    } catch (e: any) {
      toast(e.message || 'Earning distribution failure', 'error');
    } finally {
      setLoadingWithdraw(false);
    }
  };

  // Admin adjustments
  const handleAdminWalletAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCall('/api/admin/users/wallet-adjust', 'POST', {
        targetUserId: manualWalletData.targetUserId,
        amount: parseFloat(manualWalletData.amount),
        currency: manualWalletData.currency,
        action: manualWalletData.action,
        remark: manualWalletData.remark
      });
      toast('Wallet balance adjusted successfully!', 'success');
      setManualWalletData({ targetUserId: '', amount: '', currency: 'NGN', action: 'credit', remark: 'Premium Credit' });
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Adjust failed', 'error');
    }
  };

  const toggleUserStatus = async (targetUserId: string) => {
    try {
      const res = await apiCall('/api/admin/users/toggle-status', 'POST', { targetUserId });
      toast(`User account updated to ${res.user.status}`, 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Toggle status failed', 'error');
    }
  };

  const handleAdminPromoCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCall('/api/admin/promos/create', 'POST', {
        code: newPromoData.code,
        discountPercent: parseFloat(newPromoData.discount),
        maxUses: parseInt(newPromoData.maxUses),
        expiresAt: '2027-12-31'
      });
      toast('Dynamic Promo code generated!', 'success');
      setNewPromoData({ code: '', discount: '10', maxUses: '25' });
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Promo creation error', 'error');
    }
  };

  const processAffiliateWithdrawRequest = async (withdrawalId: string, status: 'approved' | 'rejected') => {
    try {
      await apiCall('/api/admin/withdrawals/process', 'POST', { withdrawalId, status });
      toast(`Affiliate withdrawal processing action: ${status.toUpperCase()}`, 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Processing error', 'error');
    }
  };

  const toggleAdminProviderStatus = async (providerId: string, currentActive: boolean) => {
    try {
      await apiCall('/api/admin/providers/toggle', 'POST', { providerId, isActive: !currentActive });
      toast('SMS Provider state swapped!', 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast('Failed provider status operation', 'error');
    }
  };

  const handleSaveAdminConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCall('/api/admin/config/update', 'POST', adminConfig);
      toast('Configurations updated to db successfully!', 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast('Save configuration failed', 'error');
    }
  };

  const handleToggleCountryActive = async (code: string, currentActive: boolean, baseCostUsd: number) => {
    try {
      await apiCall('/api/admin/countries/update', 'POST', { code, active: !currentActive, baseCostUsd });
      toast('Country visibility toggled successfully', 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Error toggling country', 'error');
    }
  };

  const handleUpdateCountryPrice = async (code: string, active: boolean, newPrice: number) => {
    try {
      await apiCall('/api/admin/countries/update', 'POST', { code, active, baseCostUsd: newPrice });
      toast('Country base cost adjusted successfully', 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Error updating price', 'error');
    }
  };

  const handleCreateCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!adminNewCountry.name || !adminNewCountry.code || !adminNewCountry.baseCostUsd) {
        toast('Please fill out all country fields', 'error');
        return;
      }
      await apiCall('/api/admin/countries/add', 'POST', {
        name: adminNewCountry.name,
        code: adminNewCountry.code,
        flag: adminNewCountry.flag || '🌍',
        baseCostUsd: parseFloat(adminNewCountry.baseCostUsd)
      });
      toast(`Successfully registered new virtual routing node: ${adminNewCountry.name}!`, 'success');
      setAdminNewCountry({ name: '', code: '', flag: '🌍', baseCostUsd: '0.30' });
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Error creating country', 'error');
    }
  };

  const handleToggleServiceActive = async (id: string, currentActive: boolean, baseMarkup: number) => {
    try {
      await apiCall('/api/admin/services/update', 'POST', { id, active: !currentActive, baseMarkup });
      toast('Service availability toggled successfully', 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Error toggling service', 'error');
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!adminNewService.name || !adminNewService.id) {
        toast('Please fill out all service fields', 'error');
        return;
      }
      await apiCall('/api/admin/services/add', 'POST', {
        name: adminNewService.name,
        id: adminNewService.id,
        icon: adminNewService.icon || 'Globe',
        baseMarkup: parseFloat(adminNewService.baseMarkup || '15')
      });
      toast(`Successfully deployed new service channel: ${adminNewService.name}!`, 'success');
      setAdminNewService({ name: '', id: '', icon: 'Globe', baseMarkup: '15' });
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Error creating service', 'error');
    }
  };

  const handleUpdateServiceMarkup = async (id: string, active: boolean, newMarkup: number) => {
    try {
      await apiCall('/api/admin/services/update', 'POST', { id, active, baseMarkup: newMarkup });
      toast('Service base markup adjusted successfully', 'success');
      loadAdminSuite();
    } catch (e: any) {
      toast(e.message || 'Error updating service markup', 'error');
    }
  };

  // Clipboard Copiers
  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    toast(t.copied, 'success');
  };

  const handleSubmitSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      toast('Please provide a subject and details for your support ticket.', 'error');
      return;
    }
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      category: ticketCategory,
      description: ticketDescription,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      replies: []
    };
    const updated = [newTicket, ...supportTickets];
    setSupportTickets(updated);
    localStorage.setItem('eclassiqnum_support_tickets', JSON.stringify(updated));
    setTicketSubject('');
    setTicketDescription('');
    toast(`Ticket ${newTicket.id} submitted successfully! Representative will reply shortly.`, 'success');
    
    // Auto AI / Admin reply after 3.5 seconds
    setTimeout(() => {
      const autoReply = `Hello ${user ? user.name : 'Customer'}, thank you for contacting eclassiqnum Live Support. We have successfully logged ${newTicket.id} on our system. An agent has flagged this ticket (${newTicket.category}) for processing. If this relates to a NGN bank funding transaction, please stand by while we confirm the deposit ledger tracking details dynamically. Thank you!`;
      setSupportTickets(prev => prev.map(t => t.id === newTicket.id ? { ...t, status: 'resolved', replies: [autoReply] } : t));
      toast(`You received a support update for Ticket ${newTicket.id}!`, 'success');
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-gray-100 font-sans selection:bg-purple-600 selection:text-white pb-12">
      
      {/* Dynamic Toast System */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl transition-all border transform translate-y-0 ${
          notification.type === 'error' ? 'bg-red-950/90 border-red-500/50 text-red-100' : 'bg-green-950/90 border-green-500/50 text-green-100'
        }`}>
          {notification.type === 'error' ? <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" /> : <BadgeCheck className="w-5 h-5 text-green-400" />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#0E1524]/95 backdrop-blur-md border-b border-gray-850 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          
          {/* Left: Logo Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg font-extrabold text-[#E0E7FF] animate-pulse">
              ⚡
            </div>
            <div>
              <span className="text-xl font-black text-white block tracking-tight">eclassiqnum</span>
              <span className="text-[9px] text-purple-400 block tracking-widest font-mono">eclassiqnum.com</span>
            </div>
          </div>

          {/* Middle: Navigation tabs on header */}
          {user && (
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-full py-1">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'buy' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Virtual Numbers</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'rent' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Rent a Number</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('inbox')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'inbox' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>OTP Inbox</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'wallet' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Wallet</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('affiliate')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'affiliate' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Affiliate</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'faq' ? 'bg-[#1e293b] text-blue-400 border border-blue-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FAQs</span>
              </button>
              
              {(user.role === 'super_admin' || user.role === 'support_admin') && (
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === 'admin' ? 'bg-[#1e1e38] text-indigo-400 border border-indigo-500/20 shadow-md' : 'text-indigo-400/80 hover:text-indigo-300 hover:bg-indigo-950/20'}`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              )}
            </nav>
          )}

          {/* Right side controls (support modal trigger, quick balance view, user initial avatar dropdown) */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Help & Support Center Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsSupportOpen(true)}
                className="p-1.5 sm:p-2.5 rounded-xl bg-[#16223B] border border-gray-800 text-gray-400 hover:text-white hover:bg-[#1E2E4A] transition cursor-pointer flex items-center justify-center shadow-lg"
                title="Support Center"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {/* Balance Quick pill */}
              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className="flex items-center gap-1.5 bg-[#161F32] border border-gray-800 hover:border-blue-500/30 px-3 py-1.5 rounded-xl transition cursor-pointer shadow-lg font-mono font-bold text-xs"
              >
                <span className="text-gray-500 font-bold">$</span>
                <span className="text-white font-mono">
                  {currency === 'NGN' 
                    ? `₦${user.walletBalanceNgn.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}` 
                    : `$${user.walletBalanceUsd.toFixed(2)}`}
                </span>
              </button>

              {/* User Account Circle dropdown selector */}
              <div className="relative group/menu">
                <button 
                  type="button"
                  className="flex items-center gap-2 bg-[#161F32] border border-gray-800 hover:border-blue-500/30 px-2.5 py-1.5 rounded-xl transition cursor-pointer shadow-lg select-none"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs text-indigo-105">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs text-gray-200 font-bold hidden sm:inline">{user.name || 'Joshua'}</span>
                  <span className="text-gray-500 text-[10px]">&bull;&bull;&bull;</span>
                </button>

                {/* Account Actions Popover Dropdown menu of user */}
                <div className="absolute right-0 mt-2 w-48 bg-[#11192C] border border-gray-800 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-150 z-50">
                  <div className="px-4 py-2 border-b border-gray-850 pb-2 mb-1">
                    <span className="block text-[11px] font-bold text-white truncate">{user.name}</span>
                    <span className="block text-[10px] text-gray-400 truncate">{user.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dashboard')}
                    className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-gray-800/40 flex items-center gap-2 font-medium"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    Dashboard Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('wallet')}
                    className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-gray-800/40 flex items-center gap-2 font-medium"
                  >
                    <Wallet className="w-3.5 h-3.5 text-blue-400" />
                    My Wallet Card
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-red-450 hover:text-white hover:bg-red-950/20 flex items-center gap-2 font-semibold border-t border-gray-850/60 mt-2 pt-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    Sign Out Now
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Secure Access Protocol</div>
          )}

        </div>
      </header>

      {/* SECONDARY TOOLBAR BAR SLATE */}
      {user && (
        <div className="bg-[#0b0f19] border-b border-gray-850 py-3.5 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-end gap-2.5 sm:gap-3 font-sans font-medium">
            
            {/* NGN / USD currencies toggle selection buttons */}
            <div className="flex items-center gap-1 bg-[#101726] p-1 rounded-xl border border-gray-800">
              <button 
                id="currency-ngn"
                type="button"
                onClick={() => setCurrency('NGN')} 
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${currency === 'NGN' ? 'bg-purple-600 text-white shadow-inner font-extrabold' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'}`}>
                ₦ NGN
              </button>
              <button 
                id="currency-usd"
                type="button"
                onClick={() => setCurrency('USD')} 
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${currency === 'USD' ? 'bg-purple-600 text-white shadow-inner font-extrabold' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'}`}>
                $ USD
              </button>
            </div>

            {/* Language dropdown select with globe icon */}
            <div className="flex items-center gap-2 bg-[#101726] border border-gray-800 px-3.5 py-1.5 rounded-xl text-xs text-gray-300 hover:border-gray-755 transition">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <select 
                id="language-select"
                value={lang} 
                onChange={(e) => setLang(e.target.value)} 
                className="bg-transparent border-none text-xs outline-none cursor-pointer text-gray-205 font-bold focus:ring-0">
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code} className="bg-[#0E1524] text-white">
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Wallet Balance Display: ₦0.0 | $0.00 as requested on second image */}
            <div className="flex items-center gap-2.5 bg-[#101726]/80 border border-purple-500/20 px-4 py-2 rounded-xl shadow-inner shadow-purple-950/10">
              <Wallet className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-purple-300 font-extrabold uppercase tracking-wide">Wallet Balance:</span>
              <span className="text-xs font-black text-white font-mono gap-1">
                ₦{user.walletBalanceNgn.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </span>
              <span className="text-xs text-gray-650 font-mono">|</span>
              <span className="text-xs font-black text-emerald-400 font-mono">
                ${user.walletBalanceUsd.toFixed(2)}
              </span>
            </div>

          </div>
        </div>
      )}
      <header className="hidden">
        {/* Helper header placeholder */}
      </header>

      {/* THREE-SERVER SYSTEM POPUP */}
      {showServerGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#11192C] border border-purple-500/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <Layers className="text-purple-400" />
              {t.serverGuide}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              eclassiqnum processes number allocations through three separate redundant server endpoints to maximize OTP deliverability:
            </p>
            <div className="space-y-3.5">
              <div className="p-3 rounded-lg bg-[#162137] border-l-4 border-indigo-500">
                <p className="text-xs font-bold text-indigo-300">Server 1 — General Global Core</p>
                <p className="text-[11px] text-gray-400">Best for most standard fast activations. Covers 70+ global countries.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#162137] border-l-4 border-purple-500">
                <p className="text-xs font-bold text-purple-300">Server 2 — European Premium & VIP Niche</p>
                <p className="text-[11px] text-gray-400">Best for tricky setups like Fiverr, Upwork, WhatsApp, & PayPal. Lets you request unlimited codes on the same number.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#162137] border-l-4 border-emerald-500">
                <p className="text-xs font-bold text-emerald-300">Server 3 — Alternative Fallback Gate</p>
                <p className="text-[11px] text-gray-400">Alternative multi-country server path in case Core and Premium are congested.</p>
              </div>
            </div>
            <div className="mt-5 p-3 rounded-lg bg-[#1A1F2C] border border-gray-800 text-[11px] text-yellow-400 leading-snug">
              <strong>PRO TIP:</strong> If your requested OTP code does not arrive in Server 1 validation window, cancel it immediately (instant refund) and switch to Server 2 or Server 3!
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                id="close-guide-btn"
                onClick={() => setShowServerGuide(false)} 
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition duration-150">
                Understood, Let's Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CORE WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">

        {/* HERO TITLE HEADER */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/30 via-[#11192C] to-purple-950/30 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-405 leading-normal max-w-2xl">
              {t.heroSub}
            </p>
          </div>
          <button 
            id="view-system-guide"
            onClick={() => setShowServerGuide(true)} 
            className="flex items-center gap-1.5 px-4 py-2 bg-[#17223C] hover:bg-[#1E2E52] border border-gray-800 rounded-xl text-xs text-purple-300 font-semibold transition shrink-0">
            <HelpCircle className="w-4 h-4" />
            {t.serverGuide}
          </button>
        </div>

        {/* NOT LOGGED IN WRAPPER - REGISTRATION / LOGIN CONSOLE */}
        {!user ? (
          <div className="max-w-md mx-auto bg-[#101726] rounded-2xl border border-purple-500/20 shadow-2xl p-6 sm:p-8 my-10">
            
            {/* Header Dialog Tab state */}
            <div className="flex border-b border-[#1A2338] mb-6">
              <button 
                id="auth-tab-login"
                onClick={() => setIsLogin(true)} 
                className={`w-1/2 pb-3 font-bold text-sm transition ${isLogin ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                Sign In
              </button>
              <button 
                id="auth-tab-register"
                onClick={() => setIsLogin(false)} 
                className={`w-1/2 pb-3 font-bold text-sm transition ${!isLogin ? 'border-b-2 border-purple-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                Register (Affiliate eligible)
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              
              {!isLogin && (
                <div>
                  <label className="text-xs text-gray-400 block mb-1 font-medium">Your Name</label>
                  <input 
                    id="register-name"
                    type="text" 
                    placeholder="Joshua Stephen"
                    value={authFormData.name}
                    onChange={(e) => setAuthFormData({...authFormData, name: e.target.value})}
                    className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Email Address</label>
                <input 
                  id="auth-email"
                  type="email" 
                  placeholder="name@domain.com"
                  value={authFormData.email}
                  onChange={(e) => setAuthFormData({...authFormData, email: e.target.value})}
                  className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Password</label>
                <input 
                  id="auth-password"
                  type="password" 
                  placeholder="••••••••••••"
                  value={authFormData.password}
                  onChange={(e) => setAuthFormData({...authFormData, password: e.target.value})}
                  className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="text-xs text-gray-400 block mb-1 font-medium">Referrer Referral Code (Optional)</label>
                  <input 
                    id="register-referrer"
                    type="text" 
                    placeholder="e.g. JOSH306"
                    value={authFormData.referrer}
                    onChange={(e) => setAuthFormData({...authFormData, referrer: e.target.value})}
                    className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                  />
                </div>
              )}

              <button 
                id="submit-auth-btn"
                type="submit" 
                disabled={loadingAuth}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition duration-150 flex items-center justify-center gap-2">
                {loadingAuth ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {isLogin ? 'Sign Into Account' : 'Register Account'}
                  </>
                )}
              </button>

            </form>

            <div className="mt-6 p-4 rounded-xl bg-purple-950/10 border border-purple-500/10 text-center">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                <strong>Test Credentials Quick-Access:</strong><br />
                User: <code className="text-purple-300">joshuastephen306@gmail.com</code> | Pass: <code className="text-purple-300">password123</code><br/>
                Admin: <code className="text-purple-300">admin@eclassiqnum.com</code> | Pass: <code className="text-purple-300">admin123</code>
              </p>
            </div>

          </div>
        ) : (
          
          /* LOGGED IN USER CONSOLE WORKSPACE */
          <div className="space-y-6">

            {/* SECTION: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Custom Greeting and Action Header */}
                <div className="bg-gradient-to-r from-purple-900/10 via-[#101726] to-indigo-900/10 p-6 rounded-2xl border border-gray-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      Quick Shortcuts
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Instantly lease virtual mobile numbers powered by eclassiqnum core servers.
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={() => setActiveTab('buy')} 
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer">
                      + New OTP Line
                    </button>
                    <button 
                      onClick={() => setActiveTab('rent')} 
                      className="px-4 py-2 bg-indigo-600 border border-indigo-500/30 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer">
                      + Rent Long-Term Line
                    </button>
                  </div>
                </div>

                {/* Banner Promotion */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/20 flex items-center justify-between gap-3 text-xs">
                  <span className="text-emerald-300 font-medium">
                    💰 <strong>Make money with affiliate program!</strong> Earn <strong>10% lifetime commission</strong> on every single deposit made by users you refer.
                  </span>
                  <button 
                    onClick={() => setActiveTab('affiliate')} 
                    className="underline text-emerald-400 font-bold hover:text-emerald-300 transition whitespace-nowrap cursor-pointer">
                    Go Affiliate
                  </button>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/15 transition-all"></div>
                    <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Wallet Balance</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {currency === 'NGN' ? `₦${user.walletBalanceNgn.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}` : `$${user.walletBalanceUsd.toFixed(2)}`}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        {currency === 'NGN' ? `($${user.walletBalanceUsd.toFixed(2)})` : `(₦${user.walletBalanceNgn.toLocaleString('en-US', { minimumFractionDigits: 1 })})`}
                      </span>
                    </div>
                    <button 
                      onClick={() => setActiveTab('wallet')} 
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold hover:underline pt-1 cursor-pointer">
                      Fund Wallet &rarr;
                    </button>
                  </div>

                  <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl group-hover:bg-indigo-600/15 transition-all"></div>
                    <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Active OTP Numbers</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {activeNumberHistory.filter(n => !n.isRental).length}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">Multi-code delivery active</span>
                    </div>
                    <button 
                      onClick={() => setActiveTab('buy')} 
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold hover:underline pt-1 cursor-pointer">
                      Buy OTP Number &rarr;
                    </button>
                  </div>

                  <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl group-hover:bg-emerald-600/15 transition-all"></div>
                    <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Rented Numbers</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {activeNumberHistory.filter(n => n.isRental).length}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">Long-term subscription lines</span>
                    </div>
                    <button 
                      onClick={() => setActiveTab('rent')} 
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold hover:underline pt-1 cursor-pointer">
                      Rent Active Subscriptions &rarr;
                    </button>
                  </div>
                </div>

                {/* Affiliate Earnings Widget */}
                <div className="bg-gradient-to-br from-[#121124] to-[#101726] rounded-2xl border border-purple-900/45 p-6 space-y-4 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl group-hover:bg-purple-600/10 transition-all"></div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-purple-500/15 pb-4">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-bold text-purple-400 tracking-widest uppercase font-mono bg-purple-950/50 border border-purple-500/20 px-2.5 py-1 rounded-full">Partner Partnership</span>
                      <h3 className="text-base font-black text-white mt-1.5 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Affiliate Partner Program
                      </h3>
                      <p className="text-xs text-gray-400">
                        Share your unique referral link and earn a lifetime 10% commission on every fund deposit made by your referrals!
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 bg-[#15122B] p-2 rounded-xl border border-purple-500/15 w-full md:w-auto">
                      <span className="text-xs text-purple-300 font-mono truncate max-w-[200px] sm:max-w-[250px] md:max-w-[180px] pl-1">{affiliateStats?.referralLink || `https://eclassiqnum.com/join?ref=${user?.id?.substring(0, 6) || "9382"}`}</span>
                      <button 
                        onClick={() => copyText(affiliateStats?.referralLink || `https://eclassiqnum.com/join?ref=${user?.id?.substring(0, 6) || "9382"}`)}
                        className="p-1.5 px-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition whitespace-nowrap active:scale-95 cursor-pointer"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                    <div className="bg-[#0B0F19]/60 p-4 rounded-xl border border-gray-800 text-left">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Total Clients Referred</p>
                      <p className="text-xl font-black text-white mt-1">{affiliateStats?.referralsCount || 0}</p>
                    </div>
                    <div className="bg-[#0B0F19]/60 p-4 rounded-xl border border-gray-800 text-left">
                      <p className="text-xl font-black text-emerald-400 mt-1">₦{(affiliateStats?.affiliateEarningsNgn || 0).toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-0.5">Commission Vault NGN</p>
                    </div>
                    <div className="bg-[#0B0F19]/60 p-4 rounded-xl border border-gray-800 text-left">
                      <p className="text-xl font-black text-emerald-400 mt-1">${(affiliateStats?.affiliateEarningsUsd || 0).toFixed(2)}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono mt-0.5">Commission Vault USD</p>
                    </div>
                    <div className="bg-[#0B0F19]/60 p-4 rounded-xl border border-purple-550/10 flex flex-col justify-between text-left">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Status Action</p>
                      <button 
                        onClick={() => setActiveTab('affiliate')}
                        className="text-xs text-purple-400 font-bold hover:underline hover:text-purple-300 flex items-center gap-1 mt-1.5 justify-start cursor-pointer transition"
                      >
                        Withdraw Earnings &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Left ledger & Right Inbox quick previews */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Recent Transactions */}
                  <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-purple-400" />
                        WALLET ACTIVITES BRIEFING
                      </h3>
                      <button 
                        onClick={() => setActiveTab('wallet')} 
                        className="text-[10px] text-purple-400 hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>
                    {user.transactions && user.transactions.length > 0 ? (
                      <div className="space-y-3">
                        {user.transactions.slice(-3).reverse().map((tx: any) => (
                          <div key={tx.id} className="p-3 bg-[#151D30]/60 border border-gray-800/40 rounded-xl flex items-center justify-between text-xs transition duration-150 hover:bg-[#151D30]">
                            <div className="space-y-1">
                              <span className="block text-[11px] font-bold text-white capitalize">{tx.description}</span>
                              <span className="block text-[10px] font-mono text-gray-500">{new Date(tx.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
                            </div>
                            <span className={`font-mono text-xs font-bold ${tx.type === 'deposit' || tx.type === 'refund' ? 'text-emerald-400' : 'text-red-400'}`}>
                              {tx.type === 'deposit' || tx.type === 'refund' ? '+' : '-'}
                              {currency === 'NGN' ? `₦${tx.amountNgn.toLocaleString()}` : `$${tx.amountUsd.toFixed(2)}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-xs text-gray-500">No account ledger entries record found.</p>
                      </div>
                    )}
                  </div>

                  {/* Right Inbox Preview console */}
                  <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                        INCOMING OTP MONITORING
                      </h3>
                      <button 
                        onClick={() => setActiveTab('inbox')} 
                        className="text-[10px] text-purple-400 hover:underline cursor-pointer">
                        Open Inbox
                      </button>
                    </div>
                    {activeNumberHistory.length > 0 ? (
                      <div className="space-y-3">
                        {activeNumberHistory.slice(0, 3).map((num: any) => (
                          <div key={num.id} className="p-3 bg-[#151D30]/60 border border-gray-800/40 rounded-xl flex items-center justify-between text-xs transition duration-150 hover:bg-[#151D30]">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{num.number}</span>
                                <span className={`text-[9px] px-1.5 rounded uppercase font-bold font-mono ${num.isRental ? 'bg-indigo-950/80 border border-indigo-500/30 text-indigo-300' : 'bg-purple-950/80 border border-purple-500/30 text-purple-300'}`}>
                                  {num.isRental ? 'Subscription' : 'One-Time'}
                                </span>
                              </div>
                              <span className="block text-[10px] text-gray-400 mt-1">{num.country} &bull; {num.service}</span>
                            </div>
                            <div className="text-right">
                              {num.sms && num.sms.length > 0 ? (
                                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30 font-mono animate-pulse">
                                  CODE: {num.sms[num.sms.length - 1].text.match(/\d{4,6}/)?.[0] || 'READY'}
                                </span>
                              ) : (
                                <span className="text-[10px] bg-yellow-950/40 text-yellow-500 font-bold px-1.5 py-0.5 rounded border border-yellow-500/25 font-mono">
                                  {num.isRental ? 'LIVE MONITOR' : num.status.toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-xs text-gray-500 font-semibold">You don't have any active virtual lines currently.</p>
                        <button 
                          onClick={() => setActiveTab('buy')} 
                          className="mt-3.5 px-3 py-1.5 bg-[#151D30] hover:bg-[#1E2943] border border-gray-800 text-xs text-purple-400 font-bold rounded-xl transition cursor-pointer font-sans">
                          Configure a line
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* SECTION 1: BUY VIRTUAL NUMBERS */}
            {activeTab === 'buy' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Subtitle Header and Subtabs selector Bar matching AfriNum design */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-indigo-400 animate-pulse" />
                      Virtual Numbers
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Receive OTPs from any service in any country</p>
                  </div>
                  
                  {/* Selector Switches Browse vs My Numbers */}
                  <div className="flex items-center gap-1.5 bg-[#101726] p-1.5 rounded-xl border border-gray-800 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => setBuySubTab('browse')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        buySubTab === 'browse'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-650/15'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Browse
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuySubTab('my-numbers')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        buySubTab === 'my-numbers'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-650/15'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      My Numbers
                      {activeNumberHistory.length > 0 && (
                        <span className="bg-indigo-900 border border-indigo-400/25 text-indigo-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {activeNumberHistory.length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {buySubTab === 'browse' && (
                  <div className="space-y-6">
                    
                    {/* Server Routing designation & Service Search filter bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#101726]/80 p-4 rounded-xl border border-gray-800/80">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Server Path:</span>
                        <div className="flex items-center gap-1.5 bg-[#151D30] p-1 border border-gray-800 rounded-lg">
                          {[1, 2, 3].map((srv) => {
                            const selected = selectedServer === srv;
                            return (
                              <button
                                key={srv}
                                type="button"
                                onClick={() => setSelectedServer(srv as any)}
                                className={`px-3 py-1 text-xs font-black rounded-md transition ${
                                  selected 
                                    ? 'bg-emerald-600 border border-emerald-500/20 text-white shadow-md' 
                                    : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                Server {srv}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Search services input bar filter */}
                      <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3.5 top-2.5 text-gray-500 w-3.5 h-3.5" />
                        <input
                          id="search-all-services-browse"
                          type="text"
                          placeholder="Search services..."
                          value={serviceSearchQuery}
                          onChange={(e) => setServiceSearchQuery(e.target.value)}
                          className="w-full bg-[#151D2F] border border-gray-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Category: POPULAR Services list grid */}
                    {!serviceSearchQuery && (
                      <div className="space-y-3.5 pt-1 animate-in fade-in duration-200">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          ⚡ POPULAR
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { id: 'whatsapp', name: 'WhatsApp', countries: 100, price: 'from $0.34 >', icon: '💬', colorBg: 'from-emerald-950/30 to-[#101726] border-emerald-500/10 hover:border-emerald-500/30' },
                            { id: 'telegram', name: 'Telegram', countries: 158, price: 'from $0.26 >', icon: '✈️', colorBg: 'from-sky-950/30 to-[#101726] border-sky-500/10 hover:border-sky-500/30' },
                            { id: 'fiverr', name: 'Fiverr', countries: 99, price: 'from $0.12 >', icon: '🎯', colorBg: 'from-teal-950/30 to-[#101726] border-teal-500/10 hover:border-teal-500/30' }
                          ].map((popularItem) => {
                            const rawSvc = services.find(s => s.id === popularItem.id);
                            if (!rawSvc) return null;
                            return (
                              <button
                                key={popularItem.id}
                                id={`popular-${popularItem.id}`}
                                type="button"
                                onClick={() => {
                                  setSelectedService(rawSvc);
                                  setSelectedProductService(rawSvc);
                                  // Pre-fill selection index if list exists
                                  if (countries.length > 0 && !selectedCountry) {
                                    setSelectedCountry(countries[0]);
                                  }
                                }}
                                className={`p-4 bg-gradient-to-br ${popularItem.colorBg} border rounded-2xl flex items-center justify-between text-left transition transform active:scale-[0.97] duration-150 cursor-pointer shadow-lg`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-11 h-11 bg-gray-900/60 rounded-xl flex items-center justify-center text-xl shrink-0 border border-gray-800/40">
                                    {popularItem.icon}
                                  </div>
                                  <div>
                                    <span className="block font-black text-white text-xs">{popularItem.name}</span>
                                    <span className="block text-[10px] text-gray-400 mt-0.5">{popularItem.countries} countries available</span>
                                  </div>
                                </div>
                                <span className="text-[11px] font-black text-indigo-400 font-mono tracking-wide bg-indigo-950/40 border border-indigo-500/10 py-1 px-2 rounded-lg">{popularItem.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Category: ALL SERVICES list list grid matching screenshots */}
                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-center justify-between border-b border-gray-800/40 pb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            ⚡ ALL SERVICES
                          </h4>
                          <button
                            id="toggle-services-view-size"
                            type="button"
                            onClick={() => setShowAllServices(!showAllServices)}
                            className="text-[10px] bg-purple-950/60 border border-purple-500/20 text-purple-300 hover:text-white hover:bg-purple-900/40 font-bold px-2.5 py-1 rounded-lg transition cursor-pointer select-none active:scale-95 duration-100"
                          >
                            {showAllServices ? 'Show Less (15 Services) ▲' : 'Show All (1178 Services) ▼'}
                          </button>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                          {showAllServices ? `${services.length} items total` : 'Displaying 15 of 1178'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {(showAllServices 
                          ? services.filter(s => s.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()))
                          : services.filter(s => s.name.toLowerCase().includes(serviceSearchQuery.toLowerCase())).slice(0, 15)
                        ).map((svc) => {
                            // Compute representative prices starter for clean AfriNum visual match
                            const starterPriceStr = 
                              svc.id === 'discord' ? 'from $0.02 >' :
                              svc.id === 'ebay' ? 'from $0.06 >' :
                              svc.id === 'instagram' ? 'from $0.04 >' :
                              svc.id === 'kakaotalk' ? 'from $0.12 >' :
                              svc.id === 'tinder' ? 'from $0.06 >' :
                              svc.id === 'viber' ? 'from $0.02 >' :
                              svc.id === 'openai' ? 'from $0.25 >' :
                              svc.id === 'paypal' ? 'from $0.95 >' : 'from $0.10 >';

                            let emoji = '🔮';
                            if (svc.id === 'discord') emoji = '👾';
                            else if (svc.id === 'instagram') emoji = '📸';
                            else if (svc.id === 'paypal') emoji = '💳';
                            else if (svc.id === 'openai') emoji = '🤖';
                            else if (svc.id === 'tiktok') emoji = '🎵';
                            else if (svc.id === 'google') emoji = '✉️';
                            else if (svc.id === 'facebook') emoji = '👥';
                            else if (svc.id === 'twitter') emoji = '🐦';
                            else if (svc.id === 'apple') emoji = '🍏';
                            else if (svc.id === 'amazon') emoji = '🛍️';
                            else if (svc.id === 'uber') emoji = '🚗';
                            else if (svc.id === 'airbnb') emoji = '🏡';
                            else if (svc.id === 'bolt') emoji = '⚡';

                            return (
                              <button
                                key={svc.id}
                                id={`service-all-${svc.id}`}
                                type="button"
                                onClick={() => {
                                  setSelectedService(svc);
                                  setSelectedProductService(svc);
                                  if (countries.length > 0 && !selectedCountry) {
                                    setSelectedCountry(countries[0]);
                                  }
                                }}
                                className="p-3 bg-[#101726]/60 hover:bg-[#151D2F] border border-gray-800/60 hover:border-indigo-500/35 rounded-xl flex items-center justify-between text-left transition transform active:scale-95 duration-100 cursor-pointer shadow-sm"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-8 h-8 rounded-lg bg-[#141C2D] flex items-center justify-center text-base border border-gray-850 shrink-0">
                                    {emoji}
                                  </div>
                                  <div className="truncate">
                                    <span className="block font-black text-white text-xs truncate">{svc.name}</span>
                                    <span className="block text-[10px] text-gray-400 mt-0.5">158 countries available</span>
                                  </div>
                                </div>
                                <span className="text-[11px] font-bold text-indigo-400 font-mono shrink-0 bg-indigo-950/20 py-0.5 px-2 rounded-md border border-indigo-500/5">{starterPriceStr}</span>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                  </div>
                )}

                {/* Tracking pane rendered under isolated My Numbers active contracts console */}
                {buySubTab === 'my-numbers' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                    
                    {/* Live indicators monitoring list */}
                    <div className="lg:col-span-2 space-y-5">
                      <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 shadow-lg">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse block"></span>
                            ACTIVE DIGIT NODES MONITOR
                          </h3>
                          <span className="text-xs text-gray-500 font-bold">{activeNumberHistory.length} ordered line channels</span>
                        </div>

                        {activeNumberHistory.length === 0 ? (
                          <div className="text-center py-16 px-4 space-y-3.5">
                            <MessageSquare className="w-12 h-12 text-gray-700 mx-auto animate-pulse" />
                            <p className="text-xs text-gray-400 max-w-sm mx-auto">No active virtual digital conduits running. Browse a target service on the first tab and initiate a purchase node to start receiving SMS OTPs!</p>
                            <button
                              type="button"
                              onClick={() => setBuySubTab('browse')}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 mx-auto"
                            >
                              Browse Services
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {activeNumberHistory.map((act) => {
                              const isWaiting = act.status === 'waiting';
                              const isReceived = act.status === 'received';
                              const isCancelled = act.status === 'cancelled';
                              const isExpired = act.status === 'expired';

                              return (
                                <div key={act.id} className="relative p-5 rounded-2xl bg-[#141C2D] border border-gray-800 overflow-hidden shadow-md">
                                  
                                  {/* Details layout */}
                                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] bg-purple-950 text-purple-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                          {act.service}
                                        </span>
                                        <span className="text-[11px] text-gray-500">
                                          {act.country} • Server {act.serverId}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 font-mono text-lg font-black text-white px-1 tracking-wider">
                                        {act.number}
                                        <button 
                                          id={`copy-num-${act.id}`}
                                          type="button"
                                          onClick={() => copyText(act.number)} 
                                          className="p-1 rounded bg-[#1C273D] text-gray-400 hover:text-white transition">
                                          <Copy className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      {isWaiting && (
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-950/40 border border-yellow-500/20 text-yellow-400 text-xs font-semibold animate-pulse">
                                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></span>
                                          {t.waitingSms}
                                        </span>
                                      )}
                                      {isReceived && (
                                        <span className="px-3 py-1 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-xs font-semibold">
                                          {t.smsReceived}
                                        </span>
                                      )}
                                      {isExpired && (
                                        <span className="px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-gray-500 text-xs font-semibold">
                                          {t.expired}
                                        </span>
                                      )}
                                      {isCancelled && (
                                        <span className="px-3 py-1 rounded-full bg-red-950 text-red-400 text-xs font-semibold">
                                          {t.cancelled}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* SMS Log Output */}
                                  <div className="p-4 rounded-xl bg-[#090D15] border border-gray-900 mb-4 min-h-16 flex flex-col justify-center">
                                    {act.sms.length > 0 ? (
                                      <div className="space-y-3">
                                        {act.sms.map((msg: any, sIdx: number) => (
                                          <div key={sIdx} className="space-y-1.5">
                                            <div className="flex items-center justify-between text-[11px] text-purple-400 font-bold">
                                              <span>Sender ID: {msg.sender}</span>
                                              <span>{new Date(msg.receivedAt).toLocaleTimeString()}</span>
                                            </div>
                                            <p className="text-gray-100 font-semibold text-xs leading-relaxed">{msg.text}</p>
                                            
                                            {/* Extract verification OTP code */}
                                            {msg.text.match(/\d{4,8}/) && (
                                              <div className="mt-2.5 flex items-center gap-3 p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl">
                                                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Verification OTP:</span>
                                                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 tracking-widest font-mono">
                                                  {msg.text.match(/\d{4,8}/)[0]}
                                                </span>
                                                <button 
                                                  id={`copy-otp-${act.id}`}
                                                  type="button"
                                                  onClick={() => copyText(msg.text.match(/\d{4,8}/)[0])} 
                                                  className="ml-auto px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs transition">
                                                  Copy
                                                </button>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="text-center">
                                        {isWaiting && <p className="text-xs text-gray-500 leading-normal">Simulated carrier is routing private node messages. Fire the SMS OTP from {act.service} to this number now!</p>}
                                        {isExpired && <p className="text-xs text-red-500/80 leading-normal">Order reached maximum lease threshold and expired. Wallet refund state saved.</p>}
                                        {isCancelled && <p className="text-xs text-red-500/80 leading-normal">Node forcefully shutdown. Balance refunded automatically.</p>}
                                      </div>
                                    )}
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center justify-between gap-2 border-t border-gray-800/60 pt-3">
                                    <span className="text-[11px] text-gray-500 font-mono">Node ID: {act.orderId}</span>
                                    <div className="flex gap-2">
                                      {isWaiting && (
                                        <button 
                                          id={`cancel-order-${act.id}`}
                                          type="button"
                                          onClick={() => triggerCancelOrder(act.id)}
                                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-900/60 transition">
                                          <Ban className="w-3.5 h-3.5" />
                                          {t.cancelOrder}
                                        </button>
                                      )}
                                      
                                      {(isReceived || isWaiting) && act.serverId === 2 && (
                                        <button 
                                          id={`code-again-${act.id}`}
                                          type="button"
                                          onClick={() => triggerGetCodeAgain(act.id)}
                                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-900/60 transition">
                                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                          Code Again
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Left details trust informers Column layout */}
                    <div className="lg:col-span-1 space-y-4">
                      
                      {/* Safety Guarantee */}
                      <div className="p-5 rounded-2xl bg-[#101726] border border-gray-800 space-y-3.5">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800/50 pb-2.5">
                          <ShieldCheck className="w-4 h-4 text-purple-400" />
                          Security Guarantee
                        </h4>
                        <div className="space-y-3 text-[11px] text-gray-400 leading-relaxed">
                          <p>
                            <strong>100% Secure Private Line:</strong> Our phone numbers are purely temporary private nodes. They are never shared or recycled, guaranteeing zero brand registration reuse issues on social accounts.
                          </p>
                          <p>
                            <strong>Automatic Refund Protection:</strong> If no SMS verification has arrived inside the 15-minute window, the node cancels gracefully and initiates a full credit refund transaction back to your dashboard wallet instantly.
                          </p>
                        </div>
                      </div>

                      {/* Manual Simulation Assistant */}
                      {activeNumberHistory.some(h => h.status === 'waiting') && (
                        <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-950/25 to-[#101726] border border-indigo-500/10 space-y-3">
                          <h4 className="text-xs font-black text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
                            <RefreshCw className="w-3.5 h-3.5" />
                            DEMO CARRIER SIMULATOR
                          </h4>
                          <p className="text-[10px] text-gray-400">
                            Force an incoming carrier SMS to your listening nodes instantly to test app behaviors:
                          </p>
                          <div className="space-y-2.5 pt-1">
                            <div>
                              <label className="text-[9px] text-gray-500 uppercase tracking-wider block mb-0.5">Sender name identifier</label>
                              <input
                                type="text"
                                value={simulatedSender}
                                onChange={(e) => setSimulatedSender(e.target.value)}
                                className="w-full bg-[#151D2F] border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-gray-500 uppercase tracking-wider block mb-0.5">Message Content</label>
                              <textarea
                                value={simulatedText}
                                onChange={(e) => setSimulatedText(e.target.value)}
                                rows={2}
                                className="w-full bg-[#151D2F] border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none resize-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const listening = activeNumberHistory.find(h => h.status === 'waiting');
                                if (listening) {
                                  triggerManualSimulation(listening.id);
                                }
                              }}
                              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                            >
                              Dispatch Carrier Send
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                )}

                {/* SLIDE CHECKOUT MODAL DRAWER COMPONENT */}
                {selectedProductService && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="relative bg-[#11192C] border border-indigo-520/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
                      
                      {/* Drawer Head */}
                      <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-900/40 flex items-center justify-center text-xl text-indigo-400 border border-indigo-500/20 font-black">
                            ⚡
                          </div>
                          <div>
                            <h3 className="text-base font-black text-white">Acquire Verification Node</h3>
                            <p className="text-[11px] text-indigo-300">Target service: {selectedProductService.name}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedProductService(null)}
                          className="px-3 py-1 bg-[#151D2F] border border-gray-800 hover:bg-gray-800 text-xs font-bold text-gray-400 hover:text-white rounded-lg transition"
                        >
                          Close
                        </button>
                      </div>

                      {/* Selectors rows */}
                      <div className="grid grid-cols-2 gap-3.5 mb-5">
                        {/* Selected Server choice */}
                        <div>
                          <label className="text-[9px] text-gray-500 block mb-1 uppercase tracking-wider font-bold">Node Dispatch route</label>
                          <div className="grid grid-cols-3 gap-1 bg-[#151D2D] p-1 border border-gray-850 rounded-xl">
                            {[1, 2, 3].map((srv) => (
                              <button
                                key={srv}
                                type="button"
                                onClick={() => setSelectedServer(srv as any)}
                                className={`py-1 text-[10px] font-black rounded-lg transition ${
                                  selectedServer === srv ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                S{srv}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Selected Currency billing format */}
                        <div>
                          <label className="text-[9px] text-gray-500 block mb-1 uppercase tracking-wider font-bold">Billing Currency</label>
                          <div className="grid grid-cols-2 gap-1 bg-[#151D2D] p-1 border border-gray-850 rounded-xl">
                            <button
                              type="button"
                              onClick={() => setCurrency('NGN')}
                              className={`py-1 text-[10px] font-black rounded-lg transition ${
                                currency === 'NGN' ? 'bg-[#1C273C] text-emerald-400 border border-emerald-500/10' : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              ₦ NGN
                            </button>
                            <button
                              type="button"
                              onClick={() => setCurrency('USD')}
                              className={`py-1 text-[10px] font-black rounded-lg transition ${
                                currency === 'USD' ? 'bg-[#1C273D] text-emerald-400 border border-emerald-500/10' : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              $ USD
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Select Country Gateway Scroll grid */}
                      <div className="space-y-2 mb-5">
                        <label className="text-[9px] text-gray-500 block uppercase tracking-wider font-bold">Country Gateways</label>
                        <div className="relative mb-2">
                          <Search className="absolute left-3 top-2.5 text-gray-500 w-3.5 h-3.5" />
                          <input
                            id="checkout-drawer-countries-query-bar"
                            type="text"
                            placeholder="Search country..."
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            className="w-full bg-[#151D30] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition-all font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
                          {countries
                            .filter(c => c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()))
                            .map((c) => {
                              const isSel = selectedCountry?.code === c.code;
                              const costText = currency === 'NGN' ? `₦${c.priceNgn}` : `$${c.priceUsd.toFixed(2)}`;
                              return (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => setSelectedCountry(c)}
                                  className={`p-2 rounded-xl text-left border flex flex-col justify-between h-14 transition cursor-pointer ${
                                    isSel
                                      ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                                      : 'border-gray-850 bg-[#162032] text-gray-300 hover:text-white hover:border-gray-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-1 text-[11px] truncate font-medium">
                                    <span>{c.flag}</span>
                                    <span className="truncate">{c.name}</span>
                                  </div>
                                  <span className="block text-[11px] text-emerald-400 font-mono font-bold mt-0.5">{costText}</span>
                                </button>
                              );
                            })}
                        </div>
                      </div>

                      {/* Cost Checkout calculation brief */}
                      <div className="p-4 bg-[#141C2D] border border-gray-800 rounded-2xl flex items-center justify-between mb-5 shadow-inner">
                        <div>
                          <span className="text-[10px] text-gray-500 font-semibold block uppercase">Total Cost Allocation:</span>
                          <span className="text-xs text-indigo-300 font-mono font-bold">{selectedCountry?.name || 'Any'} • Server {selectedServer}</span>
                        </div>
                        <div className="text-right">
                          <span className="block font-black text-emerald-400 text-lg leading-tight">
                            {currency === 'NGN' ? `₦${selectedCountry?.priceNgn}` : `$${selectedCountry?.priceUsd?.toFixed(2)}`}
                          </span>
                          <span className="block text-[9px] text-gray-500 font-medium">Infinite auto-refund guarantee</span>
                        </div>
                      </div>

                      {/* Execute CTA */}
                      <button
                        type="button"
                        onClick={async () => {
                          setSelectedProductService(null); // Close instantly
                          await executeNumberPurchase();
                        }}
                        className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs tracking-widest transition transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                      >
                        <Smartphone className="w-4 h-4" />
                        PURCHASE VIRTUAL CHANNEL
                      </button>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* SECTION 2: RENT A NUMBER */}
            {activeTab === 'rent' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Heading and Subtabs bar matching Afrinum style */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-805 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                       <Clock className="w-5 h-5 text-indigo-400 rotate-12 animate-pulse" />
                       Rent a Number
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Long-term real international numbers for days or weeks</p>
                  </div>
                  
                  {/* Selector Switches Browse vs My Rentals */}
                  <div className="flex items-center gap-1.5 bg-[#101726] p-1.5 rounded-xl border border-gray-800 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => setRentSubTab('browse')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        rentSubTab === 'browse'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-650/15'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Browse Countries
                    </button>
                    <button
                      type="button"
                      onClick={() => setRentSubTab('my-rentals')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        rentSubTab === 'my-rentals'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-650/15 font-bold'
                          : 'text-gray-400 hover:text-white font-bold'
                      }`}
                    >
                      My Rentals
                      {activeNumberHistory.filter(n => n.isRental).length > 0 && (
                        <span className="bg-indigo-900 border border-indigo-400/25 text-indigo-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {activeNumberHistory.filter(n => n.isRental).length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {rentSubTab === 'browse' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-5 lg:col-span-1">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-3">
                        <Clock className="w-4 h-4 text-purple-400" />
                        Configure Lease Contract
                      </h3>

                  {/* Rent Country Select */}
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5 font-medium">{t.country}</label>
                    <div className="relative mb-2">
                       <Search className="absolute left-3 top-2.5 text-gray-500 w-3.5 h-3.5" />
                       <input
                         id="rent-country-search-bar"
                         type="text"
                         placeholder="Search country..."
                         value={rentCountrySearchQuery}
                         onChange={(e) => setRentCountrySearchQuery(e.target.value)}
                         className="w-full bg-[#151D2F] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-purple-500 transition"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                       {countries
                         .filter(c => c.name.toLowerCase().includes(rentCountrySearchQuery.toLowerCase()))
                         .map((c) => (
                         <button 
                           key={c.code}
                           id={`rent-country-opt-${c.code}`}
                           onClick={() => setSelectedRentCountry(c)}
                           className={`flex items-center gap-2 p-2.5 rounded-xl text-xs border text-left transition cursor-pointer ${
                             selectedRentCountry?.code === c.code 
                               ? 'border-purple-500 bg-purple-950/20 text-white font-semibold' 
                               : 'border-gray-800 bg-[#161F32] text-gray-400 hover:text-white'
                           }`}>
                           <span className="text-lg shrink-0">{c.flag}</span>
                           <span className="truncate">{c.name}</span>
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Duration Selector Cards */}
                  <div>
                    <label className="text-xs text-gray-400 block mb-2 font-medium">Rental Lease Duration</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { days: 1, label: '1 Day', disc: 'Base Rate' },
                        { days: 7, label: '7 Days', disc: '5% Discnt' },
                        { days: 30, label: '30 Days', disc: '10% Discnt' },
                        { days: 90, label: '90 Days', disc: '20% Discnt' }
                      ].map((item) => (
                        <button
                          key={item.days}
                          id={`duration-${item.days}`}
                          type="button"
                          onClick={() => setSelectedRentDuration(item.days)}
                          className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${selectedRentDuration === item.days ? 'border-purple-500 bg-purple-950/20' : 'border-gray-800 bg-[#141C2D]'}`}
                        >
                          <span className={`text-xs font-bold ${selectedRentDuration === item.days ? 'text-white' : 'text-gray-300'}`}>{item.label}</span>
                          <span className="text-[10px] text-purple-400 mt-0.5">{item.disc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Auto Renew options */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141C2D] border border-gray-800">
                    <div>
                      <span className="text-xs text-white font-bold block">Auto-Renew Lease</span>
                      <span className="text-[10px] text-gray-500 block">Deduct balance Automatically</span>
                    </div>
                    <input 
                      id="auto-renew-switch"
                      type="checkbox" 
                      checked={autoRenewRent}
                      onChange={(e) => setAutoRenewRent(e.target.checked)}
                      className="w-4 h-4 text-purple-600 outline-none accent-purple-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Dynamic Pricing checkout summary */}
                  <div className="p-4 rounded-xl bg-[#141C2D] border border-gray-800 space-y-3 font-sans">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Daily Lease Rent:</span>
                      <span className="font-bold text-white">
                        {currency === 'NGN' 
                          ? `₦${getDailyRentalPrice(selectedRentCountry).ngn.toLocaleString()}` 
                          : `$${getDailyRentalPrice(selectedRentCountry).usd.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Lease Duration:</span>
                      <span className="font-bold text-white">{selectedRentDuration} Days</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Bulk Contract Discount:</span>
                      <span className="font-bold text-purple-400">
                        {selectedRentDuration === 1 ? '0%' : selectedRentDuration === 7 ? '5%' : selectedRentDuration === 30 ? '10%' : '20%'}
                      </span>
                    </div>
                    <div className="flex justify-between items-end border-t border-gray-800 pt-3">
                      <span className="text-xs text-gray-300 font-bold">Total Subscription Fees:</span>
                      <div className="text-right">
                        <span className="block font-black text-emerald-400 text-sm">
                          {currency === 'NGN' 
                            ? `₦${(getDailyRentalPrice(selectedRentCountry).ngn * selectedRentDuration * (selectedRentDuration >= 90 ? 0.8 : selectedRentDuration >= 30 ? 0.9 : selectedRentDuration >= 7 ? 0.95 : 1)).toLocaleString(undefined, { maximumFractionDigits: 1 })}` 
                            : `$${(getDailyRentalPrice(selectedRentCountry).usd * selectedRentDuration * (selectedRentDuration >= 90 ? 0.8 : selectedRentDuration >= 30 ? 0.9 : selectedRentDuration >= 7 ? 0.95 : 1)).toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    id="rent-number-submit"
                    onClick={executeNumberRental}
                    disabled={isProcessingRent}
                    className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs tracking-wider transition duration-150 transform active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                    {isProcessingRent ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                    INITIATE LEASE SUBSCRIPTION
                  </button>

                </div>

                {/* Right side Rent Information guidelines */}
                <div className="bg-[#101726]/40 p-5 rounded-2xl border border-gray-800 space-y-4 lg:col-span-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
                    <Globe className="w-4 h-4 text-purple-400" />
                    How Long-Term Leases Work
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-normal">
                    <div className="p-4 rounded-xl bg-[#101726] border border-gray-800/60">
                      <h4 className="font-bold text-purple-300 mb-1.5 flex items-center gap-1">🌐 True Multi-Platform Line</h4>
                      <p className="text-gray-400 text-[11px]">
                        Unlike temporary numbers that receive only 1 message and expire in 15 minutes, leased lines are active for 24/7. You can use them repeatedly matching any site.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#101726] border border-gray-800/60">
                      <h4 className="font-bold text-purple-300 mb-1.5 flex items-center gap-1">📥 Infinite OTP Inboxes</h4>
                      <p className="text-gray-400 text-[11px]">
                        Request unlimited confirmation SMS. View all codes delivered sequentially inside your personal live Inbox. Great for managing multiple online corporate setups.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#101726] border border-gray-800/60">
                      <h4 className="font-bold text-purple-300 mb-1.5 flex items-center gap-1">🔄 Flexible Renewal Models</h4>
                      <p className="text-gray-400 text-[11px]">
                        Lease extensions keep the exact same number reserved for you. Turn on Auto-Renew options, and we will carry forward your lease period seamlessly.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#101726] border border-gray-800/60">
                      <h4 className="font-bold text-purple-300 mb-1.5 flex items-center gap-1">🔄 Dedicated Route Integrity</h4>
                      <p className="text-gray-400 text-[11px]">
                        Allocated through European and VIP Global carrier backbones to ensure maximum reception probability for hard-to-verify secure accounts like PayPal or Wise.
                      </p>
                    </div>
                  </div>
                </div>
                </div>
                )}

                {rentSubTab === 'my-rentals' && (
                  <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 shadow-lg max-w-4xl font-sans animate-in fade-in">
                    <div className="border-b border-gray-800 pb-3.5 mb-4 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 text-indigo-400">
                        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping block"></span>
                        MY ACTIVE RENTAL CONDUITS
                      </h3>
                      <span className="text-xs text-gray-400 font-bold font-mono">{activeNumberHistory.filter(n => n.isRental).length} active contracts</span>
                    </div>

                    {activeNumberHistory.filter(n => n.isRental).length === 0 ? (
                      <div className="text-center py-16 px-4 space-y-3 font-sans">
                        <Clock className="w-12 h-12 text-gray-700 mx-auto animate-pulse" />
                        <p className="text-xs text-gray-400 max-w-sm mx-auto">No long-term lease contract subscriptions active currently. Check the "Browse Countries" tab to register and lease an extended confirmation number instantly!</p>
                        <button
                          type="button"
                          onClick={() => setRentSubTab('browse')}
                          className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition mx-auto cursor-pointer"
                        >
                          Browse Leases
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activeNumberHistory
                          .filter(n => n.isRental)
                          .map((act) => {
                            const expiresFormatted = new Date(act.expiresAt).toLocaleDateString() + ' ' + new Date(act.expiresAt).toLocaleTimeString();
                            return (
                              <div key={act.id} className="p-5 bg-[#141C2D] border border-gray-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{countries.find(c => c.name === act.country)?.flag || '🌍'}</span>
                                    <span className="font-black text-sm text-white font-mono tracking-wide">{act.number}</span>
                                    <span className="text-[10px] bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-bold px-2 py-0.5 rounded font-mono uppercase tracking-widest">Leased</span>
                                  </div>
                                  <div className="text-[11px] text-gray-300 space-y-0.5 font-medium border-none p-0">
                                    <p>Country gateway: <span className="text-white">{act.country}</span></p>
                                    <p>Subscription expiry threshold: <span className="text-indigo-300 font-bold font-mono">{expiresFormatted}</span></p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveTab('inbox');
                                      setSimulatedNumberId(act.id);
                                    }}
                                    className="px-4 py-2.5 bg-[#1C2434] hover:bg-gray-800 border border-gray-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer font-sans"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                                    Launch OTP Inbox
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* SECTION 3: OTP INBOX & SIMULATOR */}
            {activeTab === 'inbox' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200 font-sans">
                
                {/* Left side list of owned lines */}
                <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-4 lg:col-span-1">
                  <div className="border-b border-gray-800 pb-3 flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-purple-400" />
                        Interactive Gateways
                      </span>
                      <span className="text-[10px] bg-[#161F32] border border-gray-800 text-gray-400 font-bold px-2 py-0.5 rounded-full font-mono">
                        {activeNumberHistory.length} lines
                      </span>
                    </h3>
                    <p className="text-[11px] text-gray-400">Select an active line to inspect incoming message payloads in real-time.</p>
                  </div>

                  {activeNumberHistory.length === 0 ? (
                    <div className="text-center py-16 space-y-3.5 font-sans">
                      <div className="w-12 h-12 bg-gray-805/40 rounded-full flex items-center justify-center mx-auto border border-gray-800">
                        <Smartphone className="w-6 h-6 text-gray-600 animate-pulse" />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                        You do not have any purchased temporary numbers or rented subscriptions.
                      </p>
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setActiveTab('buy')} 
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition cursor-pointer font-sans"
                        >
                          Buy Normal OTP
                        </button>
                        <button 
                          onClick={() => setActiveTab('rent')} 
                          className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 border border-indigo-500/20 text-white font-bold text-xs rounded-xl transition cursor-pointer font-sans"
                        >
                          Rent Lease
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                      {activeNumberHistory.map((num) => {
                        const isSel = simulatedNumberId === num.id || (!simulatedNumberId && activeNumberHistory[0]?.id === num.id);
                        if (!simulatedNumberId && activeNumberHistory[0]?.id === num.id) {
                          // Auto set if not defined yet
                          setTimeout(() => setSimulatedNumberId(num.id), 10);
                        }

                        // Time parsing
                        const isExpired = new Date(num.expiresAt) < new Date();
                        const timeString = new Date(num.expiresAt).toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' });

                        return (
                          <button
                            key={num.id}
                            id={`owned-num-${num.id}`}
                            onClick={() => setSimulatedNumberId(num.id)}
                            className={`w-full text-left p-4 rounded-xl border transition flex flex-col gap-2 relative cursor-pointer select-none ${
                              isSel 
                                ? 'border-indigo-500 bg-indigo-950/20 shadow-md shadow-indigo-600/5' 
                                : 'border-gray-800 bg-[#141C2D] hover:bg-[#1C273E]/40'
                            }`}
                          >
                            {isSel && (
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-500 rounded-l-xl"></div>
                            )}

                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-sm text-white tracking-wide font-mono">{num.number}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black font-mono uppercase tracking-widest border ${
                                num.isRental 
                                  ? 'bg-indigo-950/80 border-indigo-505 text-indigo-300' 
                                  : 'bg-purple-950/80 border-purple-505 text-purple-300'
                              }`}>
                                {num.isRental ? 'Lease' : 'One-Time'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans">
                              <span>{num.country} &bull; {num.service.slice(0, 18)}</span>
                              <span className={isExpired ? 'text-red-400 font-bold' : 'text-gray-500 font-bold'}>
                                {isExpired ? 'Expired' : `Expires: ${timeString}`}
                              </span>
                            </div>

                            {num.sms && num.sms.length > 0 && (
                              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium font-mono truncate">
                                Code: {num.sms[num.sms.length - 1].text.match(/\d{4,6}/)?.[0] || 'SMS DELIVERED'}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right side Inbox Console & Sandbox message manual controls */}
                <div className="lg:col-span-2 space-y-6 font-sans">
                  
                  {/* SMS Inbox Terminal Tray */}
                  <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-4 shadow-lg">
                    {(() => {
                      const activeItem = activeNumberHistory.find(n => n.id === simulatedNumberId);
                      if (!activeItem) {
                        return (
                          <div className="text-center py-24 font-sans space-y-3">
                            <Smartphone className="w-10 h-10 text-gray-700 mx-auto animate-bounce" />
                            <p className="text-xs text-gray-400 font-medium">Select an active line gateway on the left panel to display interactive verification streams.</p>
                          </div>
                        );
                      }

                      const isExpired = new Date(activeItem.expiresAt) < new Date();

                      return (
                        <div className="space-y-4 font-sans">
                          
                          {/* Header of chosen line */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-lg text-white font-mono tracking-wide">{activeItem.number}</h4>
                                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#151D2F] border border-gray-800 text-[10px] text-emerald-400 font-black font-sans uppercase">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                                  Listening Live
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1 font-sans">
                                Gateway: <strong className="text-white font-sans">{activeItem.country}</strong> | Telephony channel Node: <span className="text-purple-300 font-mono font-bold">NODE-{activeItem.serverId}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {activeItem.status === 'waiting' && !isExpired && (
                                <button 
                                  onClick={() => triggerCancelOrder(activeItem.id)}
                                  className="px-3.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-500/20 text-red-450 hover:text-white text-[11px] font-bold transition duration-155 cursor-pointer font-sans"
                                >
                                  Cancel & Refund
                                </button>
                              )}
                              {!activeItem.isRental && (
                                <button 
                                  onClick={() => triggerGetCodeAgain(activeItem.id)}
                                  className="px-3.5 py-1.5 rounded-xl bg-[#141C2D] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-[11px] font-bold transition duration-155 cursor-pointer font-sans"
                                >
                                  Request Code Again
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Message bubble lists */}
                          <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1">
                            {activeItem.sms && activeItem.sms.length > 0 ? (
                              activeItem.sms.map((msg: any) => {
                                const codeMatch = msg.text.match(/\d{4,6}/);
                                const codeOnly = codeMatch ? codeMatch[0] : null;

                                return (
                                  <div key={msg.id} className="p-4 bg-[#141C2D] border border-gray-800 rounded-2xl space-y-2 animate-in slide-in-from-bottom-2 duration-200">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-black text-indigo-400 tracking-wider font-mono">FROM: {msg.sender.toUpperCase()}</span>
                                      <span className="text-[10px] text-gray-500 font-mono font-sans font-bold">{new Date(msg.receivedAt).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-200 font-sans leading-relaxed">{msg.text}</p>
                                    
                                    {codeOnly && (
                                      <div className="flex items-center gap-2 pt-2 border-t border-gray-800/40 font-sans">
                                        <div className="bg-[#101726] border border-gray-850 px-3 py-1.5 text-sm font-black text-emerald-400 font-mono tracking-widest rounded-xl">
                                          {codeOnly}
                                        </div>
                                        <button 
                                          onClick={() => copyText(codeOnly)}
                                          className="text-[10px] bg-indigo-950/40 border border-indigo-500/20 hover:border-indigo-550/45 text-indigo-300 font-bold px-3 py-1.5 rounded-xl transition shrink-0 cursor-pointer font-sans"
                                        >
                                          Copy Verification Code
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-center py-14 space-y-2.5 font-sans">
                                <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin mx-auto mb-1 opacity-70" />
                                <p className="text-xs text-gray-300 font-bold font-sans">Waiting for incoming verification payloads...</p>
                                <p className="text-[10px] text-gray-500 max-w-sm mx-auto font-sans">The cellular gateway automatically processes transmissions. Check external platform verification outputs; messages land visually within seconds here.</p>
                              </div>
                            )}
                          </div>

                          {/* Sandbox Simulator tools specifically designed for testing */}
                          <div className="p-4 rounded-2xl bg-indigo-950/15 border border-indigo-500/10 mt-2 space-y-3.5 font-sans">
                            <div>
                              <span className="text-[11px] font-black text-indigo-450 uppercase tracking-widest block font-mono">Afrinum Global Gateway Sandbox</span>
                              <span className="text-[10px] text-gray-400 block mt-0.5 font-sans">Simulate incoming SMS network delivery on this number to verify code extraction and application functionality.</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
                              <div>
                                <label className="text-[10px] text-gray-400 block mb-1 font-bold">Network Sender ID</label>
                                <input 
                                  type="text" 
                                  placeholder="WhatsApp, Facebook, Afrinum"
                                  value={simulatedSender}
                                  onChange={(e) => setSimulatedSender(e.target.value)}
                                  className="w-full bg-[#101726] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white uppercase outline-none focus:border-indigo-505"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="text-[10px] text-gray-400 block mb-1 font-bold">Message Content</label>
                                <input 
                                  type="text" 
                                  placeholder="Type secure code or verification instruction (e.g. Your verification code is 492048)"
                                  value={simulatedText}
                                  onChange={(e) => setSimulatedText(e.target.value)}
                                  className="w-full bg-[#101726] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-505"
                                />
                              </div>
                            </div>

                            <button
                              id="deliver-simulation-btn"
                              onClick={() => triggerManualSimulation(activeItem.id)}
                              className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white text-[11px] font-bold rounded-xl transition uppercase tracking-widest cursor-pointer shadow-md font-mono"
                            >
                              ⚡ DELIVER SIMULATED SMS IMMEDIATELY
                            </button>
                          </div>

                        </div>
                      );
                    })()}
                  </div>

                </div>

              </div>
            )}

            {/* SECTION 2: FUND WALLET INSTANTLY */}
            {activeTab === 'wallet' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Deposit widget builder */}
                <div className="lg:col-span-2 bg-[#101726] rounded-2xl border border-gray-800 p-6 space-y-6">
                  
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <PlusCircle className="text-purple-400" />
                      {t.depositTitle}
                    </h3>
                    <p className="text-xs text-gray-400">Choose your preferred funding source below. Dynamic promos are automatically validated on checkout.</p>
                  </div>

                  {/* Payment Methods tabs grid selection */}
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      id="method-bank"
                      onClick={() => setFundingMethod('bank_transfer')} 
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border gap-2 text-center transition ${
                        fundingMethod === 'bank_transfer' ? 'border-purple-500 bg-purple-950/25 text-white' : 'border-gray-800 bg-[#161F32] text-gray-400 hover:text-white'
                      }`}>
                      <Users className="w-6 h-6 text-purple-400" />
                      <span className="text-xs font-semibold">Bank Transfer</span>
                    </button>
                    <button 
                      id="method-paystack"
                      onClick={() => setFundingMethod('paystack')} 
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border gap-2 text-center transition ${
                        fundingMethod === 'paystack' ? 'border-purple-500 bg-purple-950/25 text-white' : 'border-gray-800 bg-[#161F32] text-gray-400 hover:text-white'
                      }`}>
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                      <span className="text-xs font-semibold">Flutterwave (Card / Bank)</span>
                    </button>
                    <button 
                      id="method-crypto"
                      onClick={() => setFundingMethod('crypto')} 
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border gap-2 text-center transition ${
                        fundingMethod === 'crypto' ? 'border-purple-500 bg-purple-950/25 text-white' : 'border-gray-800 bg-[#161F32] text-gray-400 hover:text-white'
                      }`}>
                      <DollarSign className="w-6 h-6 text-purple-400" />
                      <span className="text-xs font-semibold">Crypto Gateway</span>
                    </button>
                  </div>

                  {/* Input form fields parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1 font-medium">{t.enterAmount} ({currency})</label>
                      <input 
                        id="funding-amount-input"
                        type="number"
                        placeholder="e.g. 5000"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1 font-medium">{t.applyCoupon} (Optional 10% bonus)</label>
                      <input 
                        id="promo-coupon-input"
                        type="text"
                        placeholder="e.g. CLASSIC10"
                        value={depositPromo}
                        onChange={(e) => setDepositPromo(e.target.value)}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                      />
                    </div>
                  </div>

                  {/* Dynamic checkout panels details depending on selected gateways */}
                  {fundingMethod === 'bank_transfer' && (
                    <div className="p-4 rounded-xl bg-[#141C2D] border border-gray-800 space-y-3">
                      <p className="text-xs font-bold text-white uppercase tracking-wider text-purple-400 font-sans">eclassiqnum Automated Naira Funding Details</p>
                      <p className="text-xs text-gray-400">Transfer any amount from your Nigerian Banking application to the unique instant-settlement coordinates below:</p>
                      <div className="p-3.5 rounded-lg bg-[#0B0F19] border border-gray-900 space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Bank:</span>
                          <span className="text-white font-bold">WEMA Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Account Name:</span>
                          <span className="text-white">eclassiqnum Tech Inc</span>
                        </div>
                        <div className="flex justify-between items-center text-emerald-400 font-bold">
                          <span>Account Number:</span>
                          <div className="flex items-center gap-2">
                            <span>0090874536</span>
                            <button 
                              id="copy-account-no"
                              onClick={() => copyText('0090874536')} 
                              className="p-1 rounded bg-[#161F32] text-gray-400 hover:text-white transition">
                              <Copy className="w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-yellow-400/95 leading-snug">
                        <strong>Simulation Auto-confirm:</strong> For immediate credit simulation in this sandbox deployment, simple input your target amount above and click the check button below.
                      </p>
                    </div>
                  )}

                  {fundingMethod === 'paystack' && (
                    <div className="p-4 rounded-xl bg-[#141C2D] border border-gray-800 space-y-3">
                      <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Flutterwave Payment Gateway</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-3">
                          <label className="text-[10px] text-gray-500">Card Number</label>
                          <input 
                            id="card-number-input"
                            type="text" 
                            value={paystackCardState.number}
                            onChange={(e) => setPaystackCardState({...paystackCardState, number: e.target.value})}
                            className="w-full bg-[#0B0F19] border border-gray-900 rounded-lg p-2 text-xs text-white" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500">Expiry Date</label>
                          <input 
                            id="card-expiry-input"
                            type="text" 
                            value={paystackCardState.date}
                            onChange={(e) => setPaystackCardState({...paystackCardState, date: e.target.value})}
                            className="w-full bg-[#0B0F19] border border-gray-900 rounded-lg p-2 text-xs text-white text-center" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500">CVC Code</label>
                          <input 
                            id="card-cvc-input"
                            type="text" 
                            value={paystackCardState.cvc}
                            onChange={(e) => setPaystackCardState({...paystackCardState, cvc: e.target.value})}
                            className="w-full bg-[#0B0F19] border border-gray-900 rounded-lg p-2 text-xs text-white text-center" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {fundingMethod === 'crypto' && (
                    <div className="p-4 rounded-xl bg-[#141C2D] border border-gray-800 space-y-3">
                      <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Smart Cryptocurrency Gateway</p>
                      <p className="text-xs text-gray-400">Deposit using BTC, ETH or USDT to receive immediate conversion wallet load credits:</p>
                      <div className="p-3.5 bg-[#0B0F19] border border-gray-900 rounded-lg flex items-center justify-between gap-4">
                        <div className="text-xs font-mono space-y-1">
                          <p className="text-purple-300 font-bold">USDT (TRC20 Address):</p>
                          <p className="text-white text-[11px] truncate">TYg89fHj83hDbs7Tgbks9WhGdbks90WjsYf</p>
                        </div>
                        <button 
                          id="copy-crypto-address"
                          onClick={() => copyText('TYg89fHj83hDbs7Tgbks9WhGdbks90WjsYf')} 
                          className="px-2.5 py-1.5 bg-[#161F32] text-gray-300 hover:text-white text-[10px] font-bold rounded-lg transition">
                          Copy
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          id="crypto-has-paid"
                          type="checkbox" 
                          checked={cryptoPaidConfirm} 
                          onChange={(e) => setCryptoPaidConfirm(e.target.checked)} 
                        />
                        <label className="text-xs text-gray-400">Yes, I has completed the actual transaction</label>
                      </div>
                    </div>
                  )}

                  <button 
                    id="submit-funding-btn"
                    onClick={initiateMockFunding}
                    disabled={isProcessingFunding || (fundingMethod === 'crypto' && !cryptoPaidConfirm)}
                    className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs transition duration-150 flex items-center justify-center gap-2">
                    {isProcessingFunding ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <PlusCircle className="w-4 h-4" />
                    )}
                    {isProcessingFunding ? 'Verifying payment ledger on blockchain, please wait...' : `APPROVE DEPOSIT AND SECURE FUNDS`}
                  </button>

                </div>

                {/* Simulated naira/usd rate calculator informer */}
                <div className="bg-[#101726] rounded-2xl border border-gray-800 p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-3">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    Conversion Economics
                  </h3>
                  <div className="p-4 bg-[#141C2D] border border-gray-800 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Rate benchmark:</span>
                      <span className="font-bold text-emerald-400">₦1,550.00 = $1.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Naira minimum deposit:</span>
                      <span className="text-white">₦0 (No Minimum)</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Crypto approval duration:</span>
                      <span className="text-gray-300 font-medium">1 confirmation (~1 min)</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-xl">
                    <p className="text-[11px] text-purple-300 leading-snug">
                      <strong>Automatic Commission Info:</strong> 5% of all top-ups triggered by your referred affiliates will be credited instantly to your separate affiliate reward vault!
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* SECTION 3: REFERRAL / AFFILIATE SYSTEM */}
            {activeTab === 'affiliate' && affiliateStats && (
              <div className="space-y-6">
                
                {/* Stats indicators grid */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl">
                    <p className="text-xs text-gray-500 font-medium">Referral link views count</p>
                    <p className="text-2xl font-black text-white mt-1">{affiliateStats.referralsCount}</p>
                  </div>
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl">
                    <p className="text-xs text-gray-500 font-medium">Earnings in Naira</p>
                    <p className="text-2xl font-black text-emerald-400 mt-1">₦{affiliateStats.affiliateEarningsNgn.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl">
                    <p className="text-xs text-gray-500 font-medium">Earnings in Dollar</p>
                    <p className="text-2xl font-black text-emerald-400 mt-1">${affiliateStats.affiliateEarningsUsd.toFixed(2)}</p>
                  </div>
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl">
                    <p className="text-xs text-gray-500 font-medium">Your Commission share</p>
                    <p className="text-2xl font-black text-purple-400 mt-1">5% Markup</p>
                  </div>
                </div>

                {/* Links copy block area & payout trigger request column */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column referral link generator */}
                  <div className="lg:col-span-1 bg-[#101726] border border-gray-800 rounded-2xl p-5 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-3">
                      <Award className="w-4 h-4 text-purple-400" />
                      {t.referralLink}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Share your custom referral code link to receive premium commissions from platform markup profits paid out from our vault:
                    </p>
                    <div className="p-3 bg-[#151D30] rounded-xl border border-gray-800 flex items-center justify-between gap-3">
                      <span className="text-xs text-purple-300 font-mono truncate">{affiliateStats.referralLink}</span>
                      <button 
                        id="copy-ref-link"
                        onClick={() => copyText(affiliateStats.referralLink)} 
                        className="p-1 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-bold transition">
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Middle and withdrawal payouts request generator form */}
                  <div className="lg:col-span-2 bg-[#101726] border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-3 mb-4">
                      <Wallet className="w-4 h-4 text-purple-400" />
                      {t.withdraw}
                    </h3>
                    
                    <form onSubmit={handleAffiliateWithdraw} className="space-y-4">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">Withdrawal Amount</label>
                          <input 
                            id="withdraw-amount-input"
                            type="number" 
                            placeholder="e.g. 2500"
                            value={withdrawDetails.amount}
                            onChange={(e) => setWithdrawDetails({...withdrawDetails, amount: e.target.value})}
                            className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">Settlement Method</label>
                          <select 
                            id="withdraw-method-select"
                            value={withdrawDetails.method}
                            onChange={(e) => setWithdrawDetails({...withdrawDetails, method: e.target.value})}
                            className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white">
                            <option value="bank_transfer" className="bg-[#0E1524]">Nigerian Bank Transfer</option>
                            <option value="paypal" className="bg-[#0E1524]">PayPal Email</option>
                            <option value="crypto" className="bg-[#0E1524]">Cryptocurrency Address (BTC/USDT)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Payment Coordinates / Account Info</label>
                        <textarea 
                          id="withdraw-coords-input"
                          placeholder="Sterling Bank | Account: 0098765432 or paypal@domain.com or USDT Address"
                          value={withdrawDetails.credentials}
                          onChange={(e) => setWithdrawDetails({...withdrawDetails, credentials: e.target.value})}
                          rows={2}
                          className="w-full bg-[#151D2F] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white"
                          required
                        />
                      </div>

                      <button 
                        id="submit-withdraw-btn"
                        type="submit" 
                        disabled={loadingWithdraw}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition duration-150">
                        {loadingWithdraw ? 'Processing request...' : 'REQUEST COMMISSION PAYOUT'}
                      </button>

                    </form>

                  </div>

                </div>

              </div>
            )}

            {/* SECTION: FAQS COLLAPSIBLE EXPLORER */}
            {activeTab === 'faq' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Header promo card banner */}
                <div className="bg-gradient-to-r from-purple-900/10 via-[#101726] to-indigo-900/10 p-6 rounded-2xl border border-gray-800 shadow-xl text-left">
                  <h2 className="text-sm font-black text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400 animate-pulse" />
                    eclassiqnum Knowledge & Assistance Base
                  </h2>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Search or browse through comprehensive answers to understand our virtual verification systems, refund policies, and routing.
                  </p>
                </div>

                {/* Grid categories layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                  
                  {/* Left list of categories */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-[#101726] border border-gray-800 rounded-2xl p-5 space-y-4">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">💡 Quick Help Rules</h3>
                      <div className="space-y-3 font-sans text-xs text-gray-400">
                        <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/10 space-y-1">
                          <span className="font-bold text-purple-300 block text-[11px]">📞 20-Minutes Active Window</span>
                          <span className="leading-relaxed block text-[10px]">Your purchased Virtual normal lines stay open for up to 20 minutes to receive confirmations securely.</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/10 space-y-1">
                          <span className="font-bold text-emerald-300 block text-[11px]">💸 Zero Loss Guarantee</span>
                          <span className="leading-relaxed block text-[10px]">If no SMS OTP is received, clicking the cancel button triggers an instant, automatic wallet refund.</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-950/25 border border-indigo-500/10 space-y-1">
                          <span className="font-bold text-indigo-300 block text-[11px]">📲 Receive Multiple OTPs</span>
                          <span className="leading-relaxed block text-[10px]">Yes, within that 20-minute window, you can request and receive multiple verification OTP messages from your designated service!</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle and Right list of main collapsible FAQs */}
                  <div className="lg:col-span-2 space-y-3.5">
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-widest pl-1">📋 General Reference Questions</h3>
                    
                    {[
                      {
                        q: "How does the active OTP number system work?",
                        a: "We route numbers dynamically through multiple regional telecom gateways. This lets you access temporary phone numbers from countries worldwide to verify services like WhatsApp, Google, Telegram, Facebook, etc., without putting your personal cell number at risk."
                      },
                      {
                        q: "Can I receive more than one verification SMS on a Virtual OTP Number?",
                        a: "Yes! While the line is active (during the 20-minute lease window) and prior to manual closure or timeout, you can trigger and receive multiple verification codes from the same service. This makes solving multi-step or verification retries extremely seamless."
                      },
                      {
                        q: "How fast do verification codes arrive?",
                        a: "On average, verification transmissions land visually within 20 to 90 seconds. We poll carrier nodes dynamically every 8 seconds. If a code is delayed or fails due to network carriers, cancel the line to instantly recover the purchase price."
                      },
                      {
                        q: "Explain how automated refunds protect my wallet balance.",
                        a: "In eclassiqnum, we believe in paying only for what works. If your purchased line expires or you manually cancel an order prior to receiving any SMS code, our servers immediately credit the complete amount back to your wallet ledger instantly."
                      },
                      {
                        q: "How do I secure an extended, multi-day subscription line?",
                        a: "For lines that stay active for several days or weeks, use our 'Rent a Number' tab. This lets you rent long-term subscriptions to receive continuous verifications from multiple independent services simultaneously."
                      },
                      {
                        q: "What methods can I use to fund my wallet?",
                        a: "You can instantly fund your eclassiqnum balance using Naira card deposits through Paystack, direct automated bank transfers, or cryptocurrency (USDT/BTC/LTC) automated settlement gateways."
                      },
                      {
                        q: "What is the Affiliate Partner program model?",
                        a: "Once registered, eclassiqnum assigns you a specialized referral address in the 'Affiliate' tab. Share this link! For every single deposit your referred users pay into their wallets, 10% lifetime commission is stored in a separate withdrawable affiliate vault under your profile."
                      },
                      {
                        q: "Is eclassiqnum legal to use for security and privacy protection?",
                        a: "Yes. Using virtual mobile nodes to mask your identity from corporate stalkers and telemetry databases is completely legal and highly recommended to bypass bulk marketing lists."
                      },
                      {
                        q: "How do I trigger an manual commission payout?",
                        a: "Head to the Affiliate section, type in your desired withdrawal volume (and coordinates like Account number or Paypal mail) and hit Request. Payouts are manually approved and released within a 24-hour cycle."
                      },
                      {
                        q: "What should I do if my bank transfer deposit is delayed?",
                        a: "Since we rely on automated webhooks, transfers usually settle within 2 minutes. In rare cases where networks fail, open the support center widget or open a support ticket with your checkout reference code, and an agent will manually credit your account!"
                      }
                    ].map((faq, idx) => (
                      <details key={idx} className="group p-4 bg-[#101726] border border-gray-800 rounded-xl transition duration-150">
                        <summary className="flex items-center justify-between cursor-pointer focus:outline-none list-none select-none">
                          <span className="text-xs font-bold text-gray-200 group-open:text-purple-400 transition-colors duration-150 pr-4">{faq.q}</span>
                          <span className="text-[10px] text-gray-500 font-extrabold group-open:rotate-180 transition-transform duration-200 shrink-0">▼</span>
                        </summary>
                        <div className="mt-3 text-[11px] text-gray-400 leading-relaxed pt-3 border-t border-gray-800 font-sans">
                          {faq.a}
                        </div>
                      </details>
                    ))}

                  </div>

                </div>

              </div>
            )}

            {/* SECTION 4: COMPLETE ADMIN CONTROL DASHBOARD */}
            {activeTab === 'admin' && adminReport && (
              <div className="space-y-6">
                
                {/* Admin Report Metrics counts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#11192B] border border-indigo-500/30 p-4 rounded-xl">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Total Users Joined</span>
                    <span className="text-xl font-black text-white mt-1 block">{adminReport.metrics.totalUsers}</span>
                  </div>
                  <div className="bg-[#11192B] border border-indigo-500/30 p-4 rounded-xl">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Total Deposited Revenues</span>
                    <span className="text-xl font-black text-emerald-400 mt-1 block">₦{adminReport.metrics.totalRevenueNgn.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#11192B] border border-indigo-500/30 p-4 rounded-xl">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Total Virtual Orders</span>
                    <span className="text-xl font-black text-white mt-1 block">{adminReport.metrics.totalOrdersCount}</span>
                  </div>
                  <div className="bg-[#11192B] border border-indigo-500/30 p-4 rounded-xl">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Est Platform Net Profit</span>
                    <span className="text-xl font-black text-emerald-400 mt-1 block">₦{adminReport.metrics.estimatedProfitNgn.toLocaleString()}</span>
                  </div>
                </div>

                {/* 4.0 Enhanced Admin Charts Board */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Chart: Revenue and Profit Growth */}
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800/60 pb-3">
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Revenue & Estimated Net Profit Trends</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-sans">Simulating daily business cash flows across standard routing nodes</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded font-mono font-bold">
                        +25.8% MoM
                      </span>
                    </div>

                    {/* SVG Chart area */}
                    <div className="relative h-44 w-full">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                        <div className="border-t border-gray-800 w-full"></div>
                        <div className="border-t border-gray-800 w-full"></div>
                        <div className="border-t border-gray-800 w-full"></div>
                        <div className="border-t border-gray-800 w-full"></div>
                      </div>

                      {/* Interactive SVG Chart */}
                      <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 500 150">
                        {/* Gradients */}
                        <defs>
                          <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Revenue Area (Green) */}
                        <path 
                          d="M0,150 L0,120 L80,95 L160,110 L240,65 L320,80 L400,35 L480,20 L500,20 L500,150 Z" 
                          fill="url(#revenueGrad)" 
                        />
                        <path 
                          d="M0,120 L80,95 L160,110 L240,65 L320,80 L400,35 L480,20 L500,20" 
                          fill="none" 
                          stroke="#10B981" 
                          strokeWidth="2.5" 
                        />

                        {/* Profit Area (Purple/Blue) */}
                        <path 
                          d="M0,150 L0,140 L80,125 L160,135 L240,110 L320,120 L400,95 L480,85 L500,85 L500,150 Z" 
                          fill="url(#profitGrad)" 
                        />
                        <path 
                          d="M0,140 L80,125 L160,135 L240,110 L320,120 L400,95 L480,85 L500,85" 
                          fill="none" 
                          stroke="#6366F1" 
                          strokeWidth="2.5" 
                        />

                        {/* Points Group */}
                        <g>
                          <circle cx="80" cy="95" r="3.5" fill="#10B981" stroke="#0B0F19" strokeWidth="1.5" />
                          <circle cx="240" cy="65" r="3.5" fill="#10B981" stroke="#0B0F19" strokeWidth="1.5" />
                          <circle cx="400" cy="35" r="3.5" fill="#10B981" stroke="#0B0F19" strokeWidth="1.5" />
                          <circle cx="480" cy="20" r="3.5" fill="#10B981" stroke="#0B0F19" strokeWidth="1.5" />
                          
                          <circle cx="80" cy="125" r="3.5" fill="#6366F1" stroke="#0B0F19" strokeWidth="1.5" />
                          <circle cx="240" cy="110" r="3.5" fill="#6366F1" stroke="#0B0F19" strokeWidth="1.5" />
                          <circle cx="400" cy="95" r="3.5" fill="#6366F1" stroke="#0B0F19" strokeWidth="1.5" />
                          <circle cx="480" cy="85" r="3.5" fill="#6366F1" stroke="#0B0F19" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>

                    {/* Chart Legend Labels */}
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Total Revenue flow</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Platform Net profit</span>
                      </div>
                      <span>Period: Last 15 Days</span>
                    </div>
                  </div>

                  {/* Right Chart: Provider Volume Allocation & Delivery Success */}
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800/60 pb-3">
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">SMS Provider Allocation Share</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-sans">Active message counts handled per routing node</p>
                      </div>
                      <span className="text-[10px] text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-1 rounded font-mono font-bold">
                        Auto Optimized
                      </span>
                    </div>

                    {/* Progress representation metrics instead */}
                    <div className="space-y-3 pt-1">
                      {[
                        { name: "SmsActivate Platform (Main Gateway)", value: 58, success: 94 },
                        { name: "SmsReceive Backup Hub", value: 27, success: 91 },
                        { name: "Direct SIM Server Farm Pool", value: 15, success: 97 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-1 text-left">
                          <div className="flex justify-between items-center text-[11px] font-sans font-medium">
                            <span className="text-gray-350">{item.name}</span>
                            <span className="text-white font-bold font-mono text-[10px]">{item.value}% volume <span className="text-gray-500 font-normal">({item.success}% success)</span></span>
                          </div>
                          <div className="w-full bg-[#151D2F] h-2 rounded-full overflow-hidden border border-gray-800">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${index === 0 ? 'from-[#4F46E5] to-[#818CF8]' : index === 1 ? 'from-indigo-650 to-indigo-500' : 'from-emerald-500 to-teal-450'}`}
                              style={{ width: `${item.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] text-gray-400 italic font-medium pt-1 text-left">
                      💡 <strong>Routing Rule:</strong> Traffic instantly switches weight priority in real-time when latency spikes.
                    </div>
                  </div>
                </div>

                {/* Sub configuration options grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* 4.1 Real-Time Manual Wallet Funding & Credits override */}
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl max-h-96 overflow-y-auto">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">Adjust User Balance (Manual Override)</h4>
                    <form onSubmit={handleAdminWalletAdjust} className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-450">Target User ID</label>
                        <select 
                          id="admin-adjust-user-select"
                          value={manualWalletData.targetUserId}
                          onChange={(e) => setManualWalletData({...manualWalletData, targetUserId: e.target.value})}
                          className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white rounded p-2" required>
                          <option value="">Select Target User</option>
                          {adminUsers.map(u => (
                            <option key={u.id} value={u.id}>({u.name}) - {u.email}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-450">Amount</label>
                          <input 
                            id="admin-adjust-amount"
                            type="number" 
                            placeholder="e.g. 1000"
                            value={manualWalletData.amount}
                            onChange={(e) => setManualWalletData({...manualWalletData, amount: e.target.value})}
                            className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white p-2" required />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-450">Currency</label>
                          <select 
                            id="admin-adjust-currency"
                            value={manualWalletData.currency}
                            onChange={(e) => setManualWalletData({...manualWalletData, currency: e.target.value as any})}
                            className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white p-2">
                            <option value="NGN">NGN (₦)</option>
                            <option value="USD">USD ($)</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-450">Action</label>
                          <select 
                            id="admin-adjust-action"
                            value={manualWalletData.action}
                            onChange={(e) => setManualWalletData({...manualWalletData, action: e.target.value})}
                            className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white p-2">
                            <option value="credit">Manual Credit (+)</option>
                            <option value="debit">Manual Debit (-)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-450">Remark Reason</label>
                          <input 
                            id="admin-adjust-remark"
                            type="text" 
                            value={manualWalletData.remark}
                            onChange={(e) => setManualWalletData({...manualWalletData, remark: e.target.value})}
                            className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white p-2" />
                        </div>
                      </div>
                      <button 
                        id="submit-admin-adjust-btn"
                        type="submit" 
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded transition mt-2">
                        EXECUTE OVERRIDE ADJUSTMENT
                      </button>
                    </form>
                  </div>

                  {/* 4.2 Promos creator dashboard */}
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl max-h-96 overflow-y-auto">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Configure Promo Bonus Codes</h4>
                    <form onSubmit={handleAdminPromoCreate} className="space-y-3 mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-400">Coupon Name</label>
                          <input 
                            id="admin-promo-code"
                            type="text" 
                            placeholder="e.g. BONANZA"
                            value={newPromoData.code}
                            onChange={(e) => setNewPromoData({...newPromoData, code: e.target.value})}
                            className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white p-2" required />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400">Bonus Discount %</label>
                          <input 
                            id="admin-promo-percent"
                            type="number" 
                            value={newPromoData.discount}
                            onChange={(e) => setNewPromoData({...newPromoData, discount: e.target.value})}
                            className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white p-2" required />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Max Limit usages (Users count)</label>
                        <input 
                          id="admin-promo-limit"
                          type="number" 
                          value={newPromoData.maxUses}
                          onChange={(e) => setNewPromoData({...newPromoData, maxUses: e.target.value})}
                          className="w-full bg-[#151D2F] border border-gray-800 text-xs text-white p-2" required />
                      </div>
                      <button 
                        id="submit-admin-promo-btn"
                        type="submit" 
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded transition">
                        CREATE SYSTEM PROMO
                      </button>
                    </form>
                    
                    {/* Active dynamic list */}
                    <div className="space-y-2">
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Active System Coupons</p>
                      {adminPromos.map((p, idx) => (
                        <div key={idx} className="p-2 bg-[#151D2F] rounded text-[11px] font-mono flex justify-between items-center text-gray-450 border border-gray-800">
                          <span className="font-bold text-white">{p.code}</span>
                          <span>{p.discountPercent}% Bonus ({p.usesCount}/{p.maxUses})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4.3 Multi-provider Abstraction Layer & Priority health weights */}
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Automated Smart Provider Routing System</h4>
                      <p className="text-[11px] text-gray-400 leading-normal mb-3 font-sans">
                        Afrinum routes numbers dynamically by evaluating provider weight scores (priority weighting + delivery success rates - latency overhead):
                      </p>
                      <div className="space-y-2">
                        {adminReport.providers.map((p: any) => (
                          <div key={p.id} className="p-3 bg-[#151D2F] rounded-xl border border-gray-800 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-white">{p.name}</span>
                              <button 
                                id={`toggle-provider-${p.id}`}
                                onClick={() => toggleAdminProviderStatus(p.id, p.isActive)} 
                                className="text-purple-400">
                                {p.isActive ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5 text-gray-600" />}
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-1 text-[9px] text-gray-500 font-mono">
                              <span>Success: <code className="text-emerald-400 font-semibold">{p.successRate}%</code></span>
                              <span>Speed: <code className="text-indigo-400 font-semibold">{p.latencyMs}ms</code></span>
                              <span>Priority: <code className="text-purple-400 font-semibold">{p.priority}w</code></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 p-2.5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
                      <span className="text-[10px] text-indigo-300 block font-bold leading-none mb-1">ZERO INTERVENTION SYSTEM</span>
                      <p className="text-[9px] text-gray-400">If primary default is marked offline or deliverability rate drops, API automatically fails over to SmsActivate or SmsReceive paths.</p>
                    </div>
                  </div>

                </div>

                {/* 4.7 Dynamic Countries and Services Catalogues Administration Node Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  
                  {/* Left Column: Countries catalog */}
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Global Country Nodes Catalog</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-mono">Customize active locations, base pricing & routing availability</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-indigo-950/40 text-[10px] text-indigo-400 border border-indigo-500/10 font-mono font-bold">
                        {adminCountries.filter(c => c.active !== false).length} Active
                      </span>
                    </div>

                    {/* Search Board */}
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                      <input 
                        id="admin-country-search"
                        type="text"
                        placeholder="Search country catalog by name or code..."
                        value={adminCountryQuery}
                        onChange={(e) => setAdminCountryQuery(e.target.value)}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition shadow-inner"
                      />
                    </div>

                    {/* Quick Adding Segment */}
                    <form onSubmit={handleCreateCountry} className="p-4 bg-[#151D2F] rounded-xl border border-gray-800/60 space-y-3">
                      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Add Custom Country Support Node</span>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-2">
                          <label className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Country Name</label>
                          <input 
                            type="text"
                            placeholder="e.g. Ghana"
                            value={adminNewCountry.name}
                            onChange={(e) => setAdminNewCountry({...adminNewCountry, name: e.target.value})}
                            className="w-full bg-[#101726] text-white rounded border border-gray-800 p-1.5 text-xs outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-500 uppercase font-bold block mb-1">ISO Code</label>
                          <input 
                            type="text"
                            placeholder="e.g. GH"
                            value={adminNewCountry.code}
                            maxLength={3}
                            onChange={(e) => setAdminNewCountry({...adminNewCountry, code: e.target.value})}
                            className="w-full bg-[#101726] text-white rounded border border-gray-800 p-1.5 text-xs text-center outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Flag</label>
                          <input 
                            type="text"
                            placeholder="🇬🇭"
                            value={adminNewCountry.flag}
                            onChange={(e) => setAdminNewCountry({...adminNewCountry, flag: e.target.value})}
                            className="w-full bg-[#101726] text-white rounded border border-gray-800 p-1.5 text-xs text-center outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <label className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Base Cost (USD)</label>
                          <input 
                            type="number"
                            step="0.01"
                            placeholder="0.30"
                            value={adminNewCountry.baseCostUsd}
                            onChange={(e) => setAdminNewCountry({...adminNewCountry, baseCostUsd: e.target.value})}
                            className="w-full bg-[#101726] text-white rounded border border-gray-800 p-1.5 text-xs outline-none focus:border-indigo-500"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition">
                          Add Node
                        </button>
                      </div>
                    </form>

                    {/* Interactive matched lists */}
                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                      {adminCountries
                        .filter(c => 
                          c.name.toLowerCase().includes(adminCountryQuery.toLowerCase()) || 
                          c.code.toLowerCase().includes(adminCountryQuery.toLowerCase())
                        ).map((c) => {
                          const sysConfig = adminConfig || { globalMarkupPercent: 35, nairaToDollarRate: 1550 };
                          const userUsd = c.baseCostUsd * (1 + sysConfig.globalMarkupPercent / 100);
                          const userNgn = userUsd * sysConfig.nairaToDollarRate;
                          const isActive = c.active !== false;
                          
                          return (
                            <div key={c.code} className="p-3 bg-[#151D2F] rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-xl shrink-0">{c.flag}</span>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-white">{c.name}</span>
                                    <span className="font-mono text-[9px] text-gray-500 bg-gray-800 px-1 rounded uppercase">{c.code}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    Retail: <span className="text-emerald-450 font-black">${userUsd.toFixed(2)} / ₦{userNgn.toFixed(0)}</span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 justify-between md:justify-end">
                                <div className="flex items-center gap-1">
                                  <span className="text-[9px] text-gray-500 font-mono">Base($):</span>
                                  <input 
                                    type="number"
                                    step="0.01"
                                    value={c.baseCostUsd}
                                    onChange={(e) => {
                                      const val = parseFloat(e.target.value);
                                      if (!isNaN(val) && val >= 0) {
                                        handleUpdateCountryPrice(c.code, isActive, val);
                                      }
                                    }}
                                    className="w-16 bg-[#101726] border border-gray-800 rounded p-1 text-[11px] font-mono text-center text-indigo-400 outline-none focus:border-indigo-500"
                                  />
                                </div>
                                <button 
                                  onClick={() => handleToggleCountryActive(c.code, isActive, c.baseCostUsd)}
                                  className="text-purple-400 focus:outline-none shrink-0"
                                  title={isActive ? 'Deactivate country node' : 'Activate country node'}>
                                  {isActive ? (
                                    <ToggleRight className="w-5 h-5 text-emerald-400" />
                                  ) : (
                                    <ToggleLeft className="w-5 h-5 text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Right Column: Services catalog */}
                  <div className="bg-[#101726] border border-gray-800 p-5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">SMS Channels Directory</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-mono">Control base markup weights & active brands directory</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-purple-950/40 text-[10px] text-purple-400 border border-purple-500/10 font-mono font-bold">
                        {adminServices.filter(s => s.active !== false).length} Configured
                      </span>
                    </div>

                    {/* Search Board */}
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                      <input 
                        id="admin-service-search"
                        type="text"
                        placeholder="Search service brands catalog by name or key..."
                        value={adminServiceQuery}
                        onChange={(e) => setAdminServiceQuery(e.target.value)}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-purple-500 transition shadow-inner"
                      />
                    </div>

                    {/* Quick Adding Segment */}
                    <form onSubmit={handleCreateService} className="p-4 bg-[#151D2F] rounded-xl border border-gray-800/60 space-y-3">
                      <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">Deploy Custom App Verification Channel</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Service Name</label>
                          <input 
                            type="text"
                            placeholder="e.g. OpenAI"
                            value={adminNewService.name}
                            onChange={(e) => setAdminNewService({...adminNewService, name: e.target.value})}
                            className="w-full bg-[#101726] text-white rounded border border-gray-800 p-1.5 text-xs outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Service key/id</label>
                          <input 
                            type="text"
                            placeholder="e.g. openai"
                            value={adminNewService.id}
                            onChange={(e) => setAdminNewService({...adminNewService, id: e.target.value})}
                            className="w-full bg-[#101726] text-white rounded border border-gray-800 p-1.5 text-xs outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <label className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Base Profit Markup (%)</label>
                          <input 
                            type="number"
                            placeholder="15"
                            value={adminNewService.baseMarkup}
                            onChange={(e) => setAdminNewService({...adminNewService, baseMarkup: e.target.value})}
                            className="w-full bg-[#101726] text-white rounded border border-gray-800 p-1.5 text-xs outline-none focus:border-purple-500"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition">
                          Deploy Module
                        </button>
                      </div>
                    </form>

                    {/* Interactive matched lists */}
                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                      {adminServices
                        .filter(s => 
                          s.name.toLowerCase().includes(adminServiceQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(adminServiceQuery.toLowerCase())
                        ).map((s) => {
                          const isActive = s.active !== false;
                          
                          return (
                            <div key={s.id} className="p-3 bg-[#151D2F] rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-purple-950/20 border border-purple-500/10 shrink-0">
                                  <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-white">{s.name}</span>
                                    <span className="font-mono text-[9px] text-gray-500 bg-gray-800 px-1 rounded uppercase">{s.id}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    Profit weight: <span className="text-purple-400 font-bold">+{s.baseMarkup}%</span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 justify-between md:justify-end">
                                <div className="flex items-center gap-1">
                                  <span className="text-[9px] text-gray-500 font-mono">Markup(%):</span>
                                  <input 
                                    type="number"
                                    value={s.baseMarkup}
                                    onChange={(e) => {
                                      const val = parseFloat(e.target.value);
                                      if (!isNaN(val) && val >= 0) {
                                        handleUpdateServiceMarkup(s.id, isActive, val);
                                      }
                                    }}
                                    className="w-16 bg-[#101726] border border-gray-800 rounded p-1 text-[11px] font-mono text-center text-purple-400 outline-none focus:border-purple-500"
                                  />
                                </div>
                                <button 
                                  onClick={() => handleToggleServiceActive(s.id, isActive, s.baseMarkup)}
                                  className="text-purple-400 focus:outline-none shrink-0"
                                  title={isActive ? 'Deactivate service channel' : 'Activate service channel'}>
                                  {isActive ? (
                                    <ToggleRight className="w-5 h-5 text-emerald-400" />
                                  ) : (
                                    <ToggleLeft className="w-5 h-5 text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                </div>

                {/* 4.4 Settings Controls Area */}
                {adminConfig && (
                  <form onSubmit={handleSaveAdminConfig} className="bg-[#101726] p-5 border border-gray-800 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider border-b border-gray-800 pb-2 mb-2">System Configs & Gateways Credentials Toggles</h4>
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Global Mark-Up Markup (%)</label>
                      <input 
                        id="config-markup"
                        type="number" 
                        value={adminConfig.globalMarkupPercent} 
                        onChange={(e) => setAdminConfig({...adminConfig, globalMarkupPercent: parseInt(e.target.value)})}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Naira To Dollar Benchmark Swap rate</label>
                      <input 
                        id="config-rate"
                        type="number" 
                        value={adminConfig.nairaToDollarRate} 
                        onChange={(e) => setAdminConfig({...adminConfig, nairaToDollarRate: parseInt(e.target.value)})}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Affiliate Share Commission %</label>
                      <input 
                        id="config-affiliate-commission"
                        type="number" 
                        value={adminConfig.affiliateCommissionPercent} 
                        onChange={(e) => setAdminConfig({...adminConfig, affiliateCommissionPercent: parseInt(e.target.value)})}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Hero SMS Integration Key</label>
                      <input 
                        id="config-hero-apikey"
                        type="password" 
                        value={adminConfig.heroSmsApiKey} 
                        onChange={(e) => setAdminConfig({...adminConfig, heroSmsApiKey: e.target.value})}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded p-2 text-xs text-white" />
                    </div>
                    <div className="md:col-span-4 flex justify-end gap-2">
                      <div className="flex gap-4 items-center">
                        <label className="text-xs text-gray-400 flex items-center gap-1">
                          <input 
                            id="tg-paystack"
                            type="checkbox" 
                            checked={adminConfig.paystackEnabled} 
                            onChange={(e) => setAdminConfig({...adminConfig, paystackEnabled: e.target.checked})} />
                          Paystack Gate
                        </label>
                        <label className="text-xs text-gray-400 flex items-center gap-1">
                          <input 
                            id="tg-crypto"
                            type="checkbox" 
                            checked={adminConfig.cryptoEnabled} 
                            onChange={(e) => setAdminConfig({...adminConfig, cryptoEnabled: e.target.checked})} />
                          Crypto Gate
                        </label>
                      </div>
                      <button 
                        id="save-config-btn"
                        type="submit" 
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded transition">
                        SAVE SETTINGS CONFIG
                      </button>
                    </div>
                  </form>
                )}

                {/* 4.5 Registered users table database */}
                <div className="bg-[#101726] border border-gray-800 rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-3 mb-4">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Registered User Accounts Database Directory</h4>
                    
                    {/* Search box filters users directory list items */}
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 text-gray-650 w-3.5 h-3.5" />
                      <input
                        id="admin-user-search"
                        type="text"
                        placeholder="Search users name, email..."
                        value={searchUserQuery}
                        onChange={(e) => setSearchUserQuery(e.target.value)}
                        className="w-full bg-[#151D2F] border border-gray-800 rounded-lg pl-8 p-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-800/80 text-gray-500 font-medium uppercase text-[10px]">
                          <th className="pb-2.5">User Target Details</th>
                          <th className="pb-2.5">Wallet Balance NGN</th>
                          <th className="pb-2.5">Wallet Balance USD</th>
                          <th className="pb-2.5">Promo Affiliate Share</th>
                          <th className="pb-2.5">Reference By</th>
                          <th className="pb-2.5">Status Info</th>
                          <th className="pb-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/40 text-gray-300">
                        {adminUsers.filter(u => {
                          const query = searchUserQuery.toLowerCase();
                          return u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query) || u.id.includes(query);
                        }).map((sysU) => (
                          <tr key={sysU.id} className="hover:bg-gray-800/10 transition">
                            <td className="py-3">
                              <span className="block font-bold text-white text-[12px]">{sysU.name}</span>
                              <span className="block text-gray-500 text-[10px] font-mono">{sysU.email} • ID: {sysU.id}</span>
                            </td>
                            <td className="py-3 font-mono font-medium">₦{sysU.walletBalanceNgn.toLocaleString()}</td>
                            <td className="py-3 font-mono font-medium">${sysU.walletBalanceUsd.toFixed(2)}</td>
                            <td className="py-3 font-mono">
                              <span className="block text-emerald-400">₦{sysU.affiliateEarningsNgn.toFixed(0)}</span>
                              <span className="block text-gray-500 text-[9px]">${sysU.affiliateEarningsUsd.toFixed(1)}</span>
                            </td>
                            <td className="py-3 font-mono text-[10px] text-gray-400">{sysU.referredBy || 'None'}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${sysU.status === 'active' ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
                                {sysU.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              {sysU.role !== 'super_admin' && (
                                <button 
                                  id={`toggle-user-status-${sysU.id}`}
                                  onClick={() => toggleUserStatus(sysU.id)}
                                  className={`px-3 py-1 rounded text-[10px] font-semibold transition ${sysU.status === 'active' ? 'bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/60' : 'bg-green-950/40 border border-green-500/20 text-green-400 hover:bg-green-950/80'}`}>
                                  {sysU.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4.6 Complete Withdrawal process ledger list */}
                <div className="bg-[#101726] border border-gray-800 rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider border-b border-gray-800 pb-3 mb-3">Pending Affiliate Withdrawal and Disbursements</h4>
                  {adminWithdrawals.length === 0 ? (
                    <p className="text-xs text-center text-gray-500 py-6">No withdrawal payout request history ledger logs found in platform databases.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-gray-800 text-gray-500 text-[10px] uppercase font-mono">
                            <th className="pb-2">User Details</th>
                            <th className="pb-2">Requested Amount</th>
                            <th className="pb-2">Disbursement Channel</th>
                            <th className="pb-2">Coordinates / Wallet Targets</th>
                            <th className="pb-2">Current State</th>
                            <th className="pb-2 text-right">Approve/Reject actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {adminWithdrawals.map((wVal) => (
                            <tr key={wVal.id}>
                              <td className="py-2.5">
                                <span className="block text-white font-medium">{wVal.name}</span>
                                <span className="block text-gray-500 text-[10px]">{wVal.email}</span>
                              </td>
                              <td className="py-2.5 font-mono text-emerald-400 font-bold">
                                {wVal.currency === 'NGN' ? '₦' : '$'}{wVal.amount.toLocaleString()}
                              </td>
                              <td className="py-2.5 uppercase font-semibold text-[11px] text-gray-400">{wVal.method}</td>
                              <td className="py-2.5 font-mono text-white text-[11px] max-w-[200px] truncate">{wVal.details}</td>
                              <td className="py-2.5 text-xs text-gray-300">
                                <span className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${
                                  wVal.status === 'pending' ? 'bg-yellow-950 text-yellow-500' : wVal.status === 'approved' ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-500'
                                }`}>
                                  {wVal.status}
                                </span>
                              </td>
                              <td className="py-2.5 text-right">
                                {wVal.status === 'pending' && (
                                  <div className="flex justify-end gap-1.5">
                                    <button 
                                      id={`approve-with-${wVal.id}`}
                                      onClick={() => processAffiliateWithdrawRequest(wVal.id, 'approved')}
                                      className="px-2.5 py-1 rounded bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] transition">
                                      Pay Out
                                    </button>
                                    <button 
                                      id={`reject-with-${wVal.id}`}
                                      onClick={() => processAffiliateWithdrawRequest(wVal.id, 'rejected')}
                                      className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] transition">
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* PROFESSIONAL LIVE CENTERED SUPPORT CENTER MODAL */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0F1626] border border-gray-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden relative max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-purple-950/40 via-[#101726] to-indigo-950/40 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-purple-400 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Support Center</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">We're here to help</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSupportOpen(false)}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer flex items-center justify-center font-bold text-xs border border-gray-700 transform hover:scale-105 duration-100"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
              
              {/* Promo Banner or Important Tips */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-1 text-[9px] bg-purple-600 text-white font-mono uppercase tracking-widest font-black rounded-bl-lg">24/7</div>
                <h5 className="text-[11px] font-bold text-purple-300 flex items-center gap-1">💡 Real-Time OTP Resolving Rule</h5>
                <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
                  Did an OTP activation code fail to arrive? Just click the <strong>Cancel Line</strong> button next to your active order in the inbox to trigger an <strong>instant auto-refund</strong> back to your wallet balance.
                </p>
              </div>

              {/* Contact Nodes */}
              <div className="space-y-2 text-left">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">📞 Instant Customer Contact Channels</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <a
                    href="https://wa.me/2348169208316"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#091C15] border border-emerald-500/20 hover:border-emerald-500 transition flex items-center gap-3 cursor-pointer hover:bg-emerald-950/20 group"
                  >
                    <span className="text-3xl select-none transform group-hover:scale-110 duration-150">💬</span>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-[#6FC38C] tracking-widest font-mono">WhatsApp Support</span>
                      <span className="block text-sm font-black text-white hover:text-emerald-300 transition">+234 8169208316</span>
                    </div>
                  </a>
                  <a
                    href="mailto:eclassiqnum@gmail.com"
                    className="p-4 rounded-xl bg-[#0B1528] border border-blue-500/20 hover:border-blue-500 transition flex items-center gap-3 cursor-pointer hover:bg-blue-950/20 group"
                  >
                    <span className="text-3xl select-none transform group-hover:scale-110 duration-150">✉️</span>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-indigo-300 tracking-widest font-mono">Email Support desk</span>
                      <span className="block text-sm font-black text-white hover:text-blue-300 transition">eclassiqnum@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Interactive Collapsible FAQ Area */}
              <div className="space-y-3.5 text-left">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">❓ Frequently Asked Questions</h4>
                <div className="space-y-2.5">
                  {[
                    {
                      q: "How do I fund my wallet?",
                      a: 'Go to the Wallet page and click "Fund Wallet". We accept card payments via Paystack. Funds are added instantly.'
                    },
                    {
                      q: "What is a virtual number?",
                      a: "A virtual number is a temporary phone number you can use to receive OTPs for any online service - without sharing your real number."
                    },
                    {
                      q: "How long does a virtual number last?",
                      a: "Virtual numbers are active for 20 minutes. If no OTP arrives within that window, your wallet is automatically refunded."
                    },
                    {
                      q: "Will I get a refund if no OTP is received?",
                      a: "Yes. If your virtual number expires without receiving an OTP, we automatically refund the full amount to your wallet. You can also cancel early for a refund."
                    },
                    {
                      q: "What is the difference between a virtual number and a rented number?",
                      a: "Virtual numbers are for one-time OTP receipt (up to 20 min). Rented numbers last for days and can receive multiple SMS and calls."
                    },
                    {
                      q: "Which countries are supported for virtual numbers?",
                      a: "We support 50+ countries including Russia, Ukraine, USA, UK, Indonesia, India, and more. Browse the Virtual Numbers page for the full list."
                    },
                    {
                      q: "How long does it take to receive an OTP?",
                      a: "Most OTPs arrive within 1–3 minutes. We poll for new messages every 8 seconds and notify you instantly when one arrives."
                    },
                    {
                      q: "Can I use one number for multiple OTPs?",
                      a: "Virtual numbers receive one OTP and are then marked as complete. For multiple OTPs from the same service, purchase a new number each time."
                    },
                    {
                      q: "How do I contact support?",
                      a: "You can reach us via WhatsApp at +234 8169208316 or email eclassiqnum@gmail.com. We typically respond within a few hours."
                    }
                  ].map((faq, idx) => (
                    <details key={idx} className="group p-3.5 bg-[#141B2D] border border-gray-800/80 rounded-xl transition-all duration-200">
                      <summary className="flex items-center justify-between cursor-pointer focus:outline-none list-none select-none text-left">
                        <span className="text-xs font-bold text-gray-200 group-open:text-purple-400 transition-colors duration-150 pr-4">{faq.q}</span>
                        <span className="text-[10px] text-gray-500 font-extrabold group-open:rotate-180 transition-transform duration-200 shrink-0">▼</span>
                      </summary>
                      <div className="mt-2.5 text-[11px] text-gray-400 leading-relaxed pt-2.5 border-t border-gray-800/50 text-left animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Create a Support Ticket Form */}
              <form onSubmit={handleSubmitSupportTicket} className="space-y-4 pt-1 text-left">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">📝 Open an Official Support Ticket</h4>
                
                {/* Category Dropdown Selection */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400">Inquiry Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-[#151D2F] border border-gray-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-purple-500 transition-all font-semibold"
                  >
                    <option value="Payment Issue">NGN Deposit did not clear</option>
                    <option value="SMS Timeout">OTP Delayed / Code did not deliver</option>
                    <option value="API Setup">Developer API integration error</option>
                    <option value="General">Other inquiry</option>
                  </select>
                </div>

                {/* Ticket Subject Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400">Ticket Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your request..."
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full bg-[#151D2F] border border-gray-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-purple-500 transition-all font-medium"
                  />
                </div>

                {/* Ticket Description Area */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400">Detailed Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Specify payment reference code, exact virtual service id, and any parameters to accelerate resolution..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full bg-[#151D2F] border border-gray-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-purple-500 transition-all font-medium resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-650 hover:bg-purple-700 text-white font-bold text-xs transition duration-150 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Confirm Support Ticket Submit
                </button>
              </form>

              {/* Submitted Support Tickets Log Panel */}
              <div className="space-y-3 pt-3 border-t border-gray-800 text-left">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-between">
                  <span>📂 Your Closed/Pending Support Tickets ({supportTickets.length})</span>
                  <span className="text-[9px] text-gray-500 lowercase">active session state</span>
                </h4>

                {supportTickets.length === 0 ? (
                  <p className="text-[11px] text-gray-500 italic py-2">No previously submitted help desk tickets found for your profile session.</p>
                ) : (
                  <div className="space-y-3">
                    {supportTickets.map((tkt) => (
                      <div key={tkt.id} className="p-4 rounded-xl bg-[#11192A] border border-gray-800 space-y-2 animate-in slide-in-from-bottom duration-200 text-left">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono font-black text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/40">{tkt.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${tkt.status === 'resolved' ? 'bg-green-950 text-green-400' : 'bg-yellow-950 text-yellow-500'}`}>
                            {tkt.status}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-white leading-snug">{tkt.subject}</h5>
                        <p className="text-[10px] text-gray-400 leading-snug">{tkt.description}</p>
                        
                        {/* Ticket Replies render */}
                        {tkt.replies && tkt.replies.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-gray-800/60 p-2.5 rounded-lg bg-indigo-950/20 space-y-1">
                            <span className="block text-[8px] uppercase tracking-wider font-extrabold text-[#7CAFFF] text-left">eclassiqnum Support Team Statement:</span>
                            {tkt.replies.map((rep: string, rIdx: number) => (
                              <p key={rIdx} className="text-[10px] text-gray-300 font-medium leading-relaxed italic text-left">
                                &ldquo;{rep}&rdquo;
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
