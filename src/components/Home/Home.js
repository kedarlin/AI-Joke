import React, { useRef, useState } from 'react';
import Navbar from '../navbar/Navbar';


const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log(prompt);
            const response = await fetch(`/api/jokes?prompt=${encodeURIComponent(prompt)}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch joke');
            }
            setJoke(data.joke);
        } catch (error) {
            console.error('Error fetching joke:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='home-main'>
            <Navbar />
            <div className='home-content'>
                <div className='home-top'>
                    <div className='home-title'>
                        AI Generator 🔥
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Enter your prompt'
                    />
                    <button type='submit'>Generate</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {joke && <p>Joke: {joke}</p>}
            </div>
        </div>
    );
};

export default Home;