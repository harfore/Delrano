import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getConcerts } from "../api/concerts";
import '../styles/City.css'

export default function ConcertsByCity() {
    const navigate = useNavigate();

    const { cityId, concertId } = useParams();
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        getConcerts({ city: cityId }).then(setConcerts);
    }, [cityId]);

    const upcomingConcerts = concerts.filter(concert => new Date(concert.date) >= new Date());

    const noUpcomingMsg = `No registered upcoming concerts in this location. If we missed an event, let us know!`;

    const form = ``;

    return (
        <div className='page'>
            <div className="page-content">
                <div className="concerts-by-city">
                    {upcomingConcerts.length === 0 ? (
                        <div>
                            <h4>{noUpcomingMsg}</h4>
                        </div>
                    ) : (
                        upcomingConcerts.map(c => (
                            <div key={c.id} className="concert-in-city">
                                <a href={`/concerts/${c.id}`}>
                                    <p className="tour-name">{c.tour_name}</p>
                                    <p className="concert-date">{new Date(c.date).toLocaleDateString()}</p>
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div >
    );
};