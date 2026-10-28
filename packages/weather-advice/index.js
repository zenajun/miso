const RAIN_CHANCE = 50;
const HIGH_UV = 6;
const HOT = 28;

function anyAtLeast(values, limit, fromHour) {
    return (values ?? []).slice(fromHour).some((v) => (v ?? 0) >= limit);
}

export function getAdvice(forecast, currentHour = 0) {
    const hourly = forecast?.hourly;
    if (!hourly) return [];

    const advice = [];

    if (
        anyAtLeast(hourly.precipitation_probability, RAIN_CHANCE, currentHour)
    ) {
        advice.push({
            id: 'umbrella',
            message:
                'Rain is likely later today. Bring an umbrella or raincoat.',
        });
    }
    if (anyAtLeast(hourly.uv_index, HIGH_UV, currentHour)) {
        advice.push({
            id: 'sunscreen',
            message: 'UV will be high. Wear sunscreen.',
        });
    }
    if (anyAtLeast(hourly.temperature_2m, HOT, currentHour)) {
        advice.push({id: 'water', message: 'It will be hot. Bring water.'});
    }

    return advice;
}
