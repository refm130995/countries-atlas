import type { Country } from './types'

const BASE = 'https://restcountries.com/v3.1'
const FIELDS =
  'cca3,name,flags,region,subregion,capital,population,languages,currencies,borders'

export async function fetchAllCountries(signal?: AbortSignal): Promise<Country[]> {
  const res = await fetch(`${BASE}/all?fields=${FIELDS}`, { signal })
  if (!res.ok) throw new Error(`Could not load countries (${res.status}).`)
  const data = (await res.json()) as Country[]
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common))
}
