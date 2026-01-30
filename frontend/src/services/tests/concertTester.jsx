// development utility for testing concert creation/retrieval flows

// features:
//  - tests the concert service integration (createConcertIfNotExists)
//  - visual feedback for loading/error states
//  - displays operation results with status indicators

import { useState } from 'react';
// import { createConcertIfNotExists } from '../events/concertService';

export default function ConcertTester() {
    const [result, setResult] = useState(null); // operation result message
    const [isLoading, setIsLoading] = useState(false); // loading state flag
    const [error, setError] = useState(null); // error message storage

    // executes concert creation test flow with predefined data

    const testConcertFlow = async () => {

        // reset previous state
        setIsLoading(true);
        setError(null);
        setResult(null);

        const testData = {
            tour_id: 8,
            venue_id: 12,
            date: '2025-11-01T19:00:00',
            special_notes: '',
        };

        try {
            console.log('Attempting to create concert:', testData);
            const wasCreated = await createConcertIfNotExists(testData);

            // set appropriate result message
            console.log(wasCreated ? 'Created successfully' : 'Already exists');
            setResult(wasCreated ? 'Created new concert' : 'Concert already exists');

        } catch (err) {

            console.error('Concert creation failed:', {
                error: err.message,
                testData
            });
            setError(err.message.includes('Failed')
                ? err.message
                : 'Failed: ' + err.message
            );
        } finally {
            setIsLoading(false); // clean up loading state
        }
    };

    return (
        <div className="tester-card">
            <h3>Concert Service Test</h3>
            <button
                onClick={testConcertFlow}
                disabled={isLoading}
                className={isLoading ? 'loading' : ''}
            >
                {isLoading ? 'Processing...' : 'Test Concert Flow'}
            </button>

            <div className="results">
                {error && (
                    <p className="error">
                        🚨 {error}
                        <button onClick={() => setError(null)}>Dismiss</button>
                    </p>
                )}
                {result && (
                    <p className={result.includes('Created') ? 'success' : 'warning'}>
                        {result}
                    </p>
                )}
            </div>

            <style jsx>{`
                .loading {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .success { color: green; }
                .warning { color: orange; }
                .error { 
                    color: red;
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }
                button {
                    margin-left: 1rem;
                }
            `}</style>
        </div>
    );
}