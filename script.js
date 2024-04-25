document.addEventListener("DOMContentLoaded", function() {
  const loginModal = document.getElementById("loginModal");
  const closeButton = document.querySelector(".close");
  const userTypeSelect = document.getElementById("userType");
  const passwordInput = document.getElementById("passwordInput");
  const passwordField = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");
  const calendarApp = document.getElementById("calendarApp");
  const currentMonthElement = document.getElementById("currentMonth");
  const daysElement = document.querySelector(".days");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");
  const eventDateInput = document.getElementById("eventDate");
  const eventTitleInput = document.getElementById("eventTitle");
  const eventColorSelect = document.getElementById("eventColor");
  const addEventButton = document.getElementById("addEvent");

  let isAdmin = false;
  let currentDate = new Date();
  let events = [];

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    currentMonthElement.textContent = monthNames[month] + " " + year;

    daysElement.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      daysElement.appendChild(dayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = i;

      const event = events.find(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === i && eventDate.getMonth() === month && eventDate.getFullYear() === year;
      });

      if (event) {
        const eventTitle = document.createElement("div");
        eventTitle.classList.add("event-title");
        eventTitle.textContent = event.title;
        eventTitle.style.backgroundColor = event.color;
        dayElement.appendChild(eventTitle);
      }

      daysElement.appendChild(dayElement);
    }
  }

  function showCalendarApp() {
    loginModal.style.display = "none";
    calendarApp.classList.remove("hidden");
    renderCalendar();
  }

  closeButton.addEventListener("click", function() {
    loginModal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target === loginModal) {
      loginModal.style.display = "none";
    }
  });

  userTypeSelect.addEventListener("change", function() {
    if (userTypeSelect.value === "editor") {
      passwordInput.style.display = "block";
    } else {
      passwordInput.style.display = "none";
    }
  });

  loginButton.addEventListener("click", function() {
    const userType = userTypeSelect.value;
    if (userType === "visitor") {
      showCalendarApp();
      // Hide add event form for visitors
      document.querySelector('.event-form').classList.add('hidden');
    } else if (userType === "editor") {
      const password = passwordField.value;
      // Check if password is correct
      if (password === "1234") {
        isAdmin = true;
        showCalendarApp();
      } else {
        alert("Incorrect password. Please try again.");
      }
    }
  });

  prevMonthButton.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthButton.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  addEventButton.addEventListener("click", function() {
    if (!isAdmin) return; // Only allow admin to add events
    const eventDate = eventDateInput.value;
    const eventTitle = eventTitleInput.value;
    const eventColor = eventColorSelect.value;

    if (eventDate && eventTitle) {
      events.push({ date: eventDate, title: eventTitle, color: eventColor });
      renderCalendar();
      eventDateInput.value = "";
      eventTitleInput.value = "";
    }
  });
});
