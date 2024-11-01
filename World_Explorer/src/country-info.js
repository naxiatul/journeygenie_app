document.addEventListener('DOMContentLoaded', () => {
    const countryName = new URLSearchParams(window.location.search).get('country');
    const messageElement = document.getElementById('message');

    if (!countryName) {
        messageElement.textContent = 'Please provide a country name.';
        messageElement.style.display = 'block';
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            if (!country) {
                messageElement.textContent = 'Country not found.';
                messageElement.style.display = 'block';
                return;
            }
            
            document.getElementById('country-name').textContent = country.name.common;
            document.getElementById('continent').textContent = country.continents ? country.continents[0] : 'N/A';
            document.getElementById('region').textContent = country.region || 'N/A';
            document.getElementById('subregion').textContent = country.subregion || 'N/A';
            document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'N/A';
            document.getElementById('languages').textContent = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
            document.getElementById('timezones').textContent = country.timezones ? country.timezones.join(', ') : 'N/A';
            document.getElementById('population').textContent = country.population.toLocaleString();
            document.getElementById('area').textContent = `${country.area.toLocaleString()} km²`;
            document.getElementById('currency').textContent = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A';

            document.getElementById('country-flag').src = country.flags ? country.flags.png : '#';
            document.getElementById('coat-of-arms').src = country.coatOfArms ? country.coatOfArms.png : '#';

            document.getElementById('google-maps').href = country.maps ? country.maps.googleMaps : '#';
            document.getElementById('openstreetmap').href = country.maps ? country.maps.openStreetMaps : '#';

            if (country.borders) {
                fetchNearbyCountries(country.borders);
            } else {
                document.getElementById('nearby-countries').style.display = 'none';
            }
        })
        .catch(error => {
            messageElement.textContent = 'Error fetching country information';
            messageElement.style.display = 'block';
            console.error('Error:', error);
        });

    function fetchNearbyCountries(borders) {
        const container = document.getElementById('card-container');
        borders.forEach(code => {
            fetch(`https://restcountries.com/v3.1/alpha/${code}`)
                .then(response => response.json())
                .then(borderData => {
                    const nearbyCountry = borderData[0];
                    if (nearbyCountry) {
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.innerHTML = `
                            <a href="?country=${nearbyCountry.name.common}" class="nearby-country-link">
                                <img src="${nearbyCountry.flags.png}" alt="Flag of ${nearbyCountry.name.common}" height="150" width="300"/>
                                <div class="card-title">${nearbyCountry.name.common}</div>
                            </a>
                        `;
                        container.appendChild(card);
                    }
                })
                .catch(error => {
                    console.error('Error fetching nearby country:', error);
                });
        });
    }
});
