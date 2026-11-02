import {useEffect, useState, useCallback} from 'react';
import {getAdvice} from 'weather-advice';

const DEFAULT_PLACE = {name: 'Toronto', latitude: 43.65, longitude: -79.38};

async function loadForecast() {
    const place = await getLocation();

    let res;
    try {
        res = await fetch(buildUrl(place));
    } catch {
        throw new Error(
            'Could not reach the forecast service. Check your connection.',
        );
    }
    if (!res.ok) {
        throw new Error(
            `The forecast service returned an error (${res.status}).`,
        );
    }

    const data = await res.json();
    if (!data?.hourly?.time) {
        throw new Error('The forecast came back in an unexpected format.');
    }
    return {place, data};
}

function show(value, suffix = '') {
    return value == null ? 'n/a' : `${value}${suffix}`;
}

function getLocation() {
    return new Promise((resolve) => {
        const fallback = {...DEFAULT_PLACE, isDefault: true};
        if (!('geolocation' in navigator)) {
            resolve(fallback);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                resolve({
                    name: 'Your location',
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    isDefault: false,
                }),
            () => resolve(fallback),
            {timeout: 8000},
        );
    });
}

function buildUrl({latitude, longitude}) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,uv_index&timezone=auto&forecast_days=1`;
}

function currentHourAt(data) {
    const localMs = Date.now() + data.utc_offset_seconds * 1000;
    return new Date(localMs).getUTCHours();
}

function App() {
    const [state, setState] = useState({status: 'loading'});

    const load = useCallback(async () => {
        try {
            const {place, data} = await loadForecast();
            setState({status: 'ready', place, data});
        } catch (err) {
            setState({status: 'error', message: err.message});
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    function retry() {
        setState({status: 'loading'});
        load();
    }

    if (state.status === 'loading') return <p>Loading forecast...</p>;
    if (state.status === 'error') {
        return (
            <main>
                <p>{state.message}</p>
                <button onClick={retry}>Try again</button>
            </main>
        );
    }

    const {place, data} = state;
    const hour = currentHourAt(data);
    const advice = getAdvice(data, hour);

    return (
        <main>
            <h1>{place.name}</h1>
            {place.isDefault && (
                <p>
                    Showing the default city because your location was not
                    available. Allow location access in your browser and reload
                    to see your own forecast.
                </p>
            )}

            <section>
                <h2>Right now</h2>
                <p>
                    {show(
                        data.hourly.temperature_2m?.[hour],
                        data.hourly_units?.temperature_2m,
                    )}
                </p>
                <p>
                    Rain chance:{' '}
                    {show(data.hourly.precipitation_probability?.[hour], '%')}
                </p>
                <p>UV index: {show(data.hourly.uv_index?.[hour])}</p>
            </section>

            <section>
                <h2>What to bring</h2>
                {advice.length === 0 ? (
                    <p>
                        No rain, strong sun, or heat expected from now on.
                        Nothing special to bring.
                    </p>
                ) : (
                    <ul>
                        {advice.map((a) => (
                            <li key={a.id}>{a.message}</li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
export default App;
