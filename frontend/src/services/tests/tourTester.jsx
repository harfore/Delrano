// development utility for testing tour creation/retrieval flows
// features:
// - tests tour service integration (findOrCreateTour)
// - provides visual feedback for loading/error states
// - displays the resulting tour ID with success indicator

import { useState } from 'react';
// import { findOrCreateTour } from '../events/tourService';

export default function TourTester() {

    // state management
    const [tourId, setTourId] = useState(null); // stores created/found tour ID
    const [isLoading, setIsLoading] = useState(false); // loading state flag
    const [error, setError] = useState(null); // error message storage

    // executes tour test flow with standardized test data
    const testTourFlow = async () => {
        // reset state and initiate loading
        setIsLoading(true);
        setError(null);

        try {
            // service call with test data
            const id = await findOrCreateTour({
                name: "This Tour May Contain New Music",
                artist_id: 3,
                start_date: '2026-01-22',
                end_date: '2026-05-20',
            });
            setTourId(id); // store successful result
        } catch (err) {
            // capture and display errors
            setError(err.message);
        } finally {
            // reset loading state
            setIsLoading(false);
        }
    };

    return (
        <div className="tester-card">
            <h3>Tour Service Test</h3>
            <button
                onClick={testTourFlow}
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Test Tour Flow'}
            </button>

            <div className="results">
                {error && <p className="error">🚨 Error: {error}</p>}
                {tourId && <p>✅ Tour ID: {tourId}</p>}
            </div>
        </div>
    );
}