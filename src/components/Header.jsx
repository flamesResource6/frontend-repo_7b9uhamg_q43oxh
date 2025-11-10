import React from 'react';
import { Pill, Search } from 'lucide-react';

const Header = ({ query, onQueryChange }) => {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Gestion de Pharmacie</h1>
            <p className="text-xs text-muted-foreground">Inventaire, ventes et alertes</p>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Rechercher un médicament, une catégorie..."
            aria-label="Rechercher"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
