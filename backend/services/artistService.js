const pool = require('../config/database');

const findOrCreateArtist = async (name) => {
    if (!name) throw new Error('Artist name is required');

    const normalizedName = name.trim();

    const existing = await pool.query(
        'SELECT artist_id FROM artists WHERE name = $1',
        [normalizedName]
    );
    if (existing.rows.length > 0) return existing.rows[0].artist_id;

    const result = await pool.query(
        `INSERT INTO artists (name)
         VALUES ($1)
         RETURNING artist_id`,
        [normalizedName]
    );

    if (result.rows.length > 0) return result.rows[0].artist_id;

    const fallback = await pool.query(
        'SELECT artist_id FROM artists WHERE name = $1',
        [normalizedName]
    );
    return fallback.rows[0].artist_id;
}

module.exports = { findOrCreateArtist };