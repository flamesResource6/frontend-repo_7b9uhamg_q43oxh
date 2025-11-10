import React from 'react';
import { AlertTriangle } from 'lucide-react';

const LowStockAlert = ({ items }) => {
  const low = items.filter((i) => i.stock <= 5);
  if (!low.length) return null;

  return (
    <section className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 mt-0.5" />
      <div>
        <p className="font-medium">Alerte stock faible</p>
        <p className="text-sm mt-1">{low.length} article(s) proche(s) de la rupture: {low.map(i => i.name).join(', ')}.</p>
      </div>
    </section>
  );
};

export default LowStockAlert;
