import {test} from 'node:test';
import assert from 'node:assert/strict';
import {getAdvice} from './index.js';

function makeForecast({rain = {}, uv = {}, temp = {}} = {}) {
    const hours = Array.from({length: 24}, (_, i) => i);
    return {
        hourly: {
            precipitation_probability: hours.map((h) => rain[h] ?? 0),
            uv_index: hours.map((h) => uv[h] ?? 0),
            temperature_2m: hours.map((h) => temp[h] ?? 15),
        },
    };
}

const ids = (advice) => advice.map((a) => a.id);

test('calm day gives no advice', () => {
    assert.deepEqual(ids(getAdvice(makeForecast(), 9)), []);
});
// Rain 70% at 15:00, current hour 9.
test('it will rain later, advise to bring umbrella', () => {
    assert.deepEqual(ids(getAdvice(makeForecast({rain: {15: 70}}), 9)), [
        'umbrella',
    ]);
});

// Rain 70% at 15:00, current hour 18. (It has already passed.)
test('rain has already passed, no advice', () => {
    assert.deepEqual(ids(getAdvice(makeForecast({rain: {15: 70}}), 18)), []);
});
// UV 7 at 12:00, current hour 9.
test('high uv, advise sunscreen', () => {
    assert.deepEqual(ids(getAdvice(makeForecast({uv: {12: 7}}), 9)), [
        'sunscreen',
    ]);
});
// UV 8 at 12:00 and 30°C at 14:00, current hour 9. Predict the order of the results too.
test('high uv and hot, advise sunscreen and water', () => {
    assert.deepEqual(
        ids(getAdvice(makeForecast({uv: {12: 8}, temp: {14: 30}}), 9)),
        ['sunscreen', 'water'],
    );
});
// Boundary: rain exactly 50, UV exactly 6, and temperature exactly 28, all at 15:00, current hour 9. Then a second version with 49, 5.9, and 27.9.
test('rain, uv and temp exactly at boundary, advise umbrella, sunscreen and water', () => {
    assert.deepEqual(
        ids(
            getAdvice(
                makeForecast({uv: {15: 6}, temp: {15: 28}, rain: {15: 50}}),
                9,
            ),
        ),
        ['umbrella', 'sunscreen', 'water'],
    );
});
//below boundry rain 49, UV 5.9 and temperature 27.9 at 15:00, current hour 9
test('rain, uv and temp below boundary, no advice', () => {
    assert.deepEqual(
        ids(
            getAdvice(
                makeForecast({uv: {15: 5.9}, temp: {15: 27.9}, rain: {15: 49}}),
                9,
            ),
        ),
        [],
    );
});
