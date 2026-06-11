const API_BASE_URL = 'http://localhost:3000';

const TOURS_ENDPOINT = `${API_BASE_URL}/api/tours`;

export const getTours = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${TOURS_ENDPOINT}?${query}`);

    if (!res.ok) throw new Error("Failed to fetch tours, filters: ", filters);
    return res.json();
};

export const getTourById = async (id) => {
    const res = await fetch(`${TOURS_ENDPOINT}/${id}`);
    if (!res.ok) throw new Error('Tour not found');
    return res.json();
};