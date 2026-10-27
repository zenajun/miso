import {useEffect, useState} from 'react';

const FALLBACK_LOCATION = {name: 'Toronto', latitude: 43.65, longitude: -79.38};

const HOURLY_FIELDS = [
    'temperature_2m',
    'apparent_temperature',
    'relative_humidity_2m',
    'precipitation_probability',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'snow_depth',
    'uv_index',
];

// Once-per-day values, so the API returns them under `daily`, not `hourly`.
const DAILY_FIELDS = ['sunrise', 'sunset', 'daylight_duration'];

function forecastUrl(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        hourly: HOURLY_FIELDS.join(','),
        daily: DAILY_FIELDS.join(','),
        timezone: 'auto',
        forecast_days: 1,
    });
    return `https://api.open-meteo.com/v1/forecast?${params}`;
}

function getPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
        });
    });
}

// Rounded to 2 decimals (~1 km): enough for weather, and the API never sees the exact spot.
async function getCoordinates() {
    try {
        const {coords} = await getPosition();
        return {
            latitude: coords.latitude.toFixed(2),
            longitude: coords.longitude.toFixed(2),
            usedFallback: false,
        };
    } catch {
        return {...FALLBACK_LOCATION, usedFallback: true};
    }
}

function App() {
    const [forecast, setForecast] = useState(null);
    const [usedFallback, setUsedFallback] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                const {latitude, longitude, usedFallback} =
                    await getCoordinates();
                setUsedFallback(usedFallback);
                const res = await fetch(forecastUrl(latitude, longitude));
                if (!res.ok)
                    throw new Error(`Request failed with status ${res.status}`);
                const data = await res.json();
                console.log(data);
                setForecast(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <p>Finding your location...</p>;
    if (error) return <p>Could not load the forecast: {error}</p>;
    return (
        <>
            {usedFallback && (
                <p>Showing {FALLBACK_LOCATION.name}, location unavailable.</p>
            )}
            <p>
                Got {forecast.hourly.time.length} hours of data. Check the
                console.
            </p>
        </>
    );
}

export default App;
