import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import PredictionCard from "./Component/PredictionCard";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import PredictionPage from './PredictionPage';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const liquiditySectionRef = useRef<HTMLDivElement | null>(null);
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const predictionSectionRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Navbar background change on scroll
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgba(10, 10, 20, 0.9)";
        (nav.style as any).backdropFilter = "blur(10px)";
      } else {
        nav.style.backgroundColor = "transparent";
        (nav.style as any).backdropFilter = "none";
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.hero-text span', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });

      gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.5,
        repeat: -1,
        yoyo: true
      });

      // Section animations
      ScrollTrigger.create({
        trigger: liquiditySectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.liquidity-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.liquidity-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: swapSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.swap-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.swap-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: predictionSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.prediction-card', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });

    }, mainRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const scrollToSection = (ref: any) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const handlePredictionCardClick = (asset: string) => {
    navigate(`/prediction/${encodeURIComponent(asset)}`);
  };

  return (
    <>
    <div ref={mainRef} className="app-container">
      {/* Navbar */}
      <nav ref={navRef} className="navbar">
        <div className="nav-content">
          <div className="nav-logo">WEB3</div>
          <div className="nav-links">
            <button onClick={() => scrollToSection(heroRef)}>Home</button>
            <button onClick={() => scrollToSection(liquiditySectionRef)}>Liquidity</button>
            <button onClick={() => scrollToSection(swapSectionRef)}>Swap Tokens</button>
            <button onClick={() => scrollToSection(predictionSectionRef)}>Prediction</button>
          </div>
        </div>
      </nav>

      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-woman-using-her-credit-card-41596-large.mp4" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
        <div className="content-container">
          <header className="hero">
            <h1 className="hero-text">
              WEB3 REVOLUTION
            </h1>
            <p className="hero-description">
              The next evolution of the internet is here. Experience decentralized finance with our cutting-edge platform.
            </p>
            <div className="scroll-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </header>
        </div>
      </div>

      {/* Liquidity Section */}
      <div ref={liquiditySectionRef} className="section-container">
        <div className="content-container">
          <div className="section-content">
            <div className="liquidity-description">
              <h2>Liquidity Pools</h2>
              <p>
                Provide liquidity to decentralized exchanges and earn passive income through trading fees and yield farming rewards. 
                Our platform offers competitive APYs and minimal impermanent loss protection.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">$42.8B</div>
                  <div className="stat-label">Total Value Locked</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">1.2M</div>
                  <div className="stat-label">Active Providers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">12-48%</div>
                  <div className="stat-label">Average APY</div>
                </div>
              </div>
            </div>
            <div className="liquidity-card section-card">
              <div className="card-content">
                <h2>Add Liquidity</h2>
                <p>Provide liquidity to earn passive income through trading fees and rewards</p>
                <div className="card-actions">
                  <input type="text" placeholder="Token Amount" />
                  <input type="text" placeholder="Token Amount" />
                  <button className="action-btn pulse">Add Liquidity</button>
                </div>
                <div className="card-stats">
                  <div className="stat">
                    <span className="value">$42.8B</span>
                    <span className="label">Total Locked</span>
                  </div>
                  <div className="stat">
                    <span className="value">12-48%</span>
                    <span className="label">APY Range</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Section */}
      <div ref={swapSectionRef} className="section-container">
        <div className="content-container">
          <div className="section-content reverse">
            <div className="swap-description">
              <h2 className="gradient-text">Token Swaps</h2>
              <p className="glow-text">
                Trade tokens instantly with optimal pricing and minimal slippage. 
                Our advanced routing algorithm scans multiple DEXs to find you the best rates.
              </p>
              <div className="stats-grid">
                <div className="stat-item pulse-glow">
                  <div className="stat-value">$1.2B</div>
                  <div className="stat-label">24h Volume</div>
                </div>
                <div className="stat-item pulse-glow">
                  <div className="stat-value">0.05%</div>
                  <div className="stat-label">Average Fee</div>
                </div>
                <div className="stat-item pulse-glow">
                  <div className="stat-value">12s</div>
                  <div className="stat-label">Avg. Swap Time</div>
                </div>
              </div>
            </div>
            
            <div className="swap-card section-card neo-glass">
              <div className="card-content">
                <h2 className="card-title">Swap Tokens</h2>
                <p className="card-subtitle">Get the best rates across DeFi</p>
                
                <div className="card-actions">
                  <div className="swap-input-container neo-inset">
                    <input type="number" placeholder="0.0" className="swap-amount-input" />
                    <div className="token-select-wrapper">
                      <select className="token-select-right">
                        <option value="ETH">ETH</option>
                        <option value="BTC">BTC</option>
                        <option value="USDC">USDC</option>
                        <option value="DAI">DAI</option>
                      </select>
                      <div className="token-icon eth-icon"></div>
                    </div>
                  </div>
                  
                  <div className="swap-arrow-container">
                    <div className="swap-arrow-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="swap-arrow-icon">
                        <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="swap-input-container neo-inset">
                    <input type="number" placeholder="0.0" className="swap-amount-input" />
                    <div className="token-select-wrapper">
                      <select className="token-select-right">
                        <option value="USDC">USDC</option>
                        <option value="ETH">ETH</option>
                        <option value="BTC">BTC</option>
                        <option value="DAI">DAI</option>
                      </select>
                      <div className="token-icon usdc-icon"></div>
                    </div>
                  </div>
                  
                  <button className="action-btn gradient-pulse">
                    <span>Swap Now</span>
                  </button>
                </div>
                
                <div className="rate-info">
                  <span className="rate-label">Best rate:</span>
                  <span className="rate-value">1 ETH = 1,850.42 USDC</span>
                </div>
                
                <div className="card-stats">
                  <div className="stat">
                    <span className="value">0.05%</span>
                    <span className="label">Fee</span>
                  </div>
                  <div className="stat">
                    <span className="value">$1.2B</span>
                    <span className="label">Volume 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Section */}
      

{/* // Inside your component's return statement: */}
<div ref={predictionSectionRef} className="section-container full-width">
  <div className="content-container">
    <h2 className="section-title">Prediction Markets</h2>
    <p className="section-subtitle">Trade on future price movements with AI-powered insights</p>
    
    <div className="prediction-cards-container">
      <PredictionCard
        assetPair="ETH/USDT"
        currentPrice="$3,427.52"
        priceChange={2.4}
        timeRemaining="3h 45m"
        progress={65}
        volume="$1.2B"
      />
      
      <PredictionCard
        assetPair="BTC/USDT"
        currentPrice="$63,851.20"
        priceChange={1.8}
        timeRemaining="5h 12m"
        progress={40}
        volume="$3.8B"
      />
      
      <PredictionCard
        assetPair="SOL/USDT"
        currentPrice="$142.75"
        priceChange={-3.2}
        timeRemaining="7h 30m"
        progress={25}
        volume="$850M"
      />
    </div>
  </div>
</div>
    </div>
    </>
  );
}