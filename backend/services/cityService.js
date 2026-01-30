const pool = require('../config/database');

const findOrCreateCity = async (name, country, dmaId = null) => {
    if (!name || !country) {
        throw new Error('City name and country are required');
    }

    const normalizedName = name.trim();
    const normalizedCountry = country.trim();

    const existing = await pool.query(
        'SELECT city_id FROM cities WHERE name = $1 AND country = $2',
        [normalizedName, normalizedCountry]
    );

    if (existing.rows.length > 0) return existing.rows[0].city_id;

    const result = await pool.query(
        `
        INSERT INTO cities (name, country, dma_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (name, country)
        DO UPDATE SET dma_id = COALESCE(cities.dma_id, EXCLUDED.dma_id)
        RETURNING city_id;
        `,
        [normalizedName, normalizedCountry, dmaId]
    );
    return result.rows[0].city_id;
};

module.exports = { findOrCreateCity };