import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotFound } from './NotFound';
import { getConcertById } from "../api/concerts";
import '../styles/concert.css';
import { TourInfo } from "./TourInfo";

const Concert = () => {

    const { concertId } = useParams();
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getConcertById(concertId)
            .then(setConcert)
            .finally(() => setLoading(false));
    }, [concertId]);

    if (loading) return <div>Loading concert...</div>;
    if (!concert) return <NotFound />;

    return (
        <div className='page'>
            <div className='page-content'>
                <div className='concert-full'>
                    <TourInfo tourId={concert.tour_id} />
                </div>
            </div>
        </div>
    )
};

export default Concert;