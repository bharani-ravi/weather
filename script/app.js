const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const row = document.querySelector(".weather.row");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const submit = document.querySelector(".more");
const row1 = document.querySelector(".weather1");
const button = document.querySelector(".btn");
const card1 = document.querySelector("#disp-clear");
const Forecast = new forecast();
const updateUI = (data) => {
  const { cityDets } = data;

  row.innerHTML = cityDets.list
    .map((list, idx) => {
      if (idx % 8 === 0) {
        let dt = new Date(list.dt * 1000); //timestamp * 1000
        let sr = new Date(cityDets.city.sunrise * 1000);
        let ss = new Date(cityDets.city.sunset * 1000);

        return `<div class="col">
      <div class="card">
      <h3>${cityDets.city.name}</h3>
      <h5 class="card-title p-2">${dt.toDateString()}</h5>
      <img
      src="http://openweathermap.org/img/wn/${list.weather[0].icon}@4x.png"
      class="card-img-top"
      alt="${list.weather[0].description}"/>
      <h3 class="card-title">${cityDets.list[idx].weather[0].main}</h3>
      <p class="card-text">High ${cityDets.list[idx].main.temp_max}&deg;C Low ${
          cityDets.list[idx].main.temp_min
        }&deg;C</p>
      
      </div>
      </div>    
      </div>
      </div>`;
      }
    })
    .join(" ");
};
const updateText = (data) => {
  const { cityDets } = data;
  console.log(cityDets);
  row1.innerHTML = cityDets.list
    .map((list, idx) => {
      if (idx % 8 === 0) {
        let dt = new Date(list.dt * 1000); //timestamp * 1000
        let sr = new Date(cityDets.city.sunrise * 1000);
        let ss = new Date(cityDets.city.sunset * 1000);
        console.log(cityDets.list[idx].main.feels_like);
        return `<div class="col1">
      <div class="card1 ">
      
            <div class="display">
            <h5 class="card-title p-2">${dt.toDateString()}</h5>
            <p class="card-text"> Feels like ${
              cityDets.list[idx].main.feels_like
            }&deg;C</p>
            <p class="card-text">Pressure ${
              cityDets.list[idx].main.pressure
            }mb</p>
            <p class="card-text">Humidity ${
              cityDets.list[idx].main.humidity
            }%</p>
            <p class="card-text">Wind ${
              cityDets.list[idx].wind.speed
            }m/s&deg;</p>
            <p class="card-text">Sunrise: ${sr.toTimeString()}</p>
            <p class="card-text">Sunset: ${ss.toTimeString()}</p>
            </div>
          </div>
      </div>`;
      }
    })
    .join(" ");
  button.addEventListener("click", (e) => {
    console.log(card1.classList.contains("dispnone"));
    if (card1.classList.contains("dispnone")) {
      card1.classList.remove("dispnone");
    } else {
      card1.classList.add("dispnone");
    }
  });
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  Forecast.updateCity(city)
    .then((data) => {
      updateUI(data);
      updateText(data);
    })

    .catch((err) => {
      console.log(err);
    });

  localStorage.setItem("city", city);
});
if (localStorage.getItem("city")) {
  Forecast.updateCity(localStorage.getItem("city"))
    .then((data) => {
      updateUI(data);
      updateText(data);
    })
    .catch((err) => {
      console.log("err");
    });
}

//////temlybui
// <div class="card1 d-none">
//   <div class="display">
//     <p class="card-text">HighFeels like</p>
//     <p class="card-text">Pressure</p>
//     <p class="card-text">Humidty</p>
//     <p class="card-text">Wind speed and direction</p>
//     <p class="card-text">Sunrise</p>
//     <p class="card-text">Sunset</p>
//   </div>
// </div>;
