function WeatherInformations({ weather }) {

    if (!weather || !weather.weather || !weather.main) {
        return <p>Carregando informações do clima...</p>;
    }

    return (
        <div>
            <h2>{weather.name}</h2>
            <div>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
                <p>{Math.round(weather.main.temp)}°C</p>
            </div>
            <p>{weather.weather[0].description}</p>
            <div>
                <p>Sensação térmica: {Math.round(weather.main.feels_like)}°C</p>
                <p>Umidade: {weather.main.humidity}%</p>
                <p>Pressão: {weather.main.pressure}</p>
            </div>
        </div>
    )

}

export default WeatherInformations