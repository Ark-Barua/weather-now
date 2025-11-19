// ----------------------------------------------------------------
      // UTILITY FUNCTIONS: ICON MAPPING
      // ----------------------------------------------------------------
      const weatherIcons = {
        // Mapping common weather descriptions to lucide-react-style SVGs
        Sunny: (className = "w-6 h-6") =>
          `<svg class="${className} text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>`,
        Cloudy: (className = "w-6 h-6") =>
          `<svg class="${className} text-secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 18H9a4 4 0 1 1 0-8h11a4 4 0 0 1 0 8z"></path></svg>`,
        "Partly Cloudy": (className = "w-6 h-6") =>
          `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"></path><path d="M19 14.5a3.5 3.5 0 0 0-3.5-3.5h-5.5a4 4 0 1 0 0 8h9a3.5 3.5 0 0 0 .5-7z"></path></svg>`,
        Rain: (className = "w-6 h-6") =>
          `<svg class="${className} text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 17.5a4 4 0 0 0-4-4h-2a2 2 0 0 0-2 2"></path><path d="M19 14.5a3.5 3.5 0 0 0-3.5-3.5h-5.5a4 4 0 1 0 0 8h9a3.5 3.5 0 0 0 .5-7z"></path><line x1="12" y1="18" x2="12" y2="24"></line><line x1="8" y1="18" x2="8" y2="24"></line><line x1="16" y1="18" x2="16" y2="24"></line></svg>`,
        "Heavy Rain": (className = "w-6 h-6") =>
          `<svg class="${className} text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 17.5a4 4 0 0 0-4-4h-2a2 2 0 0 0-2 2"></path><path d="M19 14.5a3.5 3.5 0 0 0-3.5-3.5h-5.5a4 4 0 1 0 0 8h9a3.5 3.5 0 0 0 .5-7z"></path><line x1="12" y1="18" x2="12" y2="24"></line><line x1="8" y1="18" x2="8" y2="24"></line><line x1="16" y1="18" x2="16" y2="24"></line><line x1="14" y1="12" x2="14" y2="18"></line><line x1="10" y1="12" x2="10" y2="18"></line></svg>`,
        Mist: (className = "w-6 h-6") =>
          `<svg class="${className} text-secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 17a3 3 0 0 0-3-3H6a4 4 0 1 1 0-8h10a3 3 0 0 1 3 3v2"></path><line x1="14" y1="12" x2="6" y2="12"></line><line x1="18" y1="16" x2="8" y2="16"></line><line x1="16" y1="8" x2="4" y2="8"></line></svg>`,
        Default: (className = "w-6 h-6") =>
          `<svg class="${className} text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><path d="M12 16V12L10 8"></path><path d="M12 12h2"></path></svg>`,
      };

      function getWeatherIcon(condition, className) {
        if (condition.toLowerCase().includes("sun"))
          return weatherIcons.Sunny(className);
        if (condition.toLowerCase().includes("partly"))
          return weatherIcons["Partly Cloudy"](className);
        if (condition.toLowerCase().includes("cloud"))
          return weatherIcons.Cloudy(className);
        if (condition.toLowerCase().includes("rain"))
          return weatherIcons.Rain(className);
        if (
          condition.toLowerCase().includes("mist") ||
          condition.toLowerCase().includes("fog")
        )
          return weatherIcons.Mist(className);
        return weatherIcons.Default(className);
      }

      // WMO Weather interpretation codes (WMO_CODE) to Condition String
      function getWeatherCondition(wmoCode) {
        const code = parseInt(wmoCode);
        if (code === 0) return "Sunny";
        if (code >= 1 && code <= 3) return "Partly Cloudy"; // Mainly clear, partly cloudy, overcast
        if (code === 45 || code === 48) return "Mist"; // Fog and Rime Fog
        if ((code >= 51 && code <= 55) || (code >= 61 && code <= 64))
          return "Rain"; // Drizzle and Rain
        if (code >= 80 && code <= 82) return "Heavy Rain"; // Rain showers
        if (
          code === 65 ||
          code === 66 ||
          code === 67 ||
          code === 95 ||
          code >= 96
        )
          return "Heavy Rain"; // Heavy Rain/Thunderstorm/Hail
        return "Cloudy"; // Default for other codes like snow, etc.
      }

      // Unit definitions
      const units = {
        metric: { temp: "C", wind: "km/h", precip: "mm" },
        imperial: { temp: "F", wind: "mph", precip: "in" },
      };

      const convertMetricToImperial = (data) => ({
        // Temperature: C * 9/5 + 32
        temp: Math.round((data.temp * 9) / 5 + 32),
        feelsLike: Math.round((data.feelsLike * 9) / 5 + 32),
        // Wind: km/h * 0.621371
        wind: (data.wind * 0.621371).toFixed(0),
        // Precipitation: mm * 0.0393701
        precip: (data.precip * 0.0393701).toFixed(1),
      });

      // Formatting functions
      const formatTemp = (temp, unit) => `${temp}°${unit}`;
      const formatWind = (wind, unit) => `${wind} ${unit}`;
      const formatPrecip = (precip, unit) => `${precip} ${unit}`;

      const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        });
      };

      const formatDate = (dateString, style = "full") => {
        const date = new Date(dateString);
        if (style === "day")
          return date.toLocaleDateString("en-US", { weekday: "short" });
        if (style === "full")
          return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        return dateString;
      };

      // ----------------------------------------------------------------
      // APPLICATION STATE
      // ----------------------------------------------------------------
      const state = {
        unit: "metric", // 'metric' or 'imperial'
        uiState: "loading", // 'loaded', 'loading', 'error', 'no-results'
        weatherData: null, // The current weather data (fetched from API)
        selectedDayIndex: 0, // Index for hourly forecast day (0=today)
        isUnitDropdownOpen: false,
        isDayDropdownOpen: false,
        isSearchDropdownOpen: false,
        searchQuery: "Pune", // UPDATED: Initial search query set to Pune
        mockSearchResults: [], // Real geocoding doesn't return multiple for one city name easily, so this remains simple
      };

      // ----------------------------------------------------------------
      // API FUNCTIONS
      // ----------------------------------------------------------------

      /**
       * Fetches latitude, longitude, and display name for a city search.
       */
      async function fetchCoordinates(cityQuery) {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityQuery
        )}&count=1&language=en&format=json`;
        try {
          const response = await fetch(geoUrl);
          if (!response.ok) throw new Error("Geocoding API failed.");
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            return {
              lat: result.latitude,
              lon: result.longitude,
              city: `${result.name}, ${result.country}`,
              timezone: result.timezone,
            };
          }
          return null;
        } catch (error) {
          console.error("Geocoding Error:", error);
          return null;
        }
      }

      /**
       * Fetches weather data using coordinates.
       */
      async function fetchWeatherData(lat, lon, timezone, cityName) {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature&forecast_days=7&timezone=${timezone}`;

        try {
          const response = await fetch(weatherUrl);
          if (!response.ok) throw new Error("Weather API failed.");
          const data = await response.json();

          // 1. Current Data
          // Use data.current.time directly for finding the index
          const currentHour = data.current.time; 
          const currentTimeIndex = data.hourly.time.findIndex(
            (t) => t === currentHour
          );

          // Get the current day's index in the daily forecast array
          const currentDateStr = data.current.time.split('T')[0];
          const currentDayIndex = data.daily.time.findIndex(date => date === currentDateStr);

          const currentData = {
            temp: Math.round(data.current.temperature_2m),
            feelsLike: Math.round(data.current.apparent_temperature),
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m.toFixed(0),
            precip: data.current.precipitation.toFixed(1),
            condition: getWeatherCondition(data.current.weather_code),
            // The current time's date string should be used for the main card date
            date: data.current.time, 
          };

          // 2. Daily Forecast (7 days)
          const forecast = data.daily.time.map((date, index) => {
            // Filter hourly data for this specific day
            const hourly = data.hourly.time
              .map((time, i) => ({
                time,
                temp: data.hourly.temperature_2m[i],
                code: data.hourly.weather_code[i],
              }))
              .filter((hour) => hour.time.startsWith(date))
              .map((hour) => ({
                time: hour.time,
                temp: Math.round(hour.temp),
                condition: getWeatherCondition(hour.code),
                // Daily summary for main card display when this day is selected
                high: Math.round(data.daily.temperature_2m_max[index]),
                low: Math.round(data.daily.temperature_2m_min[index]),
                precipSum: data.daily.precipitation_sum[index].toFixed(1),
                apparentMax: Math.round(data.daily.apparent_temperature_max[index]),
                windMax: data.daily.wind_speed_10m_max?.[index] ? data.daily.wind_speed_10m_max[index].toFixed(0) : 0, // Fallback if wind max is not available in the API response (though it should be for this URL)

              }));

            // The main card display for a selected day should show that day's max temp/condition,
            // not the current hour's data. We rely on index 0 of the hourly data for condition
            // just to get the condition string for the whole day (which is based on WMO code for the day).
            return {
              day: formatDate(date, "day"),
              date: date,
              high: Math.round(data.daily.temperature_2m_max[index]),
              low: Math.round(data.daily.temperature_2m_min[index]),
              condition: getWeatherCondition(data.daily.weather_code[index]),
              precipSum: data.daily.precipitation_sum[index].toFixed(1),
              feelsLikeMax: Math.round(data.daily.apparent_temperature_max[index]),
              windMax: data.hourly.wind_speed_10m[currentTimeIndex].toFixed(0), // Use current hour's wind for the current day, or fallback to 0 for a simple display
              humidity: data.hourly.relative_humidity_2m[currentTimeIndex], // Use current hour's humidity
              hourly: hourly,
            };
          });

          // 3. Final structured data
          return {
            city: cityName,
            date: formatDate(data.current.time, "full"),
            current: currentData,
            forecast: forecast,
            currentDayIndex: currentDayIndex,
          };
        } catch (error) {
          console.error("Weather Data Error:", error);
          return null;
        }
      }

      // ----------------------------------------------------------------
      // DOM ELEMENTS CACHE
      // ----------------------------------------------------------------
      const DOMElements = {};
      document.addEventListener("DOMContentLoaded", () => {
        DOMElements.app = document.getElementById("app");
        DOMElements.weatherContent = document.getElementById("weather-content");
        DOMElements.unitsToggle = document.getElementById("units-toggle");
        DOMElements.unitsDropdown = document.getElementById("units-dropdown");
        // FIX: Added units-arrow to the cache
        DOMElements.unitsArrow = document.getElementById("units-arrow"); 
        DOMElements.searchBar = document.getElementById("search-input");
        DOMElements.searchDropdown = document.getElementById(
          "search-results-dropdown"
        );
        DOMElements.searchButton = document.getElementById("search-button");

        // Initial Listeners
        attachGlobalListeners();
        // FIX: The initial load is now outside of DOMContentLoaded to ensure everything is initialized first.
      });

      // ----------------------------------------------------------------
      // RENDERING FUNCTIONS
      // ----------------------------------------------------------------

      // Main render function based on uiState
      function renderApp() {
        // Clear old content
        DOMElements.weatherContent.innerHTML = "";
        const mainTitle = document.getElementById("main-title");

        // Show/Hide main title based on state
        if (mainTitle) {
          if (state.uiState !== "error" && state.uiState !== "no-results") {
            mainTitle.classList.remove("hidden");
          } else {
            mainTitle.classList.add("hidden");
          }
        }
        

        switch (state.uiState) {
          case "loading":
            DOMElements.weatherContent.appendChild(
              document
                .getElementById("template-loading")
                .content.cloneNode(true)
            );
            break;
          case "error":
            DOMElements.weatherContent.appendChild(
              document.getElementById("template-error").content.cloneNode(true)
            );
            // Re-attach listener as content is replaced
            document
              .getElementById("retry-button")
              .addEventListener("click", handleRetry);
            break;
          case "no-results":
            DOMElements.weatherContent.appendChild(
              document
                .getElementById("template-no-results")
                .content.cloneNode(true)
            );
            break;
          case "loaded":
            // Only inject the template once when data is first loaded
            DOMElements.weatherContent.appendChild(
              document
                .getElementById("template-main-content")
                .content.cloneNode(true)
            );
            
            // Render all dynamic content
            renderDailyForecast(state.weatherData.forecast);
            updateMainWeatherDisplay();
            break;
        }
        // These are always rendered/updated regardless of the main content
        renderUnitsDropdown(); 
        renderSearchDropdown();
      }

      /**
       * Updates the content of the main weather card and detail cards
       * based on the currently selected day (`state.selectedDayIndex`).
       */
      function updateMainWeatherDisplay() {
          const data = state.weatherData;
          if (!data) return;

          // Determine which data source to use: current conditions or daily forecast summary
          const selectedDayIndex = state.selectedDayIndex;
          const isCurrentDay = selectedDayIndex === data.currentDayIndex;
          
          let displayData;
          let dateText;
          let condition;
          
          if (isCurrentDay) {
              // Use current instantaneous data for the main card on the current day
              displayData = state.unit === "metric" 
                  ? data.current
                  : convertMetricToImperial(data.current);
              dateText = data.date;
              condition = data.current.condition;

              // The current temperature is the instantaneous one
              document.getElementById("main-temp").textContent = formatTemp(
                  displayData.temp,
                  units[state.unit].temp
              );

          } else {
              // Use the daily high/low and forecast summary for future days
              const dayForecast = data.forecast[selectedDayIndex];
              
              // Map daily summary data to the displayData structure for conversion/formatting
              const metricDailySummary = {
                  temp: dayForecast.high, // Use high temp as the main display temperature
                  feelsLike: dayForecast.feelsLikeMax,
                  humidity: dayForecast.hourly[0]?.humidity || 0, // Fallback if needed
                  wind: dayForecast.windMax,
                  precip: dayForecast.precipSum,
              };

              displayData = state.unit === "metric"
                  ? metricDailySummary
                  : convertMetricToImperial(metricDailySummary);

              dateText = formatDate(dayForecast.date, "full");
              condition = dayForecast.condition;

              // For future days, show high/low range on the main temperature display
              const high = formatTemp(displayData.temp, units[state.unit].temp);
              const low = formatTemp(dayForecast.low, units[state.unit].temp); // NOTE: low is still in metric and needs conversion
              
              const convertedLow = 
                state.unit === "metric"
                    ? dayForecast.low
                    : Math.round((dayForecast.low * 9) / 5 + 32);

              document.getElementById("main-temp").innerHTML = 
                `<span class="text-6xl sm:text-8xl font-bold font-[Bricolage_Grotesque]">${formatTemp(displayData.temp, units[state.unit].temp)}</span>
                 <span class="text-xl sm:text-2xl text-secondary-text/80 block mt-[-1rem]">/${formatTemp(convertedLow, units[state.unit].temp)}</span>`;
          }

          const {
              temp: tempUnit,
              wind: windUnit,
              precip: precipUnit,
          } = units[state.unit];

          // 1. Main Weather Card
          document.getElementById("main-city").textContent = data.city;
          document.getElementById("main-date").textContent = dateText;
          document.getElementById("main-icon-container").innerHTML =
              getWeatherIcon(condition, "w-full h-full");

          // 2. Detail Cards (Use humidity and wind from the appropriate source, or fallback for future days)
          const humidity = isCurrentDay ? data.current.humidity : data.forecast[selectedDayIndex].hourly[0]?.humidity || data.current.humidity;
          const wind = isCurrentDay ? displayData.wind : displayData.wind; // Using wind max for daily

          document.getElementById("detail-feelslike").textContent = formatTemp(
              displayData.feelsLike,
              tempUnit
          );
          document.getElementById(
              "detail-humidity"
          ).textContent = `${humidity}%`;
          document.getElementById("detail-wind").textContent = formatWind(
              wind,
              windUnit
          );
          document.getElementById("detail-precip").textContent = formatPrecip(
              displayData.precip,
              precipUnit
          );
          
          // Also trigger re-render for daily forecast to update the selection highlight
          renderDailyForecast(data.forecast); 
          // And hourly forecast
          renderHourlyForecast(data.forecast);
      }


      // Renders the main weather data content (Initial injection of template only)
      function renderWeatherData() {
        const data = state.weatherData;
        if (!data) return;

        // The template is injected once in renderApp when state.uiState becomes 'loaded'
        
        // Initial call to populate the details
        updateMainWeatherDisplay();
      }

      function renderDailyForecast(forecast) {
        const container = document.getElementById("daily-forecast-container");
        if (!container) return;
        container.innerHTML = "";

        const { temp: tempUnit } = units[state.unit];

        forecast.forEach((day, index) => {
          const highTemp =
            state.unit === "metric"
              ? day.high
              : Math.round((day.high * 9) / 5 + 32);
          const lowTemp =
            state.unit === "metric"
              ? day.low
              : Math.round((day.low * 9) / 5 + 32);

          const isSelected = index === state.selectedDayIndex;

          const dayEl = document.createElement("div");
          dayEl.className =
            `p-3 bg-card-dark rounded-xl flex flex-col items-center cursor-pointer transition ` +
            (isSelected ? 'ring-2 ring-accent-purple shadow-lg' : 'hover:ring-2 hover:ring-accent-purple');
          
          // FIX: Change click handler to only update the relevant parts, not re-render the whole content
          dayEl.addEventListener("click", () => {
            state.selectedDayIndex = index;
            updateMainWeatherDisplay(); // Update main card and details
            // The hourly forecast update is handled within updateMainWeatherDisplay to ensure sync
          });

          dayEl.innerHTML = `
                    <p class="text-sm font-semibold mb-2">${day.day}</p>
                    <div class="w-8 h-8 flex items-center justify-center mb-2">
                       ${getWeatherIcon(day.condition, "w-6 h-6")}
                    </div>
                    <p class="text-sm font-bold">${formatTemp(
                      highTemp,
                      tempUnit
                    )}</p>
                    <p class="text-xs text-secondary-text">${formatTemp(
                      lowTemp,
                      tempUnit
                    )}</p>
                `;
          container.appendChild(dayEl);
        });
      }

      function renderHourlyForecast(forecast) {
        const container = document.getElementById("hourly-forecast-container");
        const dayToggle = document.getElementById("hourly-day-toggle");
        const dayText = document.getElementById("hourly-day-text");
        const dayDropdown = document.getElementById("hourly-day-dropdown");

        if (!container || !dayText || !dayDropdown) return;

        const selectedDay = forecast[state.selectedDayIndex];
        const hourlyData = selectedDay.hourly;
        const { temp: tempUnit } = units[state.unit];

        dayText.textContent = selectedDay.day;
        container.innerHTML = "";

        if (hourlyData.length === 0) {
          container.innerHTML = `<div class="text-secondary-text text-center py-4">No hourly data available for ${selectedDay.day}.</div>`;
        } else {
          // Filter to show only future/current hours if it's the current day (index 0)
          const now = new Date();
          const currentHour = now.getHours();
          const currentDayDate = new Date().toISOString().split('T')[0];
          
          const filteredHourlyData =
            selectedDay.date === currentDayDate
              ? hourlyData.filter(
                  (hour) => new Date(hour.time).getHours() >= currentHour
                )
              : hourlyData;

          // FIX START: Modified logic to handle filtering
          let displayData = filteredHourlyData;

          // If it's *not* the current day, or if it is the current day and we still have data after filtering for future hours,
          // then we limit the display to the top 10 items.
          if (selectedDay.date !== currentDayDate || filteredHourlyData.length > 0) {
              displayData = filteredHourlyData.slice(0, 10);
          } else {
              // If it's the current day, and filteredHourlyData is empty (meaning all hours have passed)
              displayData = [];
          }

          if (displayData.length === 0) {
            container.innerHTML = `<div class="text-secondary-text text-center py-4">No hourly data available for ${selectedDay.day}.</div>`;
            // Note: Keeping the toggle visible, as the day is still technically selected.
            // You might choose to hide it, but keeping it visible allows day selection via dropdown.
            dayToggle.classList.remove('hidden'); 
          } else {
            dayToggle.classList.remove('hidden');

            displayData.forEach((hour) => {
              const temp =
                state.unit === "metric"
                  ? hour.temp
                  : Math.round((hour.temp * 9) / 5 + 32);

              const hourEl = document.createElement("div");
              hourEl.className =
                "flex items-center justify-between p-3 bg-bg-dark rounded-xl hover:bg-opacity-80 transition";
              hourEl.innerHTML = `
                          <div class="flex items-center space-x-3">
                              <div class="w-6 h-6 flex items-center justify-center">
                                  ${getWeatherIcon(hour.condition, "w-5 h-5")}
                              </div>
                              <p class="text-sm font-medium">${formatTime(
                                hour.time
                              )}</p>
                          </div>
                          <p class="text-sm font-bold">${formatTemp(
                            temp,
                            tempUnit
                          )}</p>
                      `;
              container.appendChild(hourEl);
            });
          }
          // FIX END
        }

        // Render Day Dropdown Content
        dayDropdown.innerHTML = "";
        forecast.forEach((day, index) => {
          const dayOption = document.createElement("button");
          dayOption.className = `w-full text-left px-4 py-2 text-sm hover:bg-bg-dark transition ${
            index === state.selectedDayIndex ? "bg-bg-dark font-bold" : ""
          }`;
          dayOption.textContent = index === 0 ? "Today" : day.day;
          dayOption.addEventListener("click", () => {
            state.selectedDayIndex = index;
            state.isDayDropdownOpen = false;
            // Re-render everything to update selection and hourly list
            updateMainWeatherDisplay();
          });
          dayDropdown.appendChild(dayOption);
        });

        dayDropdown.classList.toggle("hidden", !state.isDayDropdownOpen);
        
        // Rotate the arrow icon if available
        const arrow = dayToggle.querySelector('svg');
        if (arrow) {
            arrow.classList.toggle("rotate-180", state.isDayDropdownOpen);
        }
      }

      function renderUnitsDropdown() {
        const dropdown = DOMElements.unitsDropdown;
        const arrow = DOMElements.unitsArrow; // FIX: Using the cached arrow element
        const currentUnit = state.unit;

        if (!dropdown || !arrow) return; // FIX: Ensure elements exist before trying to manipulate

        const items = [
          // Temperature
          { label: "Temperature", type: "header" },
          {
            label: "Celsius (°C)",
            unit: "metric",
            key: "temp",
            current: currentUnit === "metric",
            action: () => setUnit("metric"),
          },
          {
            label: "Fahrenheit (°F)",
            unit: "imperial",
            key: "temp",
            current: currentUnit === "imperial",
            action: () => setUnit("imperial"),
          },
          // Wind Speed
          { label: "Wind Speed", type: "header" },
          {
            label: "km/h",
            unit: "metric",
            key: "wind",
            current: currentUnit === "metric",
            action: () => setUnit("metric"),
          },
          {
            label: "mph",
            unit: "imperial",
            key: "wind",
            current: currentUnit === "imperial",
            action: () => setUnit("imperial"),
          },
          // Precipitation
          { label: "Precipitation", type: "header" },
          {
            label: "Millimeters (mm)",
            unit: "metric",
            key: "precip",
            current: currentUnit === "metric",
            action: () => setUnit("metric"),
          },
          {
            label: "Inches (in)",
            unit: "imperial",
            key: "precip",
            current: currentUnit === "imperial",
            action: () => setUnit("imperial"),
          },
        ];

        dropdown.innerHTML = "";

        // Add the Switch to Imperial/Metric button (Top item in dropdown)
        const switchBtn = document.createElement("button");
        switchBtn.className =
          "w-full text-left px-4 py-3 text-sm font-semibold hover:bg-bg-dark transition flex justify-between items-center";
        switchBtn.innerHTML = `
                <span>Switch to ${
                  currentUnit === "metric" ? "Imperial" : "Metric"
                }</span>
                <svg class="w-4 h-4 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l7-7 7 7"></path></svg>
            `;
        switchBtn.addEventListener("click", () =>
          setUnit(currentUnit === "metric" ? "imperial" : "metric")
        );
        dropdown.appendChild(switchBtn);

        items.forEach((item) => {
          if (item.type === "header") {
            const header = document.createElement("div");
            header.className =
              "px-4 pt-3 pb-1 text-xs text-secondary-text font-semibold border-t border-bg-dark mt-2";
            header.textContent = item.label;
            dropdown.appendChild(header);
          } else {
            const option = document.createElement("button");
            option.className = `w-full text-left px-4 py-2 text-sm hover:bg-bg-dark transition flex justify-between items-center`;
            option.innerHTML = `
                        <span>${item.label}</span>
                        ${
                          item.current
                            ? `<svg class="w-4 h-4 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
                            : ""
                        }
                    `;
            option.addEventListener("click", () => {
              item.action();
              // Close dropdown on selection
              state.isUnitDropdownOpen = false;
              renderUnitsDropdown();
            });
            dropdown.appendChild(option);
          }
        });

        dropdown.classList.toggle("hidden", !state.isUnitDropdownOpen);
        // FIX: Ensure unitsArrow exists before applying classes
        arrow.classList.toggle(
          "rotate-180",
          state.isUnitDropdownOpen
        );
      }

      function renderSearchDropdown() {
        const dropdown = DOMElements.searchDropdown;
        if (!dropdown) return;

        dropdown.innerHTML = "";

        // Note: Keeping this simple since the Geocoding API is usually for single results.
        if (!state.isSearchDropdownOpen || state.searchQuery.length < 2) {
          dropdown.classList.add("hidden");
          return;
        }

        // Mock search results (the Geocoding API doesn't easily provide a list like this)
        const filteredResults = state.mockSearchResults.filter((r) =>
          r.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );

        if (filteredResults.length === 0) return;

        filteredResults.forEach((result) => {
          const resultEl = document.createElement("button");
          resultEl.className =
            "w-full text-left px-4 py-3 text-sm hover:bg-bg-dark transition";
          resultEl.textContent = result.name;
          // Mock selection action
          resultEl.addEventListener("click", () => {
            DOMElements.searchBar.value = result.name;
            state.isSearchDropdownOpen = false;
            renderSearchDropdown();
            // Simulating a search trigger after selecting from dropdown
            handleSearch(result.name);
          });
          dropdown.appendChild(resultEl);
        });

        dropdown.classList.remove("hidden");
      }

      // ----------------------------------------------------------------
      // EVENT HANDLERS AND ACTIONS
      // ----------------------------------------------------------------

      function setUnit(newUnit) {
        state.unit = newUnit;
        state.isUnitDropdownOpen = false;
        // Reset selected day to the current day index when units change
        if (state.weatherData) {
            state.selectedDayIndex = state.weatherData.currentDayIndex;
        } else {
            state.selectedDayIndex = 0;
        }
        
        // Only re-render if data is loaded
        if (state.uiState === "loaded") {
          updateMainWeatherDisplay(); // Re-render everything to update units
        } else {
          // Still need to update the dropdown visual state
          renderUnitsDropdown(); 
        }
      }

      function handleToggleUnitDropdown() {
        state.isUnitDropdownOpen = !state.isUnitDropdownOpen;
        // Close other open dropdowns
        state.isDayDropdownOpen = false;
        state.isSearchDropdownOpen = false;
        
        renderUnitsDropdown();
        renderSearchDropdown();
        // Only call renderHourlyForecast if the data is present to avoid errors
        if (state.uiState === "loaded")
          renderHourlyForecast(state.weatherData.forecast);
      }

      function handleToggleDayDropdown() {
        state.isDayDropdownOpen = !state.isDayDropdownOpen;
        // Close other open dropdowns
        state.isUnitDropdownOpen = false;
        state.isSearchDropdownOpen = false;

        renderUnitsDropdown();
        renderSearchDropdown();
        // Only call renderHourlyForecast if the data is present to avoid errors
        if (state.uiState === "loaded")
          renderHourlyForecast(state.weatherData.forecast);
      }

      function handleSearchInput(event) {
        state.searchQuery = event.target.value.trim();
        // Close other open dropdowns
        state.isUnitDropdownOpen = false;
        state.isDayDropdownOpen = false;
        // The search dropdown remains closed since we're not using a full autocomplete service
        state.isSearchDropdownOpen = false; 

        renderUnitsDropdown();
        renderSearchDropdown();
        if (state.uiState === "loaded")
          renderHourlyForecast(state.weatherData.forecast);
      }

      async function handleSearch(queryOverride) {
        // Use the query override or the current search bar value
        const query = queryOverride || DOMElements.searchBar.value.trim();
        if (!query) return;

        state.searchQuery = query;
        state.uiState = "loading";
        renderApp(); // Show the loading spinner
        state.isSearchDropdownOpen = false;

        let coords = null;
        let weatherData = null;

        try {
          // 1. Get Coordinates
          const attemptQuery = query === "Pune" ? "Pune, India" : query; // Use a more specific query for the initial load if it's "Pune"
          coords = await fetchCoordinates(attemptQuery);

          if (!coords) {
            state.uiState = "no-results";
            renderApp();
            return;
          }

          // 2. Get Weather Data
          weatherData = await fetchWeatherData(
            coords.lat,
            coords.lon,
            coords.timezone,
            coords.city
          );

          if (!weatherData) {
            state.uiState = "error";
          } else {
            state.uiState = "loaded";
            // IMPORTANT: Set selectedDayIndex based on the index returned by the API call, 
            // which represents the actual current day. In this case, we default to 0 for the first day in the forecast array.
            state.selectedDayIndex = weatherData.currentDayIndex;
            state.weatherData = weatherData;
          }
        } catch (error) {
          console.error("Critical Fetch Error:", error);
          state.uiState = "error";
        }

        renderApp(); // Render final state (loaded, error, or no-results)
      }

      function handleRetry() {
        // Re-run the last successful or attempted search
        const lastQuery =
          state.searchQuery || DOMElements.searchBar.value.trim() || "Pune";
        handleSearch(lastQuery);
      }

      // ----------------------------------------------------------------
      // INITIALIZATION AND LISTENERS
      // ----------------------------------------------------------------

      function attachGlobalListeners() {
        // Units Toggle
        DOMElements.unitsToggle.addEventListener(
          "click",
          handleToggleUnitDropdown
        );

        // Search Functionality
        DOMElements.searchBar.addEventListener("input", handleSearchInput);
        DOMElements.searchButton.addEventListener("click", () =>
          handleSearch()
        );
        DOMElements.searchBar.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        });

        // Hourly Day Toggle (uses event delegation since it's rendered conditionally)
        DOMElements.weatherContent.addEventListener("click", (e) => {
          if (e.target.closest("#hourly-day-toggle")) {
            handleToggleDayDropdown();
          }
        });

        // Global click handler to close dropdowns when clicking outside
        document.addEventListener("click", (event) => {
          const isUnitsClick =
            (DOMElements.unitsDropdown && DOMElements.unitsDropdown.contains(event.target)) ||
            (DOMElements.unitsToggle && DOMElements.unitsToggle.contains(event.target));
            
          const isSearchClick =
            (DOMElements.searchDropdown && DOMElements.searchDropdown.contains(event.target)) ||
            (DOMElements.searchBar && DOMElements.searchBar.contains(event.target)) ||
            (DOMElements.searchButton && DOMElements.searchButton.contains(event.target));

          // Close Units Dropdown if open and click is outside
          if (state.isUnitDropdownOpen && !isUnitsClick) {
            state.isUnitDropdownOpen = false;
            renderUnitsDropdown();
          }

          // Close Search Dropdown if open and click is outside
          if (state.isSearchDropdownOpen && !isSearchClick) {
            state.isSearchDropdownOpen = false;
            renderSearchDropdown();
          }

          // Close Day Dropdown if open and click is outside
          const hourlyDayToggle = document.getElementById("hourly-day-toggle");
          const hourlyDayDropdown = document.getElementById(
            "hourly-day-dropdown"
          );
          const isDayClick =
            (hourlyDayDropdown && hourlyDayDropdown.contains(event.target)) ||
            (hourlyDayToggle && hourlyDayToggle.contains(event.target));

          if (
            state.isDayDropdownOpen &&
            hourlyDayDropdown &&
            hourlyDayToggle &&
            !isDayClick
          ) {
            state.isDayDropdownOpen = false;
            if (state.weatherData)
              renderHourlyForecast(state.weatherData.forecast);
          }
        });
      }

      // FIX: Call the initial search function immediately after all setup, ensuring it runs
      // after the DOMContentLoaded event has completed and the DOMElements cache is populated.
      // We use a slight delay just to be completely safe and ensure all listeners are attached.
      window.onload = () => {
        handleSearch(state.searchQuery);
      };
