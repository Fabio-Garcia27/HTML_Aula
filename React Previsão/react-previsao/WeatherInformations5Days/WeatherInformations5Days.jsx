import './WeatherInformations5Days.css'

function WeatherInformations5Days({ weather5Days }) {

    let dailyForecast = {}

    for (let Forecast of weather5Days.list) {
        const date = new Date(Forecast.dt * 1000).toLocaleDateString()

        if (!dailyForecast[date]) {
            dailyForecast[date] = Forecast
        }
    }

    const next5DaysForecast = Object.values(dailyForecast).slice(1, 6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })

        return newDate

    }

    return (
        <div className='weather-container'>
            <h3>Previsão nos Próximos 5 Dias</h3>
            <div className='weather-list'>
                {next5DaysForecast.map(Forecast => (
                    <div key={Forecast.dt} className='weather-item'>
                        <p className='Forecast-day'>{convertDate(Forecast)}</p>
                        <img src={`https://openweathermap.org/img/wn/${Forecast.weather[0].icon}.png`} />
                        <p className='Forecast.description'>{Forecast.weather[0].description}</p>
                        <p>{Math.round(Forecast.main.temp_min)}°C min / {Math.round(Forecast.main.temp_max)}°C máx</p>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default WeatherInformations5Days