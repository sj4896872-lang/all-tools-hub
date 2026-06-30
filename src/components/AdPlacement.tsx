import { useEffect, useRef, useState } from 'react';
import { Eye, Info } from 'lucide-react';

interface AdPlacementProps {
  slot: 'header' | 'sidebar' | 'in-content' | 'footer' | 'results';
  adSlotId?: string; // Custom slot ID override
}

export default function AdPlacement({ slot, adSlotId }: AdPlacementProps) {
  const [showDemo, setShowDemo] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  const slotMeta = {
    header: {
      title: 'Leaderboard Ad Unit (728x90 / 320x50)',
      position: 'Page Header - Maximum Initial Exposure',
      dimensions: 'Responsive (Auto)',
      adStyle: 'w-full h-24 md:h-28 max-w-4xl mx-auto',
      defaultSlot: '1234567890'
    },
    sidebar: {
      title: 'Skyscraper Ad Unit (300x600)',
      position: 'Sidebar - Sticky Scroll-Engaged Placement',
      dimensions: '300px width × 600px height',
      adStyle: 'w-full h-[400px] md:h-[600px] max-w-[300px] mx-auto',
      defaultSlot: '2345678901'
    },
    'in-content': {
      title: 'In-Feed Native Ad Unit',
      position: 'Article Body - Flow-matched Native Display',
      dimensions: 'Fluid / Responsive',
      adStyle: 'w-full h-40 max-w-3xl mx-auto',
      defaultSlot: '3456789012'
    },
    results: {
      title: 'Matched Content / Link Unit',
      position: 'Calculation Results - Maximum CTR Hotspot',
      dimensions: 'Responsive (Auto)',
      adStyle: 'w-full h-32 max-w-2xl mx-auto',
      defaultSlot: '4567890123'
    },
    footer: {
      title: 'Large Horizontal Banner (970x90)',
      position: 'Footer Rail - High Impression Anchor',
      dimensions: '970px width × 90px height',
      adStyle: 'w-full h-24 max-w-5xl mx-auto',
      defaultSlot: '5678901234'
    }
  };

  const meta = slotMeta[slot];
  const adClient = (import.meta as any).env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-1234567890123456';
  const finalSlotId = adSlotId || meta.defaultSlot;

  useEffect(() => {
    // Only push when the ins tag is fully mounted and not already initialized
    if (!initialized.current && adRef.current) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        initialized.current = true;
      } catch (e) {
        console.warn('Google AdSense loading error or blocked:', e);
      }
    }
  }, [slot, finalSlotId]);

  return (
    <div className="my-6 border border-dashed border-gray-300 dark:border-gray-800 rounded-lg overflow-hidden bg-gray-50/50 dark:bg-gray-900/30 p-2 text-center transition-all duration-300">
      <div className="flex items-center justify-between px-3 py-1 bg-gray-100 dark:bg-gray-900/70 rounded text-[10px] font-mono text-gray-400 dark:text-gray-550 mb-2">
        <span className="flex items-center gap-1">
          <Info size={12} className="text-blue-500" />
          AdSense Ready: {meta.title}
        </span>
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="flex items-center gap-1 px-1.5 py-0.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 cursor-pointer text-[9px] transition-colors"
        >
          {showDemo ? 'Show Live Tag' : 'Preview Mock Layout'}
        </button>
      </div>

      <div className="relative">
        {!showDemo ? (
          <div className={`flex flex-col items-center justify-center min-h-[90px] ${meta.adStyle}`}>
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '100%' }}
              data-ad-client={adClient}
              data-ad-slot={finalSlotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <p className="text-[8px] font-mono text-gray-450 dark:text-gray-550 mt-1 select-none uppercase tracking-wider">
              Sponsored Advertisement • Publisher ID: {adClient}
            </p>
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center bg-white dark:bg-gray-850 shadow-sm border border-gray-200 dark:border-gray-800 rounded p-4 ${meta.adStyle} animate-pulse relative`}>
            <span className="absolute top-1 right-2 text-[8px] font-mono font-semibold tracking-wider text-gray-400 bg-gray-100 dark:bg-gray-800 px-1 rounded uppercase">
              Sponsored Advertisement
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 text-xs font-bold mb-1">
              $
            </div>
            <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
              Responsive Ad Block Positioned Perfectly
            </p>
            <p className="text-[9px] text-gray-400 dark:text-gray-550 mt-1 max-w-[250px]">
              This high-RPM element adapts dynamically to screen sizes for the best possible layout compliance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
