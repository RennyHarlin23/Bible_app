const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The server is up and running in ${port}`));

app.post("/", (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;

    const API_KEY = '3bf70b1fae1fedb8769de573d2ed1796';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    main().catch(err => console.log(err));

    async function main() {
        const response = await fetch(url);
        const weather_data = await response.json();
        console.log(weather_data);
        const img_id = weather_data.weather[0].icon;
        const description = weather_data.weather[0].description;
        const temp = weather_data.main.temp;

        const data = {
            img_id: img_id,
            description: description,
            temp: temp,
        }

        res.json(data);
    }
    
})