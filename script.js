// Variabile per tracciare il timeout
let inactivityTimeout;
const INACTIVITY_TIME = 10000; // 10 secondi in millisecondi

function getDailyPin() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return day + month;
}

async function simpleHash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function checkAuthStatus() {
  const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
  if (isAuthenticated) {
    showMenu();
    startInactivityTimer(); // Avvia il timer quando si carica la pagina autenticata
  }
}

async function checkPin() {
  const pinInput = document.getElementById("pinInput");
  const errorMsg = document.getElementById("errorMsg");
  const loginBtn = document.getElementById("loginBtn");
  const enteredPin = pinInput.value.trim();

  if (enteredPin.length !== 4) {
    showError("PIN must be 4 digits");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Verifying...";

  try {
    const todayPin = getDailyPin();
    const correctPinHash = await simpleHash(todayPin);
    const enteredHash = await simpleHash(enteredPin);

    if (enteredHash === correctPinHash) {
      sessionStorage.setItem("authenticated", "true");
      showMenu();
      startInactivityTimer(); // Avvia il timer dopo il login
    } else {
      showError("Incorrect PIN. Please try again.");
      pinInput.value = "";
      pinInput.focus();
    }
  } catch (error) {
    showError("Verification error. Please try again.");
  }

  loginBtn.disabled = false;
  loginBtn.textContent = "Login";
}

function showError(message) {
  const errorMsg = document.getElementById("errorMsg");
  const pinInput = document.getElementById("pinInput");
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
  pinInput.classList.add("error");
  setTimeout(() => {
    errorMsg.style.display = "none";
    pinInput.classList.remove("error");
  }, 3000);
}

function showMenu() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("menuContent").style.display = "block";
  renderMenu(menu);
}

function logout() {
  sessionStorage.removeItem("authenticated");
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("menuContent").style.display = "none";
  document.getElementById("pinInput").value = "";
  stopInactivityTimer(); // Ferma il timer quando si fa logout
}

// NUOVE FUNZIONI PER GESTIRE IL TIMEOUT
function startInactivityTimer() {
  // Cancella eventuali timer precedenti
  stopInactivityTimer();

  // Avvia nuovo timer
  inactivityTimeout = setTimeout(() => {
    logout();
    showError("Session expired due to inactivity");
  }, INACTIVITY_TIME);
}

function stopInactivityTimer() {
  if (inactivityTimeout) {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = null;
  }
}

function resetInactivityTimer() {
  // Riavvia il timer solo se l'utente è autenticato
  const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
  if (isAuthenticated) {
    startInactivityTimer();
  }
}

// Eventi che resettano il timer di inattività
const activityEvents = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
  "click",
];

activityEvents.forEach((event) => {
  document.addEventListener(event, resetInactivityTimer, true);
});

// Lightbox functions
function openLightbox(imageSrc, caption) {
  if (!imageSrc) return;
  document.getElementById("lightboxImg").src = imageSrc;
  document.getElementById("lightboxCaption").textContent = caption;
  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
  resetInactivityTimer(); // Reset timer quando si apre lightbox
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "auto";
  resetInactivityTimer(); // Reset timer quando si chiude lightbox
}

// Close lightbox with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});

function renderMenu(list) {
  const container = document.getElementById("menuList");
  container.innerHTML = "";
  const categories = {
    starters: { title: "STARTERS", items: [] },
    mains: { title: "MAINS", items: [] },
    puddings: { title: "PUDDINGS", items: [] },
    "Sunday Roast": { title: "SUNDAY ROAST", items: [] },
  };
  list.forEach((dish) => {
    if (categories[dish.category]) categories[dish.category].items.push(dish);
  });
  Object.values(categories).forEach((category) => {
    if (category.items.length > 0) {
      const categoryHeader = document.createElement("div");
      categoryHeader.style.gridColumn = "1 / -1";
      categoryHeader.style.textAlign = "center";
      categoryHeader.style.margin = "32px 0 24px 0";
      categoryHeader.innerHTML = `<h2 style="font-size: 28px; color: var(--muted); letter-spacing: 2px; margin: 0;">${category.title}</h2>`;
      container.appendChild(categoryHeader);
      category.items.forEach((dish) => {
        const card = document.createElement("div");
        card.className = "card";
        const hasImage = dish.image && dish.image.trim() !== "";
        card.innerHTML = `
${
  hasImage
    ? `<div class="media" onclick="openLightbox('${dish.image}', '${dish.title}')"><img src="${dish.image}" alt="${dish.title}"></div>`
    : ""
}
<div class="meta">
<h3 class="dish-title">${dish.title}</h3>
<p class="sub">${dish.subtitle}</p>
<p class="desc">${dish.description}</p>
<div class="ingredients">
<strong>Ingredients:</strong>
<ul>${dish.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
</div>
<div class="price">${dish.price}</div>
</div>
`;
        container.appendChild(card);
      });
    }
  });
}

document.getElementById("pinInput").addEventListener("keypress", function (e) {
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "Enter"
  ) {
    e.preventDefault();
  }
  if (e.key === "Enter") checkPin();
});

checkAuthStatus();

// Disabilita click destro su tutta la pagina
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Disabilita trascinamento e salvataggio delle immagini
document.addEventListener("dragstart", (event) => {
  if (event.target.tagName === "IMG") event.preventDefault();
});

// Disabilita tasto destro solo sulle immagini
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", (e) => e.preventDefault());
});
