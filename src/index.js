const state = {
  temp: 50,
  defaultCity: 'Bloomington',
  currentCity: 'Bloomington',
  lat: 39.1670396,
  lon: -86.5342881,
};

const upButton = document.getElementById('up-arrow');
const downButton = document.getElementById('down-arrow');
const tempText = document.getElementById('current-temp');
const ground = document.getElementById('ground');
const cityHeader = document.getElementById('city-name');
const cityInput = document.getElementById('city');
const realTemp = document.getElementById('realtime-temp');

cityInput.value = state['defaultCity'];

const tempColor = (temp) => {
  if (temp >= 80) {
    tempText.style.color = 'red';
  } else if (temp >= 70) {
    tempText.style.color = 'orange';
  } else if (temp >= 60) {
    tempText.style.color = 'yellow';
  } else if (temp >= 50) {
    tempText.style.color = 'green';
  } else {
    tempText.style.color = 'teal';
  }
};

const groundLayout = (temp) => {
  if (temp >= 80) {
    ground.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    ground.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    ground.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    ground.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  state['temp'] += 1;
  tempColor(state['temp']);
  tempText.textContent = state['temp'];
  groundLayout(state['temp']);
};

const decreaseTemp = () => {
  state['temp'] -= 1;
  tempColor(state['temp']);
  tempText.textContent = state['temp'];
  groundLayout(state['temp']);
};

const changeCityHeader = () => {
  cityHeader.textContent = cityInput.value;
};

const getCityLatAndLon = () => {
  state['currentCity'] = cityInput.value;

  axios
    .get('http://localhost:5000/location', {
      params: { q: state['currentCity'] },
    })
    .then((response) => {
      state['lat'] = response.data[0].lat;
      state['lon'] = response.data[0].lon;
    });
};

const changeToRealTemp = () => {
  axios
    .get('http://localhost:5000/weather', {
      params: { lat: state['lat'], lon: state['lon'] },
    })
    .then((response) => {
      const newTempKelvin = response.data.current.temp;
      const newTempF = 1.8 * (newTempKelvin - 273) + 32;
      state['temp'] = Math.round(newTempF);
      tempColor(state['temp']);
      tempText.textContent = state['temp'];
      groundLayout(state['temp']);
    });
};

upButton.addEventListener('click', increaseTemp);
downButton.addEventListener('click', decreaseTemp);
cityInput.addEventListener('input', changeCityHeader);
cityInput.addEventListener('change', getCityLatAndLon);
realTemp.addEventListener('click', changeToRealTemp);
