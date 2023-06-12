const random = Math.floor(Math.random() * 4) + 1;
console.log(random);
const body = document.querySelector('body');
const body_url = "/assets/img" + random + ".jpg";
body.style.backgroundImage = "url(body_url)";


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

        Weather_icon.setAttribute('src', img_url);
        temp_p.textContent = `${temp}°`;
        temp_des.textContent = description;

        div.append(temp_p);
        div.append(Weather_icon);
        div.append(temp_des);
        document.body.append(div);
    })

} else {
    console.log("Location not available");
}