import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotFound } from './NotFound';
import { getTourById } from '../api/tours';

export const TourInfo = ({ tourId }) => {
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!tourId) {
            setError('No tour ID provided');
            setLoading(false);
            return;
        }

        getTourById(tourId)
            .then(setTour)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));

    }, [tourId]);

    if (loading) return <div>Loading tour info...</div>;
    if (error) return <div>Tour info unavailable</div>;
    if (!tour) return <NotFound />;

    const tour_name = tour.name;
    if (!tour.name) {
        tour_name = 'Tour'
    };

    const tour_img = '';
    return (
        <div>
            <img src={tour_img} alt="" />
            <h2>{tour_name}</h2>

        </div>
    )
}