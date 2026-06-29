export interface Country {
  cca3: string
  name: { common: string; official: string }
  flags: { svg: string; alt?: string }
  region: string
  subregion?: string
  capital?: string[]
  population: number
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol: string }>
  borders?: string[]
}

export type Async<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const
export type Region = (typeof REGIONS)[number]
