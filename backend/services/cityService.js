const pool = require('../config/database')

const findOrCreateCity = async (name, country, dmaId = null) => {
    if (!name || !country) {
        throw new Error('City name and country are required');
    }

    const normalizedName = name.trim();
    const normalizedCountry = country.trim();

    const result = await pool.query(
        `
        INSERT INTO cities (name, country, dma_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (name, country)
        DO UPDATE SET dma_id = COALSECE(cities.dma_id, EXCLUDED.dma_id)
        RETURNING id
        `,
        [normalizedName, normalizedCountry, dmaId]
    );
    return result.rows[0].id;
};

module.exports = { findOrCreateCity };