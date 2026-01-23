const express = require('express');
const { checkConcertExists, createConcert } = require('../controllers/concertController.js');
const pool = require('../config/database.js');

const router = express.Router();

// existence check
router.post('/exists', checkConcertExists);

// CRUD operations
router.route('/')
    .post(createConcert)
    .get(async (req, res) => {
        try {
            const { rows } = await pool.query(
                `SELECT 
                    c.concert_id AS id,
                    c.tour_id,
                    c.venue_id,
                    c.date,
                    c.special_notes,
                    t.name AS tour_name,
                    v.name AS venue_name,
                    city.name AS city_name
                 FROM concerts c
                 JOIN tours t ON c.tour_id = t.tour_id
                 JOIN venues v ON c.venue_id = v.venue_id
                 JOIN cities city ON v.city_id = city.city_id
                 ORDER BY c.date DESC
                 `);
            res.json(rows);
        } catch (err) {
            console.error('Failed to fetch concerts:', err);
            res.status(500).json({ error: 'Failed to fetch concerts' });
        }
    });

// get concert by ID
router.get('/:id', async (req, res) => {
    try {
        const { rows: [concert] } = await pool.query(
            `SELECT * FROM concerts WHERE concert_id = $1`,
            [req.params.id]
        );
        concert ? res.json(concert) : res.status(404).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch concert' });
    }
});

module.exports = router;