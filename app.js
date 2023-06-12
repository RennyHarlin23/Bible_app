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


app.get('/bible', (req, res) => {
    const BIBLE_API_KEY = "12b76a0e750f56a17b7153e68b937d4f";
    const bible_id = 'de4e12af7f28f599-02';
    const VERSES = [
        `JER.29.11`,
        `PSA.23.1`,
        `1COR.4.4-8`,
        `PHP.4.13`,
        `JHN.3.16`,
        `ROM.8.28`,
        `ISA.41.10`,
        `PSA.46.1`,
        `GAL.5.22-23`,
        `HEB.11.1`,
        `2TI.1.7`,
        `1COR.10.13`,
        `PRO.22.6`,
        `ISA.40.31`,
        `JOS.1.9`,
        `HEB.12.2`,
        `MAT.11.28`,
        `ROM.10.9-10`,
        `PHP.2.3-4`,
        `MAT.5.43-44`,
    ];
    const verse_id = VERSES[Math.floor(Math.random() * 19 + 1)];
    
    const BIBLE_URL = `https://api.scripture.api.bible/v1/bibles/${bible_id}/search?query=${verse_id}`;
    
    async function verse() {
        const response = await fetch(BIBLE_URL,
            { headers: { 'api-key': BIBLE_API_KEY } })
        const bibles = await response.json();
        
        const verse = bibles.data.passages[0].reference;
        const passage = bibles.data.passages[0].content;
    
        res.json({ verse, passage });
    
    
    }
    
    verse().catch(err => console.log(err));
})
