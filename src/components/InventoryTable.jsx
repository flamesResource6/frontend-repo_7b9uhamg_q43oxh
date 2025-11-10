import React from 'react';
import { Pill, Clock, AlertTriangle } from 'lucide-react';

const getExpiryBadge = (days) => {
  if (days <= 0) return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">Expiré</span>;
  if (days <= 30) return <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">Bientôt</span>;
  return <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700">OK</span>;
};

const InventoryTable = ({ items }) => {
  return (
    <section className="bg-white border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="font-semibold">Inventaire</h2>
        <p className="text-sm text-muted-foreground">{items.length} articles</p>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Péremption</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md bg-emerald-50 text-emerald-600"><Pill className="w-4 h-4" /></span>
                    <div>
                      <p className="font-medium">{it.name}</p>
                      <p className="text-xs text-muted-foreground">{it.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{it.category}</td>
                <td className="px-4 py-3">{it.price.toFixed(2)} Dhs</td>
                <td className={`px-4 py-3 ${it.stock <= 5 ? 'text-red-600 font-medium' : ''}`}>{it.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {getExpiryBadge(it.daysToExpire)}
                    {it.stock <= 5 && <span className="inline-flex items-center gap-1 text-xs text-red-600"><AlertTriangle className="w-3 h-3" /> Faible</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InventoryTable;
