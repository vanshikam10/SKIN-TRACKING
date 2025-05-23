// dashboard.js
  const calendarTitle = document.getElementById("calendar-title");
  const calendarBody = document.getElementById("calendar-body");
  const manifestationInput = document.getElementById('manifestation');
  const manifestationList = document.getElementById('manifestation-list');
  
  let currentDate = new Date();
  let selectedDate = null; // Store selected date for manifestation

  function renderCalendar(date) {
    calendarBody.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    calendarTitle.textContent = `${date.toLocaleString("default", { month: "long" })} ${year}`;

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      calendarBody.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayCell = document.createElement("div");
      dayCell.textContent = day;

      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayCell.classList.add("today");
      }

      dayCell.addEventListener("click", () => {
        selectedDate = new Date(year, month, day); // Set the selected date
        dayCell.style.backgroundColor = "#ffaad4"; // Highlight selected day
        manifestForSelectedDate(); // Show manifestation input for the selected date
      });

      calendarBody.appendChild(dayCell);
    }
  }

  function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  }

  function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  }

  function manifestForSelectedDate() {
    // Check if there's an existing manifestation for the selected date
    const savedManifestation = localStorage.getItem(selectedDate.toDateString());
    if (savedManifestation) {
      manifestationInput.value = savedManifestation;
    } else {
      manifestationInput.value = '';
    }
  }

  document.getElementById("manifestation-form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (selectedDate) {
      const manifestationText = manifestationInput.value.trim();
      
      if (manifestationText) {
        // Save manifestation in local storage with the selected date as the key
        localStorage.setItem(selectedDate.toDateString(), manifestationText);
        
        const listItem = document.createElement('li');
        listItem.textContent = `${selectedDate.toDateString()}: ${manifestationText}`;
        manifestationList.appendChild(listItem);
        manifestationInput.value = ''; // Clear the input field
      }
    }
  });

  renderCalendar(currentDate);
