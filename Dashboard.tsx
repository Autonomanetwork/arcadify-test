import React from 'react';
import { TrendingUp, DollarSign, Percent, Users, BarChart2, Clock, ArrowUpRight, ArrowDownRight, Construction } from 'lucide-react';

const MetricCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }) => (
  <div className="pixel-border p-4 bg-gray-800/50 hover-scale">
    <div className="flex justify-between items-start mb-2">
      <div className="text-sm text-green-400/90">{title}</div>
      <Icon className="w-5 h-5 text-green-400" />
    </div>
    <div className="text-2xl font-bold mb-1 pixel-text">
      {prefix}{value}{suffix}
    </div>
    {change && (
      <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {Math.abs(change)}%
      </div>
    )}
  </div>
);

const ChartPanel = ({ title, children }) => (
  <div className="pixel-border p-4 bg-gray-800/50 relative">
    <div className="absolute top-2 right-2">
      <div className="px-2 py-1 bg-green-900/50 rounded-full border border-green-500/30 text-xs text-green-400 flex items-center gap-1">
        <Construction className="w-3 h-3" />
        Coming Soon
      </div>
    </div>
    <h3 className="text-lg font-bold mb-4 pixel-text flex items-center gap-2">
      <BarChart2 className="w-5 h-5" />
      {title}
    </h3>
    {children}
  </div>
);

const RecentActivity = () => (
  <div className="pixel-border p-4 bg-gray-800/50">
    <h3 className="text-lg font-bold mb-4 pixel-text flex items-center gap-2">
      <Clock className="w-5 h-5" />
      Recent Activity
    </h3>
    <div className="space-y-3">
      {[
        { action: 'Stake', amount: '1,000 ARCAD', time: '5m ago' },
        { action: 'Reward', amount: '50 ARCAD', time: '1h ago' },
        { action: 'Unstake', amount: '500 ARCAD', time: '3h ago' },
      ].map((activity, i) => (
        <div key={i} className="flex justify-between items-center p-2 bg-gray-900/50 pixel-border">
          <div>
            <div className="text-sm font-medium text-green-400">{activity.action}</div>
            <div className="text-xs text-green-400/80">{activity.amount}</div>
          </div>
          <div className="text-xs text-green-400/60">{activity.time}</div>
        </div>
      ))}
    </div>
  </div>
);

const ChartPlaceholder = () => (
  <div className="h-48 bg-gray-900/50 rounded-lg flex items-center justify-center">
    <div className="text-sm text-green-400/70">Chart visualization coming soon</div>
  </div>
);

export function Dashboard() {
  const metrics = [
    { title: 'ARCAD Price', value: '0.001', prefix: '$', change: 5.2, icon: DollarSign },
    { title: 'Market Cap', value: '1M', prefix: '$', change: -2.1, icon: TrendingUp },
    { title: 'APY', value: '3,321', suffix: '%', change: 0.5, icon: Percent },
    { title: 'Total Stakers', value: '1,234', change: 12.3, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold pixel-text">Dashboard</h2>
        <div className="px-3 py-1 bg-green-900/50 rounded-full border border-green-500/30 text-sm text-green-400 flex items-center gap-2">
          <Construction className="w-4 h-4" />
          Beta
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartPanel title="Price History">
          <ChartPlaceholder />
        </ChartPanel>
        <ChartPanel title="Total Value Locked">
          <ChartPlaceholder />
        </ChartPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 pixel-border p-4 bg-gray-800/50">
          <h3 className="text-lg font-bold mb-4 pixel-text">Protocol Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-900/50 pixel-border">
              <div className="text-sm text-green-400/80">Circulating Supply</div>
              <div className="text-lg font-bold text-green-400">500,000,000 ARCAD</div>
            </div>
            <div className="p-3 bg-gray-900/50 pixel-border">
              <div className="text-sm text-green-400/80">Total Supply</div>
              <div className="text-lg font-bold text-green-400">1,000,000,000 ARCAD</div>
            </div>
            <div className="p-3 bg-gray-900/50 pixel-border">
              <div className="text-sm text-green-400/80">Treasury Balance</div>
              <div className="text-lg font-bold text-green-400">$5.6M</div>
            </div>
            <div className="p-3 bg-gray-900/50 pixel-border">
              <div className="text-sm text-green-400/80">Backing per ARCAD</div>
              <div className="text-lg font-bold text-green-400">$4.53</div>
            </div>
          </div>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}