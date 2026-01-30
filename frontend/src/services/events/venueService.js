export const createVenue = async ({ name, city_id }) => {
    const res = await fetch(`${API_BASE_URL}/api/venues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, city_id })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || 'Venue creation failed');
    }

    return data;
};