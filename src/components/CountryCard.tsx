import type { Country } from '../types'

interface Props {
  country: Country
  onSelect: (c: Country) => void
}

export function CountryCard({ country, onSelect }: Props) {
  return (
    <button className="ccard" onClick={() => onSelect(country)}>
      <img
        className="ccard__flag"
        src={country.flags.svg}
        alt={country.flags.alt ?? `Flag of ${country.name.common}`}
        loading="lazy"
        width={300}
        height={180}
      />
      <div className="ccard__body">
        <h3 className="ccard__name">{country.name.common}</h3>
        <dl className="ccard__facts">
          <div>
            <dt>Population</dt>
            <dd>{country.population.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Region</dt>
            <dd>{country.region}</dd>
          </div>
          <div>
            <dt>Capital</dt>
            <dd>{country.capital?.[0] ?? '—'}</dd>
          </div>
        </dl>
      </div>
    </button>
  )
}
