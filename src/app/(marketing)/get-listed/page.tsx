'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NETWORKS = [
  { id: 'solana', name: 'Solana', color: '#9945FF' },
  { id: 'eth', name: 'Ethereum', color: '#627EEA' },
  { id: 'base', name: 'Base', color: '#0052FF' },
  { id: 'bsc', name: 'BSC', color: '#F3BA2F' },
  { id: 'arbitrum', name: 'Arbitrum', color: '#28A0F0' },
  { id: 'polygon_pos', name: 'Polygon', color: '#8247E5' },
  { id: 'avax', name: 'Avalanche', color: '#E84142' },
];

type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

function ImageUpload({
  label,
  hint,
  preview,
  onFile,
  aspect,
}: {
  label: string;
  hint: string;
  preview: string | null;
  onFile: (file: File) => void;
  aspect: 'square' | 'banner';
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: 'rgba(26,58,42,0.4)' }}>
        {label}
      </label>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="w-full rounded-xl border transition-all hover:border-lavender/40 overflow-hidden group"
        style={{
          borderColor: 'rgba(26,58,42,0.12)',
          background: 'var(--cream-50)',
          aspectRatio: aspect === 'banner' ? '4/1' : undefined,
        }}
      >
        {preview ? (
          <div className="relative w-full" style={{ aspectRatio: aspect === 'banner' ? '4/1' : '1/1', maxHeight: aspect === 'square' ? 120 : undefined }}>
            <Image src={preview} alt="" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium transition-opacity">Change</span>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-1.5 py-6"
            style={{ minHeight: aspect === 'square' ? 120 : undefined }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(26,58,42,0.06)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-30">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[11px]" style={{ color: 'rgba(26,58,42,0.35)' }}>{hint}</span>
          </div>
        )}
      </button>
    </div>
  );
}

const FEATURES = [
  {
    icon: '🧠',
    title: 'AI Safety Ranking',
    desc: 'Every listed token gets an AI-powered safety score analyzing liquidity locks, holder concentration, mint authority, and developer wallet behavior.',
  },
  {
    icon: '🐋',
    title: 'Real-time Whale Alerts',
    desc: 'Get notified when whales move. Our live stream tracks large transactions so your community sees momentum as it happens.',
  },
  {
    icon: '🔍',
    title: 'Sniper & Honeypot Detection',
    desc: 'We flag snipers who bought in the first blocks and detect honeypot patterns from buy/sell tax asymmetry — automatically.',
  },
  {
    icon: '✦',
    title: 'Community Picks',
    desc: 'Listed tokens appear in a dedicated Community Picks section, giving your project organic visibility among active traders.',
  },
];

export default function GetListedPage() {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('solana');
  const [twitter, setTwitter] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<{ verified: boolean; symbol: string } | null>(null);

  const handleLogo = (file: File) => {
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleBanner = (file: File) => {
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address.trim(),
          network,
          twitter: twitter.trim(),
          description: description.trim(),
          website: website.trim(),
          hasLogo: !!logoFile,
          hasBanner: !!bannerFile,
        }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setStatus('duplicate');
        return;
      }
      if (!res.ok) {
        setStatus('error');
        return;
      }

      setResult({ verified: data.verified, symbol: data.submission.symbol });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setAddress('');
    setTwitter('');
    setDescription('');
    setWebsite('');
    setLogoFile(null);
    setLogoPreview(null);
    setBannerFile(null);
    setBannerPreview(null);
    setResult(null);
  };

  return (
    <div style={{ background: 'var(--cream)' }} className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(245,240,232,0.85)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl">✦</span>
            <span className="font-semibold text-lg tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--forest)' }}>
              LightScreener
            </span>
          </Link>
          <Link href="/app"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: 'var(--lavender)', color: 'var(--forest)' }}>
            Open App →
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
            <span className="font-normal">Get </span>
            <span className="italic font-medium" style={{ color: 'var(--lavender)' }}>listed</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: 'rgba(26,58,42,0.45)' }}>
            Submit your token to be featured on LightScreener. We verify it on-chain and add it to Community Picks.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-10 rounded-2xl border text-center" style={{ borderColor: 'rgba(26,58,42,0.08)', background: 'var(--cream-50)' }}>
            <div className="text-4xl mb-4">{result?.verified ? '✓' : '⏳'}</div>
            <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
              {result?.verified ? 'Token verified & listed' : 'Submission received'}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(26,58,42,0.5)' }}>
              {result?.verified
                ? `${result.symbol} has been verified on-chain and added to Community Picks.`
                : 'We couldn\'t verify this token on-chain yet. It will appear once a liquidity pool is detected.'}
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/app"
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-[1.03]"
                style={{ background: 'var(--lavender)', color: 'var(--forest)' }}>
                View in App →
              </Link>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-[1.03] border"
                style={{ borderColor: 'rgba(26,58,42,0.15)', color: 'rgba(26,58,42,0.6)' }}>
                Submit another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Token Logo & Banner side by side */}
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <ImageUpload
                label="Token Logo"
                hint="Square, 256px+"
                preview={logoPreview}
                onFile={handleLogo}
                aspect="square"
              />
              <ImageUpload
                label="Banner Image"
                hint="Wide banner, 1200×300 recommended"
                preview={bannerPreview}
                onFile={handleBanner}
                aspect="banner"
              />
            </div>

            {/* Contract Address */}
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: 'rgba(26,58,42,0.4)' }}>
                Token Contract Address *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x... or So1..."
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-lavender/30"
                style={{
                  borderColor: 'rgba(26,58,42,0.12)',
                  background: 'var(--cream-50)',
                  color: 'var(--forest)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
            </div>

            {/* Network */}
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: 'rgba(26,58,42,0.4)' }}>
                Chain *
              </label>
              <div className="flex flex-wrap gap-2">
                {NETWORKS.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setNetwork(n.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all border"
                    style={{
                      borderColor: network === n.id ? 'var(--lavender)' : 'rgba(26,58,42,0.1)',
                      background: network === n.id ? 'rgba(196,181,253,0.12)' : 'transparent',
                      color: network === n.id ? 'var(--forest)' : 'rgba(26,58,42,0.45)',
                    }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: n.color }} />
                    {n.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Twitter + Website side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: 'rgba(26,58,42,0.4)' }}>
                  Project X / Twitter
                </label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@yourproject"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-lavender/30"
                  style={{
                    borderColor: 'rgba(26,58,42,0.12)',
                    background: 'var(--cream-50)',
                    color: 'var(--forest)',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: 'rgba(26,58,42,0.4)' }}>
                  Website
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourproject.com"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-lavender/30"
                  style={{
                    borderColor: 'rgba(26,58,42,0.12)',
                    background: 'var(--cream-50)',
                    color: 'var(--forest)',
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: 'rgba(26,58,42,0.4)' }}>
                Short Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does your token do?"
                rows={3}
                maxLength={280}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-lavender/30 resize-none"
                style={{
                  borderColor: 'rgba(26,58,42,0.12)',
                  background: 'var(--cream-50)',
                  color: 'var(--forest)',
                }}
              />
              <div className="text-right mt-1 text-[10px]" style={{ color: 'rgba(26,58,42,0.3)' }}>
                {description.length}/280
              </div>
            </div>

            {/* Status messages */}
            {status === 'duplicate' && (
              <p className="text-sm text-center" style={{ color: '#b45309' }}>
                This token has already been submitted.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-center text-red-500">
                Something went wrong. Please try again.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting' || !address.trim()}
              className="w-full py-3.5 rounded-full text-base font-medium transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
              style={{ background: 'var(--lavender)', color: 'var(--forest)' }}>
              {status === 'submitting' ? 'Verifying on-chain...' : 'Submit Token'}
            </button>

            <p className="text-center text-xs" style={{ color: 'rgba(26,58,42,0.3)' }}>
              Free forever. We verify your token exists on-chain via GeckoTerminal.
            </p>
          </form>
        )}

        {/* Why LightScreener */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: 'var(--lavender)' }}>
              Not just another listing
            </p>
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
              <span className="font-normal">Why list on </span>
              <span className="italic font-medium">LightScreener?</span>
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(26,58,42,0.45)' }}>
              DexScreener charges thousands for promoted listings and gives you a basic chart.
              We give your token AI-powered analysis, whale tracking, and real visibility — for free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-2xl border transition-all hover:border-lavender/30"
                style={{ borderColor: 'rgba(26,58,42,0.08)', background: 'var(--cream-50)' }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: 'var(--forest)', fontFamily: "'DM Sans', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(26,58,42,0.5)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison strip */}
          <div className="mt-10 rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(26,58,42,0.08)' }}>
            <div className="grid grid-cols-3 text-center text-xs font-medium" style={{ background: 'rgba(26,58,42,0.03)' }}>
              <div className="py-3" style={{ color: 'rgba(26,58,42,0.4)' }}>Feature</div>
              <div className="py-3" style={{ color: 'rgba(26,58,42,0.4)' }}>DexScreener</div>
              <div className="py-3" style={{ color: 'var(--forest)' }}>LightScreener</div>
            </div>
            {[
              ['Listing cost', '$2,000+', 'Free'],
              ['AI safety score', '—', '✓'],
              ['Whale alerts', '—', '✓ Real-time'],
              ['Sniper detection', '—', '✓ Automatic'],
              ['Honeypot check', '—', '✓ Built-in'],
              ['Community Picks', '—', '✓'],
              ['On-chain verification', 'Basic', 'Deep analysis'],
            ].map(([feature, dex, light], i) => (
              <div
                key={feature}
                className="grid grid-cols-3 text-center text-xs border-t"
                style={{
                  borderColor: 'rgba(26,58,42,0.06)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(26,58,42,0.015)',
                }}
              >
                <div className="py-3 font-medium" style={{ color: 'rgba(26,58,42,0.6)' }}>{feature}</div>
                <div className="py-3" style={{ color: 'rgba(26,58,42,0.35)' }}>{dex}</div>
                <div className="py-3 font-medium" style={{ color: 'var(--forest)' }}>{light}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
