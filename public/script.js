const random = Math.floor(Math.random() * 7) + 1;
const body = document.querySelector('body');
const body_url = "/assets/img" + random + ".jpg";
body.style.backgroundImage = `url(${body_url})`;


if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const data = { lat, lon };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }

        const response = await fetch("/", options);
        const weather_data = await response.json();

        const img = weather_data.img_id;
        const temp = weather_data.temp;
        const description = weather_data.description;

        const img_url = `https://openweathermap.org/img/wn/${img}@2x.png`;

        const Weather_icon = document.createElement('img');
        const temp_p = document.createElement('h2');
        const temp_des = document.createElement('h2');
        const div = document.createElement('div');
        div.classList.add("weather_container");
        const weather = document.querySelector('.weather');

        Weather_icon.setAttribute('src', img_url);
        Weather_icon.classList.add("weather_img");
        temp_p.textContent = `${temp}°`;
        temp_p.classList.add("temp");
        temp_des.textContent = description;
        temp_des.classList.add("temp_des");

        div.append(Weather_icon);
        div.append(temp_p);
        div.append(temp_des);
        weather.append(div);

        const verse = await fetch('/bible');
        const verse_res = await verse.json();
        const verse_name = verse_res.verse;
        const passage = verse_res.passage;

        const verse_container = document.createElement('div');
        const verse_p = document.createElement('h1');
        const verse_pass = document.createElement('h2');
        const container = document.querySelector(".container");

        verse_p.textContent = verse_name;
        verse_pass.innerHTML = passage;
        verse_container.classList.add("verse_container");

        verse_container.append(verse_p);
        verse_container.append(verse_pass);
        container.append(verse_container);

    })

} else {
    console.log("Location not available");
}