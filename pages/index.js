import { useState } from 'react';
import Head from 'next/head';


export default function Home() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setWeather(null);
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/weather_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something's not working... :(");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <Head>
        <title>My Awesome Weather App</title>
        <meta name="description" content="This is a cool Next.js project!" />
      </Head>

      <h1 style={styles.title}>🌤️ Simple Weather App</h1>

      {/* Weather search form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>

      {/* Show loading message */}
      {loading && <p>Loading...</p>}

      {/* Show error message */}
      {error && <p style={styles.error}>{error}</p>}
      {/* Show weather result */}
      {weather && (
        <div style={styles.result}>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    justifyContent: 'center',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    flex: 1,
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  result: {
    marginTop: '2rem',
    borderTop: '1px solid #ccc',
    paddingTop: '1rem',
  },
};