import React, { useState } from 'react';
import { Timer, TrendingUp, Lock, Wallet, Construction } from 'lucide-react';
import { PROTOCOL_CONSTANTS } from '../contracts/PumpFunToken';

interface StakingMetrics {
  stakedBalance: string;
  rewardRate: number;
  nextRebase: number;
  totalStaked: string;
}

export function StakingInterface() {
  const [amount, setAmount] = useState('');
  const [metrics] = useState<StakingMetrics>({
    stakedBalance: '0.00',
    rewardRate: PROTOCOL_CONSTANTS.INITIAL_APY,
    nextRebase: Date.now() + PROTOCOL_CONSTANTS.REBASE_INTERVAL * 1000,
    totalStaked: '1,234,567',
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold pixel-text">Stake ARCAD (3,3)</h2>
        <div className="px-3 py-1 bg-green-900/50 rounded-full border border-green-500/30 text-sm text-green-400 flex items-center gap-2">
          <Construction className="w-4 h-4" />
          In Development
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="APY"
          value={`${metrics.rewardRate.toLocaleString()}%`}
          icon={TrendingUp}
          tooltip="Annual Percentage Yield"
        />
        <MetricCard
          title="Next Rebase"
          value={formatNextRebase(metrics.nextRebase)}
          icon={Timer}
          tooltip="Time until next reward distribution"
        />
        <MetricCard
          title="Your Stake"
          value={`${metrics.stakedBalance} ARCAD`}
          icon={Lock}
          tooltip="Your staked ARCAD balance"
        />
        <MetricCard
          title="Total Staked"
          value={`${metrics.totalStaked} ARCAD`}
          icon={Wallet}
          tooltip="Total ARCAD staked in protocol"
        />
      </div>

      <div className="pixel-border p-6 bg-gray-800/50 space-y-4">
        <h3 className="text-xl font-bold pixel-text">Stake ARCAD (3,3)</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-green-400">
            <span>Amount to Stake</span>
            <span>Balance: 0 ARCAD</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 p-3 bg-gray-900 pixel-border text-green-400 placeholder-green-400/50"
              placeholder="Enter ARCAD amount"
            />
            <button className="px-4 py-2 bg-green-600 pixel-corners text-white hover:bg-green-700 transition-colors">MAX</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-3 bg-green-600 pixel-corners text-white hover:bg-green-700 transition-colors">
            Stake
          </button>
          <button className="p-3 bg-red-600 pixel-corners text-white hover:bg-red-700 transition-colors">
            Unstake
          </button>
        </div>
        <div className="text-sm text-green-400/80">
          Note: Staking puts you in (3,3) - the optimal game theory position
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RewardTracker />
        <StakingStats />
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, tooltip }) {
  return (
    <div className="pixel-border p-4 bg-gray-800/50 hover-scale" title={tooltip}>
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-green-400/90">{title}</div>
        <Icon className="w-5 h-5 text-green-400" />
      </div>
      <div className="text-2xl font-bold pixel-text">{value}</div>
    </div>
  );
}

function RewardTracker() {
  return (
    <div className="pixel-border p-4 bg-gray-800/50">
      <h4 className="text-lg font-bold mb-4 pixel-text">Reward Tracker</h4>
      <div className="space-y-3">
        <div className="flex justify-between text-green-400">
          <span>Next Reward Amount</span>
          <span>+0.5385 ARCAD</span>
        </div>
        <div className="flex justify-between text-green-400">
          <span>Next Reward Yield</span>
          <span>0.4578%</span>
        </div>
        <div className="flex justify-between text-green-400">
          <span>ROI (5-Day Rate)</span>
          <span>7.1234%</span>
        </div>
      </div>
    </div>
  );
}

function StakingStats() {
  return (
    <div className="pixel-border p-4 bg-gray-800/50">
      <h4 className="text-lg font-bold mb-4 pixel-text">Staking Stats</h4>
      <div className="space-y-3">
        <div className="flex justify-between text-green-400">
          <span>Total Value Locked</span>
          <span>$12.5M</span>
        </div>
        <div className="flex justify-between text-green-400">
          <span>Current Index</span>
          <span>7.85 ARCAD</span>
        </div>
        <div className="flex justify-between text-green-400">
          <span>Risk Free Value</span>
          <span>$8.2M</span>
        </div>
      </div>
    </div>
  );
}

function formatNextRebase(timestamp: number): string {
  const now = Date.now();
  const diff = timestamp - now;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}