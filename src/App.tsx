import { useEffect, useMemo, useState } from 'react'
import { fetchAllCountries } from './api'
import { CountryCard } from './components/CountryCard'
import { CountryDetail } from './components/CountryDetail'
import { REGIONS, type Async, type Country } from './types'

export default function App() {
  const [state, setState] = useState<Async<Country[]>>({ status: 'loading' })
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState<string>('')
  const [selected, setSelected] = useState<Country | null>(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetchAllCountries(ctrl.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({ status: 'error', message: err instanceof Error ? err.message : 'Error' })
      })
    return () => ctrl.abort()
  }, [])

  const byCode = useMemo(() => {
    const map = new Map<string, Country>()
    if (state.status === 'success') for (const c of state.data) map.set(c.cca3, c)
    return map
  }, [state])

  const filtered = useMemo(() => {
    if (state.status !== 'success') return []
    const q = query.trim().toLowerCase()
    return state.data.filter((c) => {
      const matchesQuery = !q || c.name.common.toLowerCase().includes(q)
      const matchesRegion = !region || c.region === region
      return matchesQuery && matchesRegion
    })
  }, [state, query, region])

  if (selected) {
    return (
      <Shell>
        <CountryDetail
          country={selected}
          byCode={byCode}
          onBack={() => setSelected(null)}
          onSelect={setSelected}
        />
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="controls">
        <input
          className="controls__search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a country…"
          aria-label="Search for a country"
        />
        <select
          className="controls__region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          aria-label="Filter by region"
        >
          <option value="">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {state.status === 'loading' && <p className="msg">Loading countries…</p>}
      {state.status === 'error' && <p className="msg msg--err">⚠ {state.message}</p>}

      {state.status === 'success' && (
        <>
          <p className="count">{filtered.length} countries</p>
          <div className="grid">
            {filtered.map((c) => (
              <CountryCard key={c.cca3} country={c} onSelect={setSelected} />
            ))}
          </div>
        </>
      )}
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <header className="topbar">
        <h1 className="topbar__title">🌍 Countries Atlas</h1>
        <span className="topbar__sub">React + TypeScript · REST Countries API</span>
      </header>
      <main className="container">{children}</main>
    </div>
  )
}
