// Lesson 5: write the same request with axios.
// Same goal: return the forecast data, and throw an Error if it fails.
import axios from 'axios';

export async function getWithAxios(url) {
    const res = await axios.get(url);
    return res.data;
}
