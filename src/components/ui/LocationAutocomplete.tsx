'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface City {
    id: number;
    name: string;
    admin1?: string; // State/Province
    country: string;
}

interface LocationAutocompleteProps {
    defaultValue?: string;
    name?: string;
}

export default function LocationAutocomplete({ defaultValue = '', name = 'location' }: LocationAutocompleteProps) {
    const [query, setQuery] = useState(defaultValue);
    const [results, setResults] = useState<City[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchCities = async () => {
            if (query.length < 2 || query === defaultValue) {
                setResults([]);
                setIsOpen(false);
                return;
            }

            // Only fetch if it doesn't perfectly match a previous selection structure
            // (A quick heuristic to avoid fetching if they just clicked a result)
            if (query.includes(', ') && results.some(r => `${r.name}, ${r.country}` === query)) {
                return;
            }

            setIsLoading(true);
            try {
                const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
                const data = await res.json();

                if (data.results) {
                    setResults(data.results);
                    setIsOpen(true);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Geocoding API Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timerInfo = setTimeout(searchCities, 300);
        return () => clearTimeout(timerInfo);
    }, [query, defaultValue, results]);

    const handleSelect = (city: City) => {
        const fullLocation = city.admin1 ? `${city.name}, ${city.admin1}, ${city.country}` : `${city.name}, ${city.country}`;
        setQuery(fullLocation);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-500" />
            </div>

            <input
                type="text"
                name={name}
                id={name}
                required
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (!isOpen && e.target.value.length >= 2) setIsOpen(true);
                }}
                onFocus={() => {
                    if (results.length > 0) setIsOpen(true);
                }}
                className="block w-full pl-10 pr-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors autocomplete-input"
                placeholder="e.g. London, UK"
                autoComplete="off"
            />

            {isLoading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Loader2 className="h-4 w-4 text-slate-500 animate-spin" />
                </div>
            )}

            {isOpen && results.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-2xl max-h-60 overflow-auto focus:outline-none text-sm p-1">
                    {results.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleSelect(city)}
                            className="cursor-pointer select-none relative py-2.5 px-3 rounded-md text-white hover:bg-purple-600/20 hover:text-purple-300 transition-colors flex flex-col"
                        >
                            <span className="font-semibold">{city.name}</span>
                            <span className="text-xs text-slate-400">
                                {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
