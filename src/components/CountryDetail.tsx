import type { Country } from '../types'

interface Props {
  country: Country
  byCode: Map<string, Country>
  onBack: () => void
  onSelect: (c: Country) => void
}

export function CountryDetail({ country, byCode, onBack, onSelect }: Props) {
  const languages = country.languages ? Object.values(country.languages).join(', ') : '—'
  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => c.name).join(', ')
    : '—'

  return (
    <div className="detail">
      <button className="btn" onClick={onBack}>
        ← Back
      </button>

      <div className="detail__grid">
        <img
          className="detail__flag"
          src={country.flags.svg}
          alt={country.flags.alt ?? `Flag of ${country.name.common}`}
        />

        <div>
          <h2 className="detail__name">{country.name.common}</h2>
          <p className="detail__official">{country.name.official}</p>

          <dl className="detail__facts">
            <div><dt>Region</dt><dd>{country.region}</dd></div>
            <div><dt>Subregion</dt><dd>{country.subregion ?? '—'}</dd></div>
            <div><dt>Capital</dt><dd>{country.capital?.[0] ?? '—'}</dd></div>
            <div><dt>Population</dt><dd>{country.population.toLocaleString()}</dd></div>
            <div><dt>Languages</dt><dd>{languages}</dd></div>
            <div><dt>Currencies</dt><dd>{currencies}</dd></div>
          </dl>

          {country.borders && country.borders.length > 0 && (
            <div className="detail__borders">
              <span className="detail__borders-label">Borders:</span>
              {country.borders.map((code) => {
                const neighbour = byCode.get(code)
                return neighbour ? (
                  <button key={code} className="chip" onClick={() => onSelect(neighbour)}>
                    {neighbour.name.common}
                  </button>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
