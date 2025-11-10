import React from 'react';
import { Package, ShoppingCart, AlertTriangle, DollarSign } from 'lucide-react';

const Stat = ({ icon: Icon, label, value, trend }) => (
  <div className="flex items-center justify-between p-4 rounded-lg border bg-white shadow-sm">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-emerald-50 text-emerald-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
    {trend && (
      <span className={`text-sm ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{trend}</span>
    )}
  </div>
);

const StatsCards = ({ stats }) => {
  const items = [
    { icon: Package, label: 'Produits en stock', value: stats.stock || 0, trend: '+3%' },
    { icon: ShoppingCart, label: 'Ventes du jour', value: stats.sales || 0, trend: '+12%' },
    { icon: DollarSign, label: 'Revenu du jour', value: `${stats.revenue || 0} Dhs`, trend: '+8%' },
    { icon: AlertTriangle, label: 'Ruptures potentielles', value: stats.lowStock || 0, trend: '-2%' },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((s, idx) => (
        <Stat key={idx} {...s} />
      ))}
    </section>
  );
};

export default StatsCards;
