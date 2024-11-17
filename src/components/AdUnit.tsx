import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdUnit({ slot, format = 'auto', style, className }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Create a unique ID for this ad unit
    const adId = `ad-${slot}-${Math.random().toString(36).substr(2, 9)}`;
    
    if (adRef.current) {
      adRef.current.id = adId;
    }

    try {
      const adsbygoogle = (window as any).adsbygoogle;
      
      if (adRef.current && adsbygoogle && !isLoaded) {
        // Push the ad without page-level settings
        adsbygoogle.push({
          google_ad_client: "ca-pub-4546141241525552",
          google_ad_slot: slot,
          google_ad_format: format,
          element: adRef.current
        });
        
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('Error loading AdSense ad:', error);
      setHasError(true);
    }

    // Cleanup function
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
        setIsLoaded(false);
      }
    };
  }, [slot, format, isLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
      style={style}
    >
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 text-sm">Advertisement</p>
        </div>
      ) : (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            minHeight: '1px',
            ...style,
          }}
          data-ad-client="ca-pub-4546141241525552"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </motion.div>
  );
}