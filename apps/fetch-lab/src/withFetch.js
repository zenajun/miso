// Lesson 5: write the request with fetch.
// Return the forecast data as a JavaScript object.
// If the request fails or the server says no (like a 404), throw an Error.
export async function getWithFetch(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    return data;
}
