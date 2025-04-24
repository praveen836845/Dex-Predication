import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './PredictionPage.css';

// Mock data for the prediction markets
const predictionData = {
  'ETH/USDT': {
    currentPrice: 3427.52,
    change: +2.4,
    volume: '1.2B',
    timeRemaining: '3h 45m',
    progress: 65,
    description: 'Ethereum price prediction market'
  },
  'BTC/USDT': {
    currentPrice: 63851.20,
    change: +1.8,
    volume: '3.8B',
    timeRemaining: '5h 12m',
    progress: 40,
    description: 'Bitcoin price prediction market'
  },
  'SOL/USDT': {
    currentPrice: 142.75,
    change: -3.2,
    volume: '850M',
    timeRemaining: '7h 30m',
    progress: 25,
    description: 'Solana price prediction market'
  }
};

// Mock voting data
const votingData = Array(10).fill(0).map((_, i) => ({
  id: i + 1,
  voter: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
  amount: `${(Math.random() * 10).toFixed(2)} ETH`,
  prediction: Math.random() > 0.5 ? 'Up' : 'Down',
  timestamp: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m ago`
}));

export default function PredictionPage() {
  const { asset } = useParams();
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState<any>(null);
  const [voteDirection, setVoteDirection] = useState<'up' | 'down' | null>(null);
  const [voteAmount, setVoteAmount] = useState('');

  useEffect(() => {
    if (asset && predictionData[asset as keyof typeof predictionData]) {
      setMarketData(predictionData[asset as keyof typeof predictionData]);
      
      // Animation on load
      gsap.from('.prediction-header', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      gsap.from('.market-details', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });
      
      gsap.from('.vote-section', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });
      
      gsap.from('.votes-table', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      });
    } else {
      navigate('/');
    }
  }, [asset, navigate]);

  const handleVote = () => {
    if (voteDirection && voteAmount) {
      // Here you would typically send the vote to your backend
      alert(`Voted ${voteDirection} with ${voteAmount} ETH`);
      // Reset form
      setVoteDirection(null);
      setVoteAmount('');
    }
  };

  if (!marketData) return <div className="loading">Loading...</div>;

  return (
    <div className="prediction-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Markets
      </button>
      
      <div className="prediction-header">
        <h1>{asset} Prediction Market</h1>
        <p className="market-description">{marketData.description}</p>
      </div>
      
      <div className="market-details">
        <div className="price-info">
          <h2>Current Price</h2>
          <div className="price-display">
            <span className="current-price">${marketData.currentPrice.toLocaleString()}</span>
            <span className={`price-change ${marketData.change > 0 ? 'positive' : 'negative'}`}>
              {marketData.change > 0 ? '+' : ''}{marketData.change}%
            </span>
          </div>
        </div>
        
        <div className="market-stats">
          <div className="stat-item">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">${marketData.volume}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Time Remaining</div>
            <div className="stat-value">{marketData.timeRemaining}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Market Progress</div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${marketData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="vote-section">
        <h2>Place Your Prediction</h2>
        <div className="vote-actions">
          <button 
            className={`up-btn ${voteDirection === 'up' ? 'active' : ''}`}
            onClick={() => setVoteDirection('up')}
          >
            Up ↑
          </button>
          <button 
            className={`down-btn ${voteDirection === 'down' ? 'active' : ''}`}
            onClick={() => setVoteDirection('down')}
          >
            Down ↓
          </button>
        </div>
        
        <div className="vote-amount">
          <input
            type="number"
            placeholder="Amount (ETH)"
            value={voteAmount}
            onChange={(e) => setVoteAmount(e.target.value)}
          />
          <button 
            className="submit-vote"
            onClick={handleVote}
            disabled={!voteDirection || !voteAmount}
          >
            Submit Prediction
          </button>
        </div>
        
        <div className="vote-stats">
          <div className="stat">
            <span className="label">Total Up Votes:</span>
            <span className="value">1,245 (62%)</span>
          </div>
          <div className="stat">
            <span className="label">Total Down Votes:</span>
            <span className="value">763 (38%)</span>
          </div>
          <div className="stat">
            <span className="label">Total Value:</span>
            <span className="value">842 ETH</span>
          </div>
        </div>
      </div>
      
      <div className="votes-table-container">
        <h2 className='votes-table-label'>Recent Predictions</h2>
        <table className="votes-table">
          <thead>
            <tr>
              <th>Voter</th>
              <th>Amount</th>
              <th>Prediction</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {votingData.map((vote) => (
              <tr key={vote.id}>
                <td>{vote.voter}</td>
                <td>{vote.amount}</td>
                <td>
                  <span className={`prediction-badge ${vote.prediction.toLowerCase()}`}>
                    {vote.prediction}
                  </span>
                </td>
                <td>{vote.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}