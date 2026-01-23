import { useState, useEffect } from 'react';
import { getAllConcerts } from '../services/events/concertService';

export default function NewYorkConcerts() {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cityFilter, setCityFilter] = useState('New York');

    useEffect(() => {
        const loadConcerts = async () => {
            try {
                const allConcerts = await getAllConcerts();

                const now = new Date();

                const nyConcerts = allConcerts.filter(
                    concert => concert.city_name === 'New York' &&
                        new Date(concert.date) >= now
                );

                nyConcerts.sort((a, b) => new Date(a.date) - new Date(b.date));

                setConcerts(nyConcerts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadConcerts();
    }, []);

    if (loading) return <div className="loading">Loading concerts...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="concerts-container" style={{ margin: '15rem' }}>
            <h1>Concerts in {cityFilter}</h1>

            {
                concerts.length === 0 ? (
                    <p>Try again, {cityFilter}</p>
                ) : (
                    <div className="concerts-grid">
                        {concerts.map(concert => (
                            <div key={concert.concert_id} className="concert-card">
                                <h3>{concert.tour_name || 'Tour'}</h3>
                                <div className="details">
                                    <p> {concert.venue_name || ' '}</p>
                                    <p><strong>Date:</strong> {new Date(concert.date).toLocaleDateString()}</p>
                                    {/* <p><strong>Time:</strong> {new Date(concert.date).toLocaleTimeString()}</p>
                                {concert.special_notes && (
                                    <p className="notes">{concert.special_notes}</p>
                                )} */}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
}