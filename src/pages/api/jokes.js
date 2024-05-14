import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const { prompt } = req.query;
        const apiKey = process.env.OPEN_API_KEY;
        const apiUrl = `https://api.openai.com/v1/engines/davinci/completions`;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'davinci',
                prompt: prompt,
                max_tokens: 50,
                temperature: 0.7,
                n: 1
            }),
        };

        console.log('Sending request:', apiUrl, requestOptions);
        const response = await fetch(apiUrl, requestOptions);

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        console.log('Response data:', data);

        const joke = data.choices[0].text.trim();
        res.status(200).json({ joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}