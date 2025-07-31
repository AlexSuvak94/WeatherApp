export default async function handler(req, res) {
    try {
        const { city } = req.body;
        if (!city) {
            return res.status(400).json({ message: 'Polje "Grad" je obavezno.' });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(data.cod).json({ message: data.message });
        }

        res.status(200).json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
}