import {useEffect, useState} from 'react';
import {getAdvice} from 'weather-advice';

const DEFAULT_PLACE = {name: 'Toronto', latitude: 43.65, longitude: -79.38};

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

    useEffect(() => {
        async function load() {
            try {
                const place = await getLocation();
                const res = await fetch(buildUrl(place));
                if (!res.ok)
                    throw new Error(`Request failed with status ${res.status}`);
                const data = await res.json();
                setState({status: 'ready', place, data});
            } catch (err) {
                setState({status: 'error', message: err.message});
            }
        }
        load();
    }, []);

    if (state.status === 'loading') return <p>Loading forecast...</p>;
    if (state.status === 'error')
        return <p>Could not load the forecast: {state.message}</p>;

    const {place, data} = state;
    const hour = currentHourAt(data);
    const advice = getAdvice(data, hour);

    return (
        <main>
            <h1>{place.name}</h1>
            {place.isDefault && (
                <p>
                    Showing the default city because your location was not
                    available.
                </p>
            )}

            <section>
                <h2>Right now</h2>
                <p>
                    {data.hourly.temperature_2m[hour]}
                    {data.hourly_units.temperature_2m}
                </p>
                <p>
                    Rain chance: {data.hourly.precipitation_probability[hour]}%
                </p>
                <p>UV index: {data.hourly.uv_index[hour]}</p>
            </section>

            <section>
                <h2>What to bring</h2>
                {advice.length === 0 ? (
                    <p>Nothing special today.</p>
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
