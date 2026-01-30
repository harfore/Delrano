const API_BASE_URL = 'http://localhost:3000';

export const getCities = async () => {
    const res = await fetch(`${API_BASE_URL}/api/cities`);
    if (!res.ok) throw new Error('Failed to fetch cities');
    return res.json();
}

export const getCityById = async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/cities/${id}`);
    if (!res.ok) throw new Error('City not found');
    return res.json();
};

export const createCity = async ({ name, country }) => {
    const res = await fetch(`${API_BASE_URL}/api/cities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, country })
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return res.json();
};