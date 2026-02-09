'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─── tiny intersection-observer fade-in ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('landed'); io.unobserve(el); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-section ${className}`}>
      {children}
    </div>
  );
}

/* ─── chain dots ─── */
const CHAINS = [
  { name: 'Solana', color: '#9945FF' },
  { name: 'Ethereum', color: '#627EEA' },
  { name: 'Base', color: '#0052FF' },
  { name: 'BSC', color: '#F3BA2F' },
  { name: 'Arbitrum', color: '#28A0F0' },
  { name: 'Polygon', color: '#8247E5' },
  { name: 'Avalanche', color: '#E84142' },
];

/* ─── features ─── */
const FEATURES = [
  {
    icon: '🛡️',
    title: 'Rug Score',
    desc: 'Instant on-chain safety analysis. Liquidity locks, mint authority, holder concentration — scored 0 to 100 so you know before you ape.',
    accent: '#c4b5fd',
  },
  {
    icon: '🐋',
    title: 'Whale Alerts',
    desc: 'Real-time streaming alerts for large trades across every chain. See the whales move before the chart does.',
    accent: '#86efac',
  },
  {
    icon: '🎯',
    title: 'Sniper Detection',
    desc: 'Flag wallets that bought in the first blocks after pool creation. Know who the insiders are.',
    accent: '#fbbf24',
  },
  {
    icon: '🍯',
    title: 'Honeypot Check',
    desc: 'Compare buy vs sell tax from real trade data. If the sell tax is suspiciously higher, you will know.',
    accent: '#fb923c',
  },
];

/* ─── stats ─── */
const STATS = [
  { value: '260+', label: 'Chains tracked' },
  { value: '<2s', label: 'Alert latency' },
  { value: '0', label: 'API keys needed' },
  { value: '100%', label: 'Free to use' },
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* ───── Announcement Bar ───── */}
      <div className="w-full py-2.5 px-4 text-center text-sm tracking-wide"
        style={{ background: 'var(--forest)', color: 'rgba(245,240,232,0.7)' }}>
        <span style={{ color: '#c4b5fd' }}>$LIGHT</span>
        {' '}coming live on PumpFun
      </div>

      {/* ───── Nav ───── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(245,240,232,0.85)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">✦</span>
            <span className="font-semibold text-lg tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--forest)' }}>
              LightScreener
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'rgba(26,58,42,0.55)' }}>
            <a href="#features" className="hover:text-[var(--forest)] transition-colors">Features</a>
            <a href="#chains" className="hover:text-[var(--forest)] transition-colors">Chains</a>
            <a href="#compare" className="hover:text-[var(--forest)] transition-colors">Why us</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://x.com/light_screener" target="_blank" rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70" style={{ color: 'var(--forest)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <Link href="/"
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: 'var(--lavender)', color: 'var(--forest)' }}>
              Open App →
            </Link>
          </div>
        </div>
      </nav>

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        {/* background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--forest) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
          {/* chain dots floating above */}
          <div className="flex justify-center gap-3 mb-8">
            {CHAINS.map((c, i) => (
              <span key={c.name} className="w-2.5 h-2.5 rounded-full hero-dot" style={{
                background: c.color,
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </div>

          <h1 className="hero-headline" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
            <span className="font-normal">Don&apos;t guess,</span>
            <br />
            <span className="italic font-medium" style={{ color: 'var(--lavender)' }}>just screen.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(26,58,42,0.55)' }}>
            The token screener built for degens. Rug scores, whale alerts, sniper detection — everything you need to ape safely across 260+ chains.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/"
              className="px-8 py-3.5 rounded-full text-base font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg"
              style={{ background: 'var(--lavender)', color: 'var(--forest)', boxShadow: '0 8px 32px rgba(196,181,253,0.35)' }}>
              Launch Screener
            </Link>
            <a href="#features"
              className="px-8 py-3.5 rounded-full text-base font-medium transition-all hover:scale-[1.03] border"
              style={{ borderColor: 'rgba(26,58,42,0.15)', color: 'rgba(26,58,42,0.6)' }}>
              See Features
            </a>
          </div>

          {/* Mock screenshot hint */}
          <div className="mt-16 mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl border"
            style={{ borderColor: 'rgba(26,58,42,0.08)', background: 'var(--cream-50)' }}>
            <div className="px-6 py-4 flex items-center gap-2 border-b" style={{ borderColor: 'rgba(26,58,42,0.08)' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              <span className="ml-4 text-xs" style={{ color: 'rgba(26,58,42,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>
                lightscreener.app
              </span>
            </div>
            <div className="px-6 py-8">
              {/* mini token table mockup */}
              <div className="space-y-0">
                <div className="grid grid-cols-7 gap-4 text-[10px] uppercase tracking-wider pb-3 border-b"
                  style={{ color: 'rgba(26,58,42,0.35)', borderColor: 'rgba(26,58,42,0.08)' }}>
                  <span className="col-span-2">Token</span>
                  <span>Price</span>
                  <span>5m</span>
                  <span>1h</span>
                  <span>Volume</span>
                  <span>Rug Score</span>
                </div>
                {[
                  { name: 'BONK / SOL', price: '$0.00002341', m5: '+12.4%', h1: '+34.2%', vol: '$4.2M', rug: '23', rugColor: '#86efac', chain: '#9945FF' },
                  { name: 'PEPE / WETH', price: '$0.00001102', m5: '-2.1%', h1: '+8.7%', vol: '$12.8M', rug: '31', rugColor: '#86efac', chain: '#627EEA' },
                  { name: 'WIF / SOL', price: '$1.84', m5: '+5.3%', h1: '-1.2%', vol: '$8.1M', rug: '18', rugColor: '#86efac', chain: '#9945FF' },
                  { name: 'BRETT / WETH', price: '$0.142', m5: '+0.8%', h1: '+22.5%', vol: '$3.6M', rug: '45', rugColor: '#fbbf24', chain: '#0052FF' },
                  { name: 'DEGEN / WETH', price: '$0.00891', m5: '-4.2%', h1: '+2.1%', vol: '$1.9M', rug: '67', rugColor: '#f87171', chain: '#0052FF' },
                ].map((t, i) => (
                  <div key={i} className="grid grid-cols-7 gap-4 py-3 text-xs items-center border-b"
                    style={{ borderColor: 'rgba(26,58,42,0.05)' }}>
                    <span className="col-span-2 flex items-center gap-2 font-medium" style={{ color: 'var(--forest)' }}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.chain }} />
                      {t.name}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(26,58,42,0.7)' }}>{t.price}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: t.m5.startsWith('+') ? '#16a34a' : '#dc2626' }}>{t.m5}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: t.h1.startsWith('+') ? '#16a34a' : '#dc2626' }}>{t.h1}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(26,58,42,0.6)' }}>{t.vol}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.rugColor }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(26,58,42,0.6)' }}>{t.rug}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Stats Bar — dark forest ───── */}
      <FadeSection>
        <section className="py-20 md:py-24" style={{ background: 'var(--forest)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-semibold mb-2" style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--lavender)',
                  }}>
                    {s.value}
                  </div>
                  <div className="text-sm tracking-wide" style={{ color: 'rgba(245,240,232,0.45)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ───── Features ───── */}
      <section id="features" className="py-20 md:py-28" style={{ background: 'var(--cream)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
                <span className="font-normal">Built for </span>
                <span className="italic font-medium" style={{ color: 'var(--lavender)' }}>degens</span>
              </h2>
              <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(26,58,42,0.45)' }}>
                Every feature exists because we got rugged one too many times.
              </p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <FadeSection key={i}>
                <div className="group relative p-8 rounded-2xl border transition-all hover:shadow-lg"
                  style={{ borderColor: 'rgba(26,58,42,0.08)', background: 'var(--cream-50)' }}>
                  {/* accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }} />

                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--forest)' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,58,42,0.5)' }}>
                    {f.desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Chains — dark ───── */}
      <FadeSection>
        <section id="chains" className="py-20 md:py-28" style={{ background: 'var(--forest)' }}>
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cream)' }}>
              <span className="font-normal">Every chain.</span>
              <br />
              <span className="italic font-medium" style={{ color: 'var(--lavender)' }}>One screen.</span>
            </h2>
            <p className="text-base mb-14 max-w-md mx-auto" style={{ color: 'rgba(245,240,232,0.4)' }}>
              Track trending tokens across every major chain. Filter by network or see the full picture.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {CHAINS.map((c) => (
                <div key={c.name}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full border transition-all hover:scale-[1.03]"
                  style={{ borderColor: 'rgba(245,240,232,0.1)', background: 'rgba(245,240,232,0.04)' }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: c.color, boxShadow: `0 0 12px ${c.color}50` }} />
                  <span className="text-sm font-medium" style={{ color: 'rgba(245,240,232,0.7)' }}>{c.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full border"
                style={{ borderColor: 'rgba(245,240,232,0.1)', background: 'rgba(245,240,232,0.04)' }}>
                <span className="text-sm" style={{ color: 'rgba(245,240,232,0.35)' }}>+ 253 more</span>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ───── Compare — cream ───── */}
      <FadeSection>
        <section id="compare" className="py-20 md:py-28" style={{ background: 'var(--cream)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
                <span className="font-normal">The screener you </span>
                <span className="italic font-medium" style={{ color: 'var(--lavender)' }}>actually want</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Other screeners */}
              <div className="p-8 rounded-2xl border" style={{ borderColor: 'rgba(26,58,42,0.08)', background: 'var(--cream-50)' }}>
                <div className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(26,58,42,0.3)' }}>Other screeners</div>
                <ul className="space-y-4">
                  {[
                    'Price and volume only',
                    'No safety analysis',
                    'Single chain focus',
                    'Cluttered with ads',
                    'Paid tiers for basic data',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(26,58,42,0.4)' }}>
                      <span className="mt-0.5 text-red-400/60">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* LightScreener */}
              <div className="p-8 rounded-2xl border-2 relative overflow-hidden"
                style={{ borderColor: 'var(--lavender)', background: 'var(--cream-50)' }}>
                <div className="absolute top-0 right-0 px-3 py-1 text-[10px] uppercase tracking-widest rounded-bl-lg"
                  style={{ background: 'var(--lavender)', color: 'var(--forest)' }}>
                  light
                </div>
                <div className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(26,58,42,0.3)' }}>LightScreener</div>
                <ul className="space-y-4">
                  {[
                    'Rug score on every token',
                    'Real-time whale alerts',
                    'Sniper & honeypot detection',
                    '260+ chains, one interface',
                    '100% free, no account needed',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium" style={{ color: 'var(--forest)' }}>
                      <span className="mt-0.5" style={{ color: 'var(--lavender)' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ───── How it works — dark ───── */}
      <FadeSection>
        <section className="py-20 md:py-28" style={{ background: 'var(--forest)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cream)' }}>
                <span className="font-normal">Three steps to </span>
                <span className="italic font-medium" style={{ color: 'var(--lavender)' }}>not getting rugged</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Spot the token',
                  desc: 'Browse trending tokens, fresh pairs, or search by name. Real-time data from GeckoTerminal across every chain.',
                },
                {
                  step: '02',
                  title: 'Check the score',
                  desc: 'Every token gets a rug score. Liquidity locks, holder concentration, mint authority — all analyzed on-chain.',
                },
                {
                  step: '03',
                  title: 'Ape with confidence',
                  desc: 'Watch whale movements, check for snipers, verify it is not a honeypot. Then make your move.',
                },
              ].map((s, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-5xl font-semibold mb-4" style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'rgba(196,181,253,0.2)',
                  }}>
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--cream)' }}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.4)' }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ───── CTA — cream ───── */}
      <FadeSection>
        <section className="py-24 md:py-32" style={{ background: 'var(--cream)' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)' }}>
              <span className="font-normal">Stop guessing.</span>
              <br />
              <span className="italic font-medium" style={{ color: 'var(--lavender)' }}>Start screening.</span>
            </h2>
            <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(26,58,42,0.45)' }}>
              Free. No account. No API keys. Just open the app and go.
            </p>
            <Link href="/"
              className="inline-block px-10 py-4 rounded-full text-lg font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl"
              style={{ background: 'var(--lavender)', color: 'var(--forest)', boxShadow: '0 12px 40px rgba(196,181,253,0.4)' }}>
              Launch LightScreener →
            </Link>
          </div>
        </section>
      </FadeSection>

      {/* ───── Footer ───── */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: 'rgba(26,58,42,0.08)', background: 'var(--cream)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">✦</span>
            <span className="text-sm font-medium" style={{ color: 'rgba(26,58,42,0.5)' }}>LightScreener</span>
          </div>
          <div className="text-xs" style={{ color: 'rgba(26,58,42,0.3)' }}>
            Shine a light on every token. Not financial advice.
          </div>
        </div>
      </footer>

      <style jsx>{`
        .landing-page {
          overflow-x: hidden;
        }

        .hero-headline {
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        /* fade-in on scroll */
        .fade-section {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-section.landed {
          opacity: 1;
          transform: translateY(0);
        }

        /* hero chain dots float animation */
        .hero-dot {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* smooth scrolling */
        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }
      `}</style>
    </div>
  );
}
