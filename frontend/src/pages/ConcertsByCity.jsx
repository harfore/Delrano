import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getConcerts } from "../api/concerts";
import '../styles/City.css';

export default function ConcertsByCity() {
    const { cityId } = useParams();
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        getConcerts({ city: cityId }).then(setConcerts);
    }, [cityId]);
    console.log("cityId:", cityId)


    return (
        <div className='page'>
            <div className='page-content'>
                {concerts.map(c => (
                    <div key={c.id} className="concert-in-city">
                        {c.tour_name} - {c.date};
                    </div>
                ))}
            </div>
        </div>
    );
};