const express = require('express');
const { getCityByNameAndCountry, createCity } = require('../controllers/cityController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: City
 *   description: Cities requests
 */
/**
 * @swagger
 * /:
 *   post:
 *     summary: Get a city by name and country
 *     tags: [City]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *                 example: Damascus
 *               country:
 *                 type: string
 *                 example: Syria
 *     responses:
 *       200:
 *         description: City fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 name:
 *                   type: string
 *                   example: Damascus
 *                 country:
 *                   type: string
 *                   example: Syria
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Validation error
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: name
 *                       message:
 *                         type: string
 *                         example: Name is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get('/', getCityByNameAndCountry);
router.post('/', createCity);
router.get('/debug', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status: 'OK',
        message: 'Backend is sending proper JSON'
    });
});

module.exports = router;