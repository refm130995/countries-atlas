import type { Country } from './types'
import populationData from './population.json'

// RestCountries v3.1 quedó deprecada, así que usamos el dataset mledoze/countries
// (la misma fuente que alimentaba RestCountries) servido por el CDN de jsDelivr,
// que es estático y estable. Las banderas SVG vienen de flagcdn.com por código ISO.
// mledoze no incluye población, así que la combinamos con cifras del World Bank
// (indicador SP.POP.TOTL, valor más reciente por país) embebidas en population.json.
const SOURCE = 'https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json'

const POPULATION = populationData as Record<string, number>

interface RawCountry {
  cca2: string
  cca3: string
  name: { common: string; official: string }
  region: string
  subregion?: string
  capital?: string[]
  population?: number
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol: string }>
  borders?: string[]
}

export async function fetchAllCountries(signal?: AbortSignal): Promise<Country[]> {
  const res = await fetch(SOURCE, { signal })
  if (!res.ok) throw new Error(`Could not load countries (${res.status}).`)
  const raw = (await res.json()) as RawCountry[]

  return raw
    .map<Country>((c) => ({
      cca3: c.cca3,
      name: c.name,
      flags: {
        svg: c.cca2 ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : '',
        alt: `Flag of ${c.name.common}`,
      },
      region: c.region,
      subregion: c.subregion,
      capital: c.capital,
      population: POPULATION[c.cca3] ?? 0,
      languages: c.languages,
      currencies: c.currencies,
      borders: c.borders,
    }))
    .filter((c) => c.region) // descarta entradas sin región (Antártida, etc.)
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
}
