import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Construction } from 'lucide-react';
import { useRaydium } from '../hooks/useRaydium';
import { TokenInfo } from '../api/raydium';

interface SwapInterfaceProps {
  className?: string;
}

function PixelButton({ children, onClick, className = '', disabled = false }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white 
        border-b-4 border-r-4 border-green-900 active:border-0 
        active:translate-y-1 active:translate-x-1 
        transition-all duration-100 pixel-corners 
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function SwapInterface({ className = '' }: SwapInterfaceProps) {
  const { tokens, loading, error, calculateSwap } = useRaydium();
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [swapFee, setSwapFee] = useState<number>(0);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    const updateSwapCalculation = async () => {
      if (!fromToken || !toToken || !fromAmount || isNaN(parseFloat(fromAmount))) {
        setToAmount('');
        setPrice(null);
        return;
      }

      try {
        setCalculating(true);
        const { outputAmount, price, fee } = await calculateSwap(
          fromToken,
          toToken,
          parseFloat(fromAmount)
        );
        setToAmount(outputAmount.toFixed(6));
        setPrice(price);
        setSwapFee(fee);
      } catch (err) {
        console.error('Failed to calculate swap:', err);
        setToAmount('');
        setPrice(null);
      } finally {
        setCalculating(false);
      }
    };

    updateSwapCalculation();
  }, [fromToken, toToken, fromAmount]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
    setToAmount('');
  };

  if (loading) {
    return <div className="text-center text-green-400">Loading Raydium data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">Error: {error}</div>;
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold pixel-text">Token Swap</h2>
        <div className="px-3 py-1 bg-green-900/50 rounded-full border border-green-500/30 text-sm text-green-400 flex items-center gap-2">
          <Construction className="w-4 h-4" />
          In Progress
        </div>
      </div>
      <div className="pixel-border p-4 bg-gray-800/50 space-y-4">
        <div className="space-y-2">
          <label className="text-green-400">From</label>
          <div className="flex gap-2">
            <select 
              className="flex-1 p-2 bg-gray-800 pixel-border text-green-400"
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
            >
              <option value="">Select token</option>
              {tokens.map((token: TokenInfo) => (
                <option key={token.mint} value={token.mint}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input 
              type="text" 
              className="flex-1 p-2 bg-gray-800 pixel-border text-green-400 placeholder-green-400/50"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div 
            className="p-2 bg-green-700 rounded-full hover:bg-green-600 cursor-pointer transition-colors"
            onClick={handleSwapTokens}
          >
            <ArrowLeftRight className="w-6 h-6 text-green-100" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-green-400">To</label>
          <div className="flex gap-2">
            <select 
              className="flex-1 p-2 bg-gray-800 pixel-border text-green-400"
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
            >
              <option value="">Select token</option>
              {tokens.map((token: TokenInfo) => (
                <option key={token.mint} value={token.mint}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input 
              type="text" 
              className="flex-1 p-2 bg-gray-800 pixel-border text-green-400"
              placeholder="0.0"
              value={toAmount}
              readOnly
            />
          </div>
        </div>

        {price && (
          <div className="p-3 bg-gray-800 pixel-border mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-green-400/80">Rate</span>
              <span className="text-green-400">
                1 {tokens.find(t => t.mint === fromToken)?.symbol} = {price.toFixed(6)} {tokens.find(t => t.mint === toToken)?.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-400/80">Fee</span>
              <span className="text-green-400">
                {swapFee.toFixed(6)} {tokens.find(t => t.mint === toToken)?.symbol}
              </span>
            </div>
          </div>
        )}

        <PixelButton 
          className="w-full"
          disabled={!fromToken || !toToken || !fromAmount || calculating}
        >
          {calculating ? 'Calculating...' : 'Swap Tokens'}
        </PixelButton>
      </div>
    </div>
  );
}