import React from 'react';
import { DollarSign, PieChart, TrendingUp, Shield, Construction } from 'lucide-react';
import { ITreasury } from '../contracts/PumpFunToken';

const MOCK_TREASURY: ITreasury = {
  riskFreeValue: BigInt(8_200_000 * 10**18), // $8.2M
  totalValue: BigInt(12_500_000 * 10**18), // $12.5M
  reserves: {
    USDC: BigInt(5_000_000 * 10**6), // $5M USDC
    wETH: BigInt(1000 * 10**18), // 1000 ETH
    lpTokens: BigInt(2_500_000 * 10**18), // $2.5M in LP
  },
};

export function TreasuryDashboard() {
  const metrics = [
    { title: 'Treasury Balance', value: `$${formatValue(MOCK_TREASURY.totalValue)}`, icon: DollarSign },
    { title: 'Risk Free Value', value: `$${formatValue(MOCK_TREASURY.riskFreeValue)}`, icon: Shield },
    { title: 'ARCAD Backing', value: '$8.25', icon: TrendingUp },
    { title: 'Protocol-Owned Liquidity', value: '98.5%', icon: PieChart },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold pixel-text">Treasury Overview</h2>
        <div className="px-3 py-1 bg-green-900/50 rounded-full border border-green-500/30 text-sm text-green-400 flex items-center gap-2">
          <Construction className="w-4 h-4" />
          In Development
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Treasury Balance"
          value={`$${formatValue(MOCK_TREASURY.totalValue)}`}
          icon={DollarSign}
        />
        <MetricCard
          title="Risk Free Value"
          value={`$${formatValue(MOCK_TREASURY.riskFreeValue)}`}
          icon={Shield}
        />
        <MetricCard
          title="ARCAD Backing"
          value="$8.25"
          icon={TrendingUp}
        />
        <MetricCard
          title="Protocol-Owned Liquidity"
          value="98.5%"
          icon={PieChart}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="pixel-border p-4 bg-gray-800/50">
          <h3 className="text-lg font-bold mb-4 pixel-text">Treasury Assets</h3>
          <div className="space-y-4">
            <AssetRow
              asset="USDC"
              amount={MOCK_TREASURY.reserves.USDC}
              decimals={6}
              price={1}
            />
            <AssetRow
              asset="wETH"
              amount={MOCK_TREASURY.reserves.wETH}
              decimals={18}
              price={2000}
            />
            <AssetRow
              asset="LP Tokens"
              amount={MOCK_TREASURY.reserves.lpTokens}
              decimals={18}
              price={1}
            />
          </div>
        </div>

        <div className="pixel-border p-4 bg-gray-800/50">
          <h3 className="text-lg font-bold mb-4 pixel-text">Treasury Strategy</h3>
          <div className="space-y-4">
            <StrategyRow
              strategy="Stablecoin Yield"
              allocation="40%"
              apy="12%"
              value="$5M"
            />
            <StrategyRow
              strategy="ETH Staking"
              allocation="20%"
              apy="5%"
              value="$2M"
            />
            <StrategyRow
              strategy="LP Rewards"
              allocation="40%"
              apy="25%"
              value="$5M"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon }) {
  return (
    <div className="pixel-border p-4 bg-gray-800/50 hover-scale">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-green-400/90">{title}</div>
        <Icon className="w-5 h-5 text-green-400" />
      </div>
      <div className="text-2xl font-bold pixel-text">{value}</div>
    </div>
  );
}

function AssetRow({ asset, amount, decimals, price }) {
  const value = Number(amount) / 10**decimals * price;
  
  return (
    <div className="flex justify-between items-center p-3 bg-gray-900/50 pixel-border">
      <div>
        <div className="font-bold text-green-400">{asset}</div>
        <div className="text-sm text-green-400/80">
          {(Number(amount) / 10**decimals).toLocaleString()} {asset}
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-green-400">${value.toLocaleString()}</div>
        <div className="text-sm text-green-400/80">{((value / 12500000) * 100).toFixed(1)}% of Treasury</div>
      </div>
    </div>
  );
}

function StrategyRow({ strategy, allocation, apy, value }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-900/50 pixel-border">
      <div>
        <div className="font-bold text-green-400">{strategy}</div>
        <div className="text-sm text-green-400/80">Allocation: {allocation}</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-green-400">{value}</div>
        <div className="text-sm text-green-400">APY: {apy}</div>
      </div>
    </div>
  );
}

function formatValue(value: bigint): string {
  return (Number(value) / 10**18).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
