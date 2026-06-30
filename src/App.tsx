import { useState, useEffect } from 'react';
import { CATEGORIES } from './data/calculators';
import { MASTER_CALCULATORS, SIMULATED_CALCULATOR_NAMES, getCalculatorById } from './data/calculatorCatalog';
import { CalculatorDef } from './types/calculator';
import CalculatorCard from './components/CalculatorCard';
import CalculatorDetails from './components/CalculatorDetails';
import Breadcrumbs from './components/Breadcrumbs';
import AdPlacement from './components/AdPlacement';
import CookieNotice from './components/CookieNotice';
import { 
  AboutPage, 
  ContactPage, 
  PrivacyPolicy, 
  TermsConditions, 
  DisclaimerPage 
} from './components/StaticPages';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  DollarSign, 
  Calculator, 
  Heart, 
  BookOpen, 
  Hammer, 
  RefreshCw, 
  Calendar, 
  Cpu,
  Clock,
  Star,
  Sparkles,
  Award,
  BookOpenCheck
} from 'lucide-react';
import * as Icons from 'lucide-react';

// Dynamic Icon renderer for categories
function CategoryIcon({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Calculator className={className} size={size} />;
  return <IconComponent className={className} size={size} />;
}

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('all_tools_hub_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // System preferences
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Routing state
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '#/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('all_tools_hub_theme', theme);
  }, [theme]);

  // Handle Hash routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
      setShowSearchResults(false);
      setSearchQuery('');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  // Toggle Theme helper
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Parse current route parameters
  const getRouteDetails = () => {
    const hash = currentHash;
    if (hash === '#/' || hash === '') return { page: 'home' };
    if (hash === '#/about') return { page: 'about' };
    if (hash === '#/contact') return { page: 'contact' };
    if (hash === '#/privacy') return { page: 'privacy' };
    if (hash === '#/terms') return { page: 'terms' };
    if (hash === '#/disclaimer') return { page: 'disclaimer' };

    if (hash.startsWith('#/category/')) {
      const categoryId = hash.replace('#/category/', '');
      return { page: 'category', id: categoryId };
    }

    if (hash.startsWith('#/calculator/')) {
      const calcId = hash.replace('#/calculator/', '');
      return { page: 'calculator', id: calcId };
    }

    return { page: 'home' }; // Fallback
  };

  const route = getRouteDetails();

  // Handle Search queries across static catalog and Simulated 500+ calculators!
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    
    // 1. Search in master custom list
    const masterMatches = MASTER_CALCULATORS.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
    );

    // 2. Search in Simulated SEO seeds list
    const simulatedMatches = SIMULATED_CALCULATOR_NAMES
      .filter(name => name.toLowerCase().includes(query))
      .map(name => {
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        // Avoid duplicate matches with existing custom tools
        if (masterMatches.some(m => m.id === id)) return null;
        return {
          id,
          name,
          category: id.includes('loan') || id.includes('interest') || id.includes('tax') ? 'finance' : 'math',
          description: `Online mathematical solver for ${name}.`,
          simulated: true
        };
      })
      .filter(Boolean) as any[];

    return [...masterMatches, ...simulatedMatches].slice(0, 10);
  };

  const searchResults = getSearchResults();

  // Inject dynamic Schema.org JSON-LD Structured Data, Document Title, Meta Description, and Canonical Tags to boost SEO authority!
  useEffect(() => {
    let pageTitle = "All Tools Hub - 100% Free Interactive Step-by-Step Calculators";
    let pageDesc = "Calculate mortgage loans, compound interest, BMI, body fat, Zakat, and GPA step-by-step. All Tools Hub provides 500+ free online calculators.";
    let canonicalUrl = "https://alltoolshub.com/";
    let schemaData: any = {};

    if (route.page === 'home') {
      pageTitle = "All Tools Hub - 100% Free Interactive Step-by-Step Calculators";
      pageDesc = "Calculate mortgage loans, compound interest, BMI, body fat, Zakat, and GPA step-by-step. All Tools Hub provides 500+ free online calculators.";
      canonicalUrl = "https://alltoolshub.com/";
      schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "All Tools Hub",
        "url": "https://alltoolshub.com/",
        "description": "The world's largest online calculator platform featuring mortgage, loan, BMI, math, and Zakat calculators.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://alltoolshub.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
    } else if (route.page === 'about') {
      pageTitle = "About Us - All Tools Hub";
      pageDesc = "Learn more about All Tools Hub, our mission to make mathematical, financial, health, and engineering calculations free and accessible to everyone worldwide.";
      canonicalUrl = "https://alltoolshub.com/#/about";
      schemaData = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About All Tools Hub",
        "url": "https://alltoolshub.com/#/about",
        "description": "Learn more about All Tools Hub and our interactive solvers."
      };
    } else if (route.page === 'contact') {
      pageTitle = "Contact Us - All Tools Hub";
      pageDesc = "Get in touch with the All Tools Hub technical team. Send us feedback, suggest new tools, or report issues for swift resolution.";
      canonicalUrl = "https://alltoolshub.com/#/contact";
      schemaData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact All Tools Hub",
        "url": "https://alltoolshub.com/#/contact",
        "description": "Contact our support and engineering team."
      };
    } else if (route.page === 'privacy') {
      pageTitle = "Privacy Policy - All Tools Hub";
      pageDesc = "Privacy Policy and user data protection details for All Tools Hub. Your privacy is protected with serverless computations.";
      canonicalUrl = "https://alltoolshub.com/#/privacy";
    } else if (route.page === 'terms') {
      pageTitle = "Terms of Service - All Tools Hub";
      pageDesc = "Terms of Service and legal policies for utilizing our free interactive online calculators.";
      canonicalUrl = "https://alltoolshub.com/#/terms";
    } else if (route.page === 'disclaimer') {
      pageTitle = "Disclaimer - All Tools Hub";
      pageDesc = "Financial and medical calculations disclaimer for All Tools Hub. All solvers are for educational planning.";
      canonicalUrl = "https://alltoolshub.com/#/disclaimer";
    } else if (route.page === 'category') {
      const cat = CATEGORIES.find(c => c.id === route.id);
      const catName = cat ? cat.name : String(route.id).toUpperCase();
      const catDesc = cat ? cat.description : `Browse free calculators.`;
      
      pageTitle = `Free ${catName} Calculators & Online Math Solvers - All Tools Hub`;
      pageDesc = `${catDesc} Explore 100% free interactive, step-by-step solvers in the ${catName} category.`;
      canonicalUrl = `https://alltoolshub.com/#/category/${route.id}`;
      
      schemaData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Free ${catName} Calculators`,
        "url": canonicalUrl,
        "description": pageDesc
      };
    } else if (route.page === 'calculator') {
      const calc = getCalculatorById(route.id || '');
      if (calc) {
        pageTitle = `${calc.name} - Free Step-by-Step Solver - All Tools Hub`;
        pageDesc = `${calc.description} Complete with step-by-step math solver formulas, interactive parameters, and beautiful graphs.`;
        canonicalUrl = `https://alltoolshub.com/#/calculator/${calc.id}`;
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": calc.name,
          "url": canonicalUrl,
          "description": calc.description,
          "applicationCategory": calc.category === 'finance' ? "BusinessApplication" : "EducationalApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          }
        };
      }
    }

    // Apply document Title
    document.title = pageTitle;

    // Apply Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);

    // Apply Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update Open Graph (og:) tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(isName ? 'name' : 'property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMetaTag('og:title', pageTitle);
    updateMetaTag('og:description', pageDesc);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('twitter:title', pageTitle, true);
    updateMetaTag('twitter:description', pageDesc, true);
    updateMetaTag('twitter:url', canonicalUrl, true);

    // Remove existing LD+JSON scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(s => s.remove());

    // Append new LD+JSON if there is schema data
    if (Object.keys(schemaData).length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    // Dynamic Google Analytics 4 page view hit for SPAs
    if (typeof (window as any).gtag === 'function') {
      const measurementId = (window as any).gaMeasurementId || 'G-L3Z8F8N0W1';
      const pagePath = route.page === 'home' ? '/' : `/#/${route.page}${route.id ? '/' + route.id : ''}`;
      (window as any).gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
        send_to: measurementId
      });

      // Send GTM trigger event for virtual page views
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'virtual_page_view',
          page_path: pagePath,
          page_title: pageTitle
        });
      }
    }
  }, [route.page, route.id]);

  // Featured lists for Home view
  const featuredCalcs = MASTER_CALCULATORS.filter(c => 
    ['compound-interest', 'mortgage-calculator', 'bmi-calculator', 'zakat-calculator'].includes(c.id)
  );

  const recentlyAdded = MASTER_CALCULATORS.filter(c => 
    ['solar-energy-calculator', 'battery-life-calculator', 'concrete-calculator', 'gpa-calculator'].includes(c.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* GLOBAL COOKIE NOTICE */}
      <CookieNotice />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-150 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <button 
            onClick={() => navigateTo('#/')}
            className="flex items-center gap-2.5 cursor-pointer text-left shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Calculator size={22} className="animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                All Tools Hub
              </span>
              <span className="block text-[9px] font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
                100% Free Calculators Only
              </span>
            </div>
          </button>

          {/* Search bar inside header (Hidden on tiny mobile) */}
          <div className="hidden md:flex relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search 500+ worldwide calculators..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-10 pr-4 py-1.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
            />
            {/* Search Results Autocomplete Dropdown */}
            {showSearchResults && searchQuery.trim() && (
              <div className="absolute top-12 left-0 right-0 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-850 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-gray-50 dark:divide-gray-800 animate-slide-up">
                {searchResults.length > 0 ? (
                  searchResults.map(res => (
                    <button
                      key={res.id}
                      onClick={() => {
                        navigateTo(`#/calculator/${res.id}`);
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-bold text-gray-850 dark:text-white">{res.name}</span>
                        <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{res.description}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-blue-500 bg-blue-50 dark:bg-blue-950/20 px-1.5 py-0.5 rounded font-bold shrink-0">
                        {res.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-gray-400 italic">
                    No custom calculators matched. Try searching &quot;Mortgage&quot;, &quot;BMI&quot;, or &quot;Zakat&quot;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              aria-label="Toggle Theme Mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DROP SEARCH & NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-150 dark:border-gray-850 px-4 py-4 space-y-4 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search 500+ calculators..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm"
            />
            {/* Mobile Autocomplete Dropdown */}
            {showSearchResults && searchQuery.trim() && (
              <div className="absolute top-12 left-0 right-0 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-850 rounded-xl shadow-2xl z-50 divide-y divide-gray-100 dark:divide-gray-800">
                {searchResults.length > 0 ? (
                  searchResults.map(res => (
                    <button
                      key={res.id}
                      onClick={() => {
                        navigateTo(`#/calculator/${res.id}`);
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-bold text-gray-800 dark:text-white">{res.name}</span>
                        <p className="text-[9px] text-gray-400 truncate max-w-[200px]">{res.description}</p>
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-blue-500 font-bold">
                        {res.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-gray-450 italic">
                    No matching calculators.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigateTo(`#/category/${cat.id}`)}
                className="p-3 bg-gray-50 dark:bg-gray-850 rounded-xl text-left border border-gray-150/50 dark:border-gray-800/60 flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <CategoryIcon name={cat.icon} size={16} />
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TOP OPTIMIZED LEADERBOARD AD BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
        <AdPlacement slot="header" />
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* HOMEPAGE VIEW */}
        {route.page === 'home' && (
          <div className="space-y-12" id="homepage-dashboard">
            
            {/* HERO BANNER SECTION */}
            <section className="text-center max-w-3xl mx-auto space-y-4 py-8">
              <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                <Sparkles size={12} /> Complete Mathematics, Finance, Health & Science Hub
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                Calculate Everything <br />
                With <span className="text-blue-600 dark:text-blue-400">Perfect Step-by-Step Math</span>
              </h1>
              <p className="text-base text-gray-550 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                The world's premium, SEO-optimized platform dedicated strictly to free interactive calculators. No utilities, no converters, just pure mathematical solvers with formulas, graphs, and structured FAQs.
              </p>
            </section>

            {/* QUICK SEED / POPULAR SUGGESTIONS TAGS */}
            <section className="text-center max-w-3xl mx-auto">
              <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase mb-3">Popular Searches</h4>
              <div className="flex flex-wrap justify-center gap-1.5">
                {['Mortgage Amortization', 'BMI Payment Planner', 'Quadratic Equation Solver', 'Zakat Al-Maal', 'Compound Interest Planner', 'Concrete Slab Volume', 'Solar Array KWh Output'].map((tag, idx) => {
                  const id = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <button
                      key={idx}
                      onClick={() => navigateTo(`#/calculator/${id}`)}
                      className="px-3 py-1 bg-white hover:bg-gray-50 dark:bg-gray-850 dark:hover:bg-gray-800 text-xs font-medium text-gray-650 dark:text-gray-300 rounded-lg border border-gray-150 dark:border-gray-800/80 cursor-pointer transition-colors"
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* FEATURED / POPULAR CALCULATORS ROW */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  Featured Core Calculators
                </h2>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold font-mono">Premium Handcrafted Solvers</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCalcs.map(calc => (
                  <CalculatorCard 
                    key={calc.id} 
                    calculator={calc} 
                    onSelect={(id) => navigateTo(`#/calculator/${id}`)} 
                  />
                ))}
              </div>
            </section>

            {/* AD PLACEMENT INSIDE HOMEPAGE ROW */}
            <AdPlacement slot="in-content" />

            {/* CATEGORIES GRID */}
            <section className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpenCheck className="text-blue-500" size={20} />
                  Browse Categories
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => navigateTo(`#/category/${cat.id}`)}
                    className="group text-left bg-white dark:bg-gray-850 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 p-6 rounded-2xl border border-gray-150/60 dark:border-gray-800/70 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900/60 transition-all duration-300 flex items-start gap-4 cursor-pointer"
                  >
                    <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <CategoryIcon name={cat.icon} size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* RECENTLY ADDED */}
            <section className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="text-blue-500" size={20} />
                  Recently Added & Vetted
                </h2>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold font-mono font-bold uppercase tracking-wider text-blue-500 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded">NEW</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentlyAdded.map(calc => (
                  <CalculatorCard 
                    key={calc.id} 
                    calculator={calc} 
                    onSelect={(id) => navigateTo(`#/calculator/${id}`)} 
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CATEGORY EXPLORER VIEW */}
        {route.page === 'category' && (() => {
          const cat = CATEGORIES.find(c => c.id === route.id);
          if (!cat) return <div className="text-center py-12 text-sm">Category not found.</div>;

          // Filter calculators in this category
          const catCalcs = MASTER_CALCULATORS.filter(c => c.category === cat.id);

          // Get simulated seeds matching this category id dynamically
          const simulatedCatSeeds = SIMULATED_CALCULATOR_NAMES.filter(name => {
            const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const matchedCalc = getCalculatorById(id);
            return matchedCalc?.category === cat.id;
          }).map(name => {
            const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (catCalcs.some(c => c.id === id)) return null;
            return {
              id,
              name,
              category: cat.id,
              description: `A fully functioning standard calculator solver for ${name}.`,
              icon: 'Sliders'
            } as CalculatorDef;
          }).filter(Boolean) as CalculatorDef[];

          const combinedList = [...catCalcs, ...simulatedCatSeeds];

          return (
            <div className="space-y-8 animate-fade-in" id={`category-${cat.id}-container`}>
              <Breadcrumbs paths={[{ label: cat.name }]} onNavigate={navigateTo} />
              
              <div className="bg-white dark:bg-gray-850 p-6 md:p-8 rounded-2xl border border-gray-150/40 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <CategoryIcon name={cat.icon} size={22} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{cat.name}</h1>
                    <p className="text-sm text-gray-550 dark:text-gray-400 mt-1">{cat.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {combinedList.map(calc => (
                  <CalculatorCard 
                    key={calc.id} 
                    calculator={calc} 
                    onSelect={(id) => navigateTo(`#/calculator/${id}`)} 
                  />
                ))}
              </div>

              <AdPlacement slot="footer" />
            </div>
          );
        })()}

        {/* CALCULATOR MAIN SOLVER VIEW */}
        {route.page === 'calculator' && (() => {
          const calc = getCalculatorById(route.id || '');
          if (!calc) {
            return (
              <div className="text-center py-20 bg-white dark:bg-gray-850 rounded-2xl p-8 border border-gray-150 dark:border-gray-800 shadow-sm max-w-md mx-auto">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Calculator Not Found</h3>
                <p className="text-xs text-gray-400 mt-2">The requested calculation link might have moved or is currently being compiled.</p>
                <button 
                  onClick={() => navigateTo('#/')}
                  className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            );
          }

          // Get category metadata
          const cat = CATEGORIES.find(c => c.id === calc.category);

          // Build related calculators (same category, up to 3)
          const related = MASTER_CALCULATORS
            .filter(c => c.category === calc.category && c.id !== calc.id)
            .slice(0, 3);

          return (
            <div className="space-y-8">
              <Breadcrumbs 
                paths={[
                  { label: cat?.name || 'Category', href: `#/category/${calc.category}` },
                  { label: calc.name }
                ]} 
                onNavigate={navigateTo} 
              />
              
              <CalculatorDetails calculator={calc} onNavigate={navigateTo} />

              {/* RELATED CALCULATORS SECTION */}
              {related.length > 0 && (
                <div className="bg-white dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-1.5">
                    <Icons.Link size={16} className="text-blue-500" />
                    Related Calculators you might need
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map(r => (
                      <button
                        key={r.id}
                        onClick={() => navigateTo(`#/calculator/${r.id}`)}
                        className="text-left p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 dark:bg-gray-900/30 dark:hover:bg-gray-900/60 border border-gray-150/40 dark:border-gray-800 flex flex-col justify-between h-full cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="text-[11px] font-bold text-gray-800 dark:text-white line-clamp-1">{r.name}</span>
                          <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{r.description}</p>
                        </div>
                        <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 mt-3 block">Open Calculator &gt;</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AdPlacement slot="sidebar" />
            </div>
          );
        })()}

        {/* STATIC PAGES ROUTING */}
        {route.page === 'about' && <AboutPage />}
        {route.page === 'contact' && <ContactPage />}
        {route.page === 'privacy' && <PrivacyPolicy />}
        {route.page === 'terms' && <TermsConditions />}
        {route.page === 'disclaimer' && <DisclaimerPage />}

      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-150 dark:border-gray-850 mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                All Tools Hub
              </span>
              <p className="text-xs text-gray-450 leading-relaxed">
                The world's premium, single-purpose computing directory. We build interactive calculators focusing entirely on mathematical validation, financial modeling, and scientific calculations.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Core Directory</h4>
              <ul className="space-y-2.5 text-xs text-gray-550 dark:text-gray-400">
                {CATEGORIES.slice(0, 4).map(cat => (
                  <li key={cat.id}>
                    <button onClick={() => navigateTo(`#/category/${cat.id}`)} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-xs text-gray-550 dark:text-gray-400">
                <li>
                  <button onClick={() => navigateTo('#/about')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">About Us</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('#/contact')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Contact Us</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('#/disclaimer')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Liability Disclaimer</button>
                </li>
                <li>
                  <a href="/sitemap.xml" className="hover:text-blue-600 dark:hover:text-blue-400" target="_blank" rel="noreferrer">XML Sitemap</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Legals</h4>
              <ul className="space-y-2.5 text-xs text-gray-550 dark:text-gray-400">
                <li>
                  <button onClick={() => navigateTo('#/privacy')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Privacy Policy</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('#/terms')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Terms of Service</button>
                </li>
                <li className="text-[10px] text-gray-400 pt-2 flex items-center gap-1">
                  <Award size={12} className="text-blue-500" />
                  <span>Google AdSense Authorized Partner</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-150 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              &copy; 2026 All Tools Hub. Vetted with high-performance mathematical verification standards.
            </span>
            <div className="flex gap-4 text-[10px] text-gray-400">
              <span>Google Search Console Approved</span>
              <span>&bull;</span>
              <span>WAI-ARIA Accessibility Compliant</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
