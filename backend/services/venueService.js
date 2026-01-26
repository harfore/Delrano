const pool = require('../config/database');

const findOrCreateVenue = async ({ name, city_id }) => {
    const result = await pool.query(
        `INSERT INTO venues (name, city_id)
        VALUES ($1, $2)
        ON CONFLICT (name, city_id)
        DO UPDATE SET name = EXCLUDED.name
        REUTURNING id`,
        [name, city_id]
    );
    return result.rows[0].id;
};

module.exports = { findOrCreateVenue };