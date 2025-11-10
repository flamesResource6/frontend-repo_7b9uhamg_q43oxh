import React, { useState } from 'react';
import { Plus, Minus, CreditCard } from 'lucide-react';

const SalesForm = ({ products, onSubmit }) => {
  const [items, setItems] = useState([]);
  const [client, setClient] = useState('');

  const addItem = (product) => {
    const exists = items.find((i) => i.id === product.id);
    if (exists) {
      setItems(items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setItems([...items, { id: product.id, name: product.name, price: product.price, qty: 1 }]);
    }
  };

  const removeItem = (id) => setItems(items.filter((i) => i.id !== id));
  const updateQty = (id, delta) => setItems(items.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) return;
    onSubmit({ client: client || 'Client', items, total });
    setItems([]);
    setClient('');
  };

  return (
    <section className="bg-white border rounded-lg">
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold">Nouvelle vente</h2>
      </div>
      <div className="p-4 grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          {products.slice(0, 8).map((p) => (
            <button
              key={p.id}
              className="p-3 border rounded-md text-left hover:bg-slate-50"
              onClick={() => addItem(p)}
            >
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.price.toFixed(2)} Dhs</p>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Nom du client (optionnel)"
          />

          <div className="border rounded-md divide-y">
            {items.length === 0 && (
              <p className="p-3 text-sm text-muted-foreground">Ajoutez des articles à la vente…</p>
            )}
            {items.map((i) => (
              <div key={i.id} className="p-3 flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.price.toFixed(2)} Dhs</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => updateQty(i.id, -1)} className="p-2 border rounded"><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center">{i.qty}</span>
                  <button type="button" onClick={() => updateQty(i.id, 1)} className="p-2 border rounded"><Plus className="w-4 h-4" /></button>
                  <button type="button" onClick={() => removeItem(i.id)} className="px-2 py-1 border rounded text-sm">Retirer</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-lg font-semibold">{total.toFixed(2)} Dhs</p>
          </div>

          <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50" disabled={!items.length}>
            <CreditCard className="w-4 h-4" /> Encaisser
          </button>
        </form>
      </div>
    </section>
  );
};

export default SalesForm;
