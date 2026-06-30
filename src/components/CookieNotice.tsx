import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('all_tools_hub_cookie_consent');
    if (!consent) {
      // Show notice after a slight delay for better layout transition
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('all_tools_hub_cookie_consent', 'accepted');
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('all_tools_hub_cookie_consent', 'declined');
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md bg-white dark:bg-gray-850 border border-gray-150 dark:border-gray-800 shadow-2xl rounded-2xl p-5 z-50 flex flex-col gap-3 animate-slide-up">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <ShieldCheck size={20} className="shrink-0" />
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">Privacy & Cookie Consent</h4>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
        We use cookies and equivalent tracking pixels to personalize content, optimize responsive Google AdSense advertisements, and analyze our global web traffic. By clicking &quot;Accept All&quot;, you consent to our privacy policy guidelines.
      </p>

      <div className="flex items-center gap-2 justify-end mt-1">
        <button
          onClick={handleDecline}
          className="px-3 py-1.5 text-[11px] text-gray-500 hover:text-gray-850 dark:text-gray-400 dark:hover:text-gray-200 font-medium cursor-pointer transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[11px] font-semibold rounded-lg cursor-pointer transition-colors shadow-sm"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
