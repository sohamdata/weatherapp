const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const input = document.querySelector(".top-banner input");
const form = document.querySelector(".top-banner form");
const apiKey = "216219673beefa406c6940741ff900a8"; //😐
form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
    //check if there's already a city
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);
    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //city, country code
            if (inputVal.includes(",")) {
                //if invalid country code, seach city only
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                        .querySelector(".city-name span")
                        .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //athens
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `bro see ${filteredArray[0].querySelector(".city-name span").textContent
                }, you may want to try zip codes too.`;
            form.reset();
            input.focus();
            return;
        }
    }

    //https://openweathermap.org/current
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]
                }.svg`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            const li = document.createElement("li");
            li.classList.add("city");
            const lol = ['sussy', 'balls', 'amogus'];
            if (lol.includes(inputVal)) {
                window.open("https://goo.gl/maps/rN5kGwN1vaehRMKKA")
                let x = Math.floor(Math.random() * (3) + 1);
                const markup = `
                <h2 class="city-name">
                    <span>"bro😫"</span>
                    <sup>🥶</sup>
                </h2>
                <div class="city-temp">69<sup>°sus</sup></div>
                <figure>
                    <img class="city-icon" src="imgs/${x}.png" alt="ayo shawty">
                    <figcaption>pain.</figcaption>
                </figure>
            `;
                li.innerHTML = markup;
                list.appendChild(li);

            } else {
                msg.textContent = "no such place exists on the planet, for now atleast";
            }
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});