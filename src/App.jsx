import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import StatsCards from './components/StatsCards.jsx';
import InventoryTable from './components/InventoryTable.jsx';
import SalesForm from './components/SalesForm.jsx';
import LowStockAlert from './components/LowStockAlert.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([
    { id: 'parac-500', name: 'Paracétamol 500mg', brand: 'Doliprane', category: 'Douleur', price: 12.5, stock: 24, daysToExpire: 180 },
    { id: 'ibup-400', name: 'Ibuprofène 400mg', brand: 'Nurofen', category: 'Anti-inflammatoire', price: 19.9, stock: 6, daysToExpire: 40 },
    { id: 'vitc-1g', name: 'Vitamine C 1g', brand: 'Redoxon', category: 'Vitamines', price: 22.0, stock: 12, daysToExpire: 320 },
    { id: 'omep-20', name: 'Oméprazole 20mg', brand: 'Mopral', category: 'Gastro', price: 34.0, stock: 4, daysToExpire: 25 },
    { id: 'amox-1g', name: 'Amoxicilline 1g', brand: 'Clamoxyl', category: 'Antibiotique', price: 48.0, stock: 18, daysToExpire: 90 },
    { id: 'lorat-10', name: 'Loratadine 10mg', brand: 'Clarityne', category: 'Allergie', price: 17.5, stock: 9, daysToExpire: 65 },
    { id: 'zinc-15', name: 'Zinc 15mg', brand: 'Solgar', category: 'Complément', price: 29.0, stock: 15, daysToExpire: 270 },
    { id: 'siro-toux', name: 'Sirop contre la toux', brand: 'Toplexil', category: 'Toux', price: 31.0, stock: 3, daysToExpire: 15 },
  ]);
  const [sales, setSales] = useState([]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return products;
    return products.filter(p => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q));
  }, [products, query]);

  const stats = useMemo(() => {
    const stock = products.reduce((sum, p) => sum + p.stock, 0);
    const todaySales = sales.reduce((sum, s) => sum + s.items.reduce((acc, i) => acc + i.qty, 0), 0);
    const revenue = sales.reduce((sum, s) => sum + s.total, 0);
    const lowStock = products.filter(p => p.stock <= 5).length;
    return { stock, sales: todaySales, revenue, lowStock };
  }, [products, sales]);

  const handleSaleSubmit = (payload) => {
    // update stock
    const updated = [...products];
    payload.items.forEach((i) => {
      const idx = updated.findIndex(p => p.id === i.id);
      if (idx !== -1) {
        updated[idx] = { ...updated[idx], stock: Math.max(0, updated[idx].stock - i.qty) };
      }
    });
    setProducts(updated);
    setSales((prev) => [...prev, { ...payload, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50">
      <Header query={query} onQueryChange={setQuery} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid gap-6">
        <LowStockAlert items={products} />

        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InventoryTable items={filtered} />
          </div>
          <div>
            <SalesForm products={products} onSubmit={handleSaleSubmit} />
          </div>
        </div>

        <section className="bg-white border rounded-lg">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 className="font-semibold">Historique des ventes</h2>
            <p className="text-sm text-muted-foreground">{sales.length} opération(s)</p>
          </div>
          <div className="p-4 grid gap-3">
            {sales.length === 0 && <p className="text-sm text-muted-foreground">Aucune vente enregistrée pour l'instant.</p>}
            {sales.map((s) => (
              <div key={s.id} className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Vente à {s.client}</p>
                  <p className="text-xs text-muted-foreground">{s.items.map(i => `${i.name} x${i.qty}`).join(', ')}</p>
                </div>
                <p className="font-semibold">{s.total.toFixed(2)} Dhs</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
