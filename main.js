// main.js


import { apiUrl, fetchData, calculateDistance, error, success as geolocationSuccess } from './utils.js';
import { restaurantRow, restaurantModal } from './components.js';

async function success(pos) {
  try {
    const crd = pos.coords;
    const selectedCompany = 'Sodexo';


    const allRestaurants = await fetchData(`${apiUrl}/restaurants`);

    // Filter restaurants based on the selected company
    const filteredRestaurants = allRestaurants.filter(restaurant => restaurant.company === selectedCompany);


    displayRestaurants(filteredRestaurants);
  } catch (error) {
    alert(error.message);
  }
}


function displayRestaurants(restaurants) {
  try {
    const table = document.querySelector('table');


    table.innerHTML = '<tr><th>Name</th><th>Company</th></tr>';

    for (const restaurant of restaurants) {
      const row = restaurantRow(restaurant);

      row.addEventListener('click', async () => {
        try {
          document.querySelectorAll('.highlight').forEach((high) => {
            high.classList.remove('highlight');
          });

          row.classList.add('highlight');
          modal.innerHTML = '';

          const menu = await fetchData(
            `${apiUrl}/restaurants/daily/${restaurant._id}/fi`
          );

          const modalHtml = restaurantModal(restaurant, menu);
          modal.innerHTML = modalHtml;
          modal.showModal();
        } catch (error) {
          alert(error.message);
        }
      });

      table.appendChild(row);
    }
  } catch (error) {
    alert(error.message);
  }
}


function geoError(err) {
  alert(`Error(${err.code}): ${err.message}`);
}


navigator.geolocation.getCurrentPosition(success, geoError);

// ...
