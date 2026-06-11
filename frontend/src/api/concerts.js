const API_BASE_URL = 'http://localhost:3000';

const CONCERTS_ENDPOINT = `${API_BASE_URL}/api/concerts`;

export const getConcerts = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${CONCERTS_ENDPOINT}?${query}`);

    if (!res.ok) throw new Error("Failed to fetch concerts, filters: ", filters);
    return res.json();
};

export const getConcertById = async (id) => {
    const res = await fetch(`${CONCERTS_ENDPOINT}/${id}`);
    if (!res.ok) throw new Error('Concert not found');
    return res.json();
};