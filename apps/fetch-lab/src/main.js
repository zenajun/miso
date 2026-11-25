import 'app-nav';
import {getWithFetch} from './withFetch.js';
import {getWithAxios} from './withAxios.js';

// Same request as the weather app, for Toronto.
const URLS = {
    good: 'https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=-79.38&hourly=temperature_2m&forecast_days=1',
    bad: 'https://api.open-meteo.com/v1/not-a-real-endpoint',
};

function selectedUrl() {
    return URLS[document.querySelector('input[name="url"]:checked').value];
}

// Runs one of your functions and prints whatever it returns or throws.
async function run(fn, outputId) {
    const out = document.getElementById(outputId);
    out.className = '';
    out.textContent = 'Loading...';
    try {
        const data = await fn(selectedUrl());
        out.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        out.className = 'error';
        out.textContent = `Threw: ${err.message}`;
    }
}

document.getElementById('run-fetch').addEventListener('click', () => run(getWithFetch, 'out-fetch'));
document.getElementById('run-axios').addEventListener('click', () => run(getWithAxios, 'out-axios'));
