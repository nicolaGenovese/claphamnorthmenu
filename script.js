
      function getDailyPin() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        return day + month; // es. "0201" per 2 gennaio
      }
      async function simpleHash(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      }

      const menu = [
        {
          title: "Sautéed Brixham Squid",
          subtitle: "Starter • 478 kcal",
          description:
            "Fresh squid with nduja, sourdough, and squid ink aioli.",
          image: "images/squid.jpeg",
          ingredients: [
            "Brixham squid",
            "Nduja",
            "Sourdough",
            "Squid ink aioli",
          ],
          price: "£7.50",
          category: "starters",
        },
        {
          title: "Cauliflower and Vegan Feta Fritters",
          subtitle: "Starter (vg) • 628 kcal",
          description: "Crispy fritters with Hurfa sweet chilli sauce.",
          image: "images/fritters.jpeg",
          ingredients: ["Cauliflower", "Vegan feta", "Hurfa sweet chilli"],
          price: "£9.00",
          category: "starters",
        },
        {
          title: "Grilled Tenderstem Broccoli",
          subtitle: "Starter (vg) • 356 kcal",
          description: "With romesco sauce and smoked almonds.",
          image: "images/broccoli.jpeg",
          ingredients: [
            "Tenderstem broccoli",
            "Romesco sauce",
            "Smoked almonds",
          ],
          price: "£7.00",
          category: "starters",
        },
        {
          title: "Fried Buttermilk Chicken Wings",
          subtitle: "Starter • 679 kcal",
          description: "Crispy wings with hot honey sauce.",
          image: "images/wings.jpeg",
          ingredients: ["Buttermilk chicken wings", "Hot honey sauce"],
          price: "£8.00",
          category: "starters",
        },
        {
          title: "Glazed Chicken Skewers",
          subtitle: "Starter • 370 kcal",
          description: "With miso, lime and tarragon mayo.",
          image: "images/skewers.jpeg",
          ingredients: [
            "Chicken skewers",
            "Miso glaze",
            "Lime",
            "Tarragon mayo",
          ],
          price: "£7.00",
          category: "starters",
        },
        {
          title: "Grilled Corn",
          subtitle: "Starter • 187 kcal",
          description: "Pico de Gallo with Isle of Wight tomato salsa.",
          image: "images/corn.jpeg",
          ingredients: [
            "Grilled corn",
            "Pico de Gallo",
            "Isle of Wight tomato salsa",
          ],
          price: "£4.00",
          category: "starters",
        },
        {
          title: "Naughty Tots",
          subtitle: "Starter • 771 kcal",
          description:
            "Pulled chicken thigh, pico de gallo, chicken gravy, melted cheese, crispy shallots, hot honey mayo.",
          image: "images/tots.jpeg",
          ingredients: [
            "Pulled chicken thigh",
            "Pico de gallo",
            "Chicken gravy",
            "Melted cheese",
            "Crispy shallots",
            "Hot honey mayo",
          ],
          price: "£8.00",
          category: "starters",
        },
        {
          title: "Triple Cooked Chips",
          subtitle: "Starter • 673 kcal",
          description: "Our signature crispy chips.",
          image: "images/chips.jpeg",
          ingredients: ["Triple cooked chips"],
          price: "£4.50",
          category: "starters",
        },
        {
          title: "Flat Iron Chicken",
          subtitle: "Main • 1729 kcal",
          description: "Hassleback jersey royals with pickled fennel salad.",
          image: "images/flatiron.jpeg",
          ingredients: [
            "Flat iron chicken",
            "Hassleback jersey royals",
            "Pickled fennel salad",
          ],
          price: "£18.00",
          category: "mains",
        },
        {
          title: "Cyder Battered Haddock & Triple Cooked Chips",
          subtitle: "Main • 735 kcal",
          description:
            "Marrowfat peas, curry sauce, tartar sauce, charred lemon.",
          image: "images/fishandchips.jpeg",
          ingredients: [
            "Cyder battered haddock",
            "Triple cooked chips",
            "Marrowfat peas",
            "Curry sauce",
            "Tartar sauce",
            "Charred lemon",
          ],
          price: "£19.50",
          category: "mains",
        },
        {
          title: "Buttermilk Chicken Thigh Burger",
          subtitle: "Main • 1112 kcal",
          description:
            "Crispy maple cured bacon, honey hot sauce mayo, fennel and lime slaw, fries.",
          image: "images/chickenburger.jpeg",
          ingredients: [
            "Buttermilk chicken thigh",
            "Crispy maple cured bacon",
            "Honey hot sauce mayo",
            "Fennel and lime slaw",
            "Fries",
          ],
          price: "£16.00",
          category: "mains",
        },
        {
          title: "Clapham North Signature Burger",
          subtitle: "Main • 946 kcal",
          description:
            "Burger cheese, pickled onions, gherkin, burger sauce, fries.",
          image: "images/beefburger.jpeg",
          ingredients: [
            "Beef patty",
            "Burger cheese",
            "Pickled onions",
            "Gherkin",
            "Burger sauce",
            "Fries",
          ],
          price: "£17.50",
          category: "mains",
        },
        {
          title: "Plant Burger",
          subtitle: "Main (vg) • 667 kcal",
          description:
            "Vegan cheddar, pickled onions, gherkin, burger sauce, fries.",
          image: "images/plant.jpeg",
          ingredients: [
            "Plant-based patty",
            "Vegan cheddar",
            "Pickled onions",
            "Gherkin",
            "Burger sauce",
            "Fries",
          ],
          price: "£16.50",
          category: "mains",
        },
        {
          title: "Rump Steak",
          subtitle: "Main • 1230 kcal",
          description:
            "Bone marrow and wild garlic crumb, Madeira sauce, fries.",
          image: "images/steak.jpeg",
          ingredients: [
            "Rump steak",
            "Bone marrow",
            "Wild garlic crumb",
            "Madeira sauce",
            "Fries",
          ],
          price: "£19.00",
          category: "mains",
        },
        {
          title: "Banana Split",
          subtitle: "Pudding (vg) • 463 kcal",
          description: "Salted caramel ice cream with chocolate chip cookies.",
          image: "images/banana.jpeg",
          ingredients: [
            "Banana",
            "Salted caramel ice cream",
            "Chocolate chip cookies",
          ],
          price: "£6.00",
          category: "puddings",
        },
        {
          title: "Honey Roasted Peach",
          subtitle: "Pudding • 415 kcal",
          description: "Whipped mascarpone with macerated raspberries.",
          image: "images/peach.jpeg",
          ingredients: [
            "Honey roasted peach",
            "Whipped mascarpone",
            "Macerated raspberries",
          ],
          price: "£6.00",
          category: "puddings",
        },
        {
          title: "Strawberry & Basil Cheesecake",
          subtitle: "Pudding • 802 kcal",
          description: "Classic cheesecake with strawberry and basil.",
          image: "",
          ingredients: ["Cheesecake", "Strawberry", "Basil"],
          price: "£6.00",
          category: "puddings",
        },
        {
          title: "Ice Cream Scoop",
          subtitle: "Pudding • 358 kcal",
          description: "Single scoop of premium ice cream.",
          image: "",
          ingredients: ["Premium ice cream"],
          price: "£2.50",
          category: "puddings",
        },
        {
          title: "Sunday Roast",
          subtitle: "Sunday Roast",
          description: "Sunday Roast served with all the trimmings.",
          image: "images/roast.jpeg",
          ingredients: [
            "Potatos, Carrots, Red Cabbage, Creamy Leeks, Yorkshire Pudding, Gravy",
          ],
          price: "£0.00",
          category: "Sunday Roast",
        },
      ];

      function checkAuthStatus() {
        const isAuthenticated =
          sessionStorage.getItem("authenticated") === "true";
        if (isAuthenticated) showMenu();
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
          const todayPin = getDailyPin(); // <-- genera il PIN del giorno
          const correctPinHash = await simpleHash(todayPin); // <-- calcola il suo hash
          const enteredHash = await simpleHash(enteredPin); // <-- hash del PIN inserito

          if (enteredHash === correctPinHash) {
            sessionStorage.setItem("authenticated", "true");
            showMenu();
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
      }

      // Lightbox functions
      function openLightbox(imageSrc, caption) {
        if (!imageSrc) return;
        document.getElementById("lightboxImg").src = imageSrc;
        document.getElementById("lightboxCaption").textContent = caption;
        document.getElementById("lightbox").classList.add("active");
        document.body.style.overflow = "hidden";
      }

      function closeLightbox() {
        document.getElementById("lightbox").classList.remove("active");
        document.body.style.overflow = "auto";
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
          if (categories[dish.category])
            categories[dish.category].items.push(dish);
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

      document
        .getElementById("pinInput")
        .addEventListener("keypress", function (e) {
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
      document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );

      // Disabilita trascinamento e salvataggio delle immagini
      document.addEventListener("dragstart", (event) => {
        if (event.target.tagName === "IMG") event.preventDefault();
      });

      // Disabilita tasto destro solo sulle immagini
      document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("contextmenu", (e) => e.preventDefault());
      });
