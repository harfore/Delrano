import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getConcerts } from "../api/concerts";

export default function ConcertsByCity() {
    const { cityId } = useParams();
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        getConcerts({ city: cityId }).then(setConcerts);
    }, [cityId]);

    return (
        <div>
            {concerts.map(c => (
                <div key={c.id}>
                    {c.tour_name} - {c.date};
                </div>
            ))}
        </div>
    );
};