import React, { useState, useEffect } from 'react';
import qrImage from '../../assets/img/qr.jpeg';

// Types
interface Config {
  headline: string;
  subheadline: string;
  price_amount: string;
  offer_name: string;
  upi_id: string;
  background_color: string;
  surface_color: string;
  text_color: string;
  primary_action_color: string;
  secondary_action_color: string;
}

interface ElementSdk {
  init: (params: any) => void;
  setConfig: (config: Partial<Config>) => void;
}

declare global {
  interface Window {
    elementSdk?: ElementSdk;
  }
}

const defaultConfig: Config = {
  headline: 'Premium Course Access Unlock करें! 🚀',
  subheadline: 'Payment के तुरंत बाद Instant Access पाएं। कोई waiting नहीं!',
  price_amount: '₹5',
  offer_name: 'Premium Access',
  upi_id: 'oosaurabh6@okicici',
  background_color: '#667eea',
  surface_color: '#ffffff',
  text_color: '#1f2937',
  primary_action_color: '#7c3aed',
  secondary_action_color: '#25D366'
};

const PaymentPage: React.FC = () => {
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [config, setConfig] = useState<Config>(defaultConfig);

  // Copy UPI functionality
  const handleCopyUPI = () => {
    navigator.clipboard.writeText(config.upi_id).then(() => {
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    });
  };

  // Element SDK Integration
  useEffect(() => {
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (newConfig: Partial<Config>) => {
          setConfig(prev => ({ ...prev, ...newConfig }));
        },
        mapToCapabilities: (config: Config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value: string) => {
                setConfig(prev => ({ ...prev, background_color: value }));
                window.elementSdk?.setConfig({ background_color: value });
              }
            },
            {
              get: () => config.surface_color || defaultConfig.surface_color,
              set: (value: string) => {
                setConfig(prev => ({ ...prev, surface_color: value }));
                window.elementSdk?.setConfig({ surface_color: value });
              }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value: string) => {
                setConfig(prev => ({ ...prev, text_color: value }));
                window.elementSdk?.setConfig({ text_color: value });
              }
            },
            {
              get: () => config.primary_action_color || defaultConfig.primary_action_color,
              set: (value: string) => {
                setConfig(prev => ({ ...prev, primary_action_color: value }));
                window.elementSdk?.setConfig({ primary_action_color: value });
              }
            },
            {
              get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
              set: (value: string) => {
                setConfig(prev => ({ ...prev, secondary_action_color: value }));
                window.elementSdk?.setConfig({ secondary_action_color: value });
              }
            }
          ],
          borderables: [],
          fontEditable: undefined,
          fontSizeable: undefined
        }),
        mapToEditPanelValues: (config: Config) => new Map([
          ['headline', config.headline || defaultConfig.headline],
          ['subheadline', config.subheadline || defaultConfig.subheadline],
          ['price_amount', config.price_amount || defaultConfig.price_amount],
          ['offer_name', config.offer_name || defaultConfig.offer_name],
          ['upi_id', config.upi_id || defaultConfig.upi_id]
        ])
      });
    }
  }, []);

  // Mobile Layout Component
  const MobileLayout = () => (
    <div className="mobile-layout">
      {/* Hero Section Mobile */}
      <section className="relative px-4 pt-12 pb-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm md:text-base font-semibold tracking-wide">
              Secure Payment Process
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            {config.headline}
          </h1>

          <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            {config.subheadline}
          </p>

          <div className="float-animation">
            <svg className="w-10 h-10 text-white/80 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl card-glow overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
            <p className="text-white/90 text-xs font-medium mb-1 relative z-10">LIMITED TIME OFFER</p>
            <h2 className="text-xl font-bold text-white relative z-10">{config.offer_name}</h2>
          </div>
          
          <div className="px-5 py-4 text-center border-b border-gray-100">
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-400 line-through text-xl">₹10</span>
              <span className="text-4xl font-extrabold text-gray-800">{config.price_amount}</span>
            </div>
            <p className="text-green-600 font-semibold mt-1 text-sm">🎉 50% OFF - Today!</p>
          </div>

          <div className="px-5 py-4 bg-gradient-to-b from-purple-50 to-white">
            <div className="relative mb-4">
              <div className="flex items-center justify-between bg-white border-2 border-purple-200 rounded-lg px-3 py-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">UPI ID</p>
                  <p className="font-bold text-purple-700 text-sm">{config.upi_id}</p>
                </div>
                <button
                  onClick={handleCopyUPI}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-all whitespace-nowrap"
                >
                  {showCopyToast ? 'Copied!' : 'Copy'}
                </button>
              </div>
              {showCopyToast && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium copy-toast">
                  ✓ Copied!
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-3 border-2 border-dashed border-purple-200 text-center">
              <p className="text-xs text-gray-600 mb-2 font-medium">or Scan QR 👇</p>
              <img src={qrImage} alt="QR Code" className="w-48 h-48 mx-auto" />
              <p className="text-xs text-gray-500 mt-2">Scan with UPI app</p>
            </div>
          </div>

          <div className="px-5 py-3 bg-gray-50 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600 font-medium">100% Safe & Secure</span>
          </div>
        </div>
      </section>

      {/* WhatsApp Info Mobile */}
      <section className="px-4 pb-24 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h3 className="text-white font-bold text-lg mb-2">📱 Payment Done?</h3>
          <p className="text-white/90 mb-3 text-sm">Send Screenshot via button below</p>
          <div className="flex items-center justify-center gap-1 text-white/80 text-xs">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">1</span>
            <span>Pay</span>
            <span className="text-white/50">→</span>
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">2</span>
            <span>Screenshot</span>
            <span className="text-white/50">→</span>
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">3</span>
            <span>Send</span>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp Button Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
        <a
          href="https://wa.me/919599417028?text=Hello%20Saurabh,%20I%20have%20completed%20payment.%20Here%20is%20my%20screenshot."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-white font-bold text-base transition-all pulse-animation"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>Send Screenshot</span>
        </a>
      </div>
    </div>
  );

  // Desktop Layout Component
  const DesktopLayout = () => (
    <div className="desktop-layout">
      {/* Left Hero Content */}
      <section className="relative px-4 pt-12 pb-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm md:text-base font-semibold tracking-wide">
              Secure Payment Process
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            {config.headline}
          </h1>

          <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            {config.subheadline}
          </p>

          <div className="float-animation">
            <svg className="w-10 h-10 text-white/80 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Right Payment Card */}
      <section className="flex items-center justify-center">
        <div className="bg-white rounded-3xl card-glow overflow-hidden w-full max-w-md">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 shimmer"></div>
            <p className="text-white/90 text-sm font-medium mb-2 relative z-10">LIMITED TIME OFFER</p>
            <h2 className="text-3xl font-bold text-white relative z-10">{config.offer_name}</h2>
          </div>

          <div className="px-8 py-8 text-center border-b border-gray-100">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-gray-400 line-through text-3xl">₹10</span>
              <span className="text-6xl font-extrabold text-gray-800">{config.price_amount}</span>
            </div>
            <p className="text-green-600 font-semibold text-lg">🎉 50% OFF - Today Only!</p>
          </div>

          <div className="px-8 py-6 bg-gradient-to-b from-purple-50 to-white">
            <div className="relative mb-6">
              <div className="flex items-center justify-between bg-white border-2 border-purple-200 rounded-xl px-5 py-4 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">UPI ID</p>
                  <p className="font-bold text-purple-700 text-lg">{config.upi_id}</p>
                </div>
                <button
                  onClick={handleCopyUPI}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  {showCopyToast ? 'Copied!' : 'Copy'}
                </button>
              </div>
              {showCopyToast && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium copy-toast">
                  ✓ Copied!
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-dashed border-purple-200 text-center">
              <p className="text-sm text-gray-600 mb-4 font-medium">or Scan QR Code 👇</p>
              <img src="{{ asset('qr.jpeg') }}" alt="QR Code" className="w-48 h-48 mx-auto" />
              <p className="text-xs text-gray-500 mt-3">Scan with any UPI app</p>
            </div>
          </div>

          <div className="px-8 py-5 bg-gray-50 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">100% Safe & Secure Payment</span>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div id="app-wrapper" className="min-h-full w-full gradient-bg">
      <MobileLayout />
      <DesktopLayout />
    </div>
  );
};

export default PaymentPage;