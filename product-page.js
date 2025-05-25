function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  return isNaN(id) ? null : id;
}

function renderProduct() {
  const id = getProductIdFromURL();
  const product = products.find(p => p.id === id);
  const container = document.getElementById("product-container");

  if (!product) {
    container.innerHTML = "<p style='color: #ccc;'>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-info">
      <h1>${product.name}</h1>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="description">${product.description}</p>
      <button class="btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    </div>
  `;

  renderSimilarProducts(product);
}

function renderSimilarProducts(currentProduct) {
  const similar = products.filter(p =>
    p.id !== currentProduct.id &&
    (p.category === currentProduct.category ||
     p.tags.some(tag => currentProduct.tags.includes(tag)))
  );

  const carousel = document.getElementById("similar-carousel");
  if (!carousel) return;

  if (similar.length === 0) {
    carousel.innerHTML = `<p style="color:#888;">No similar products found.</p>`;
    return;
  }

  carousel.innerHTML = ""; // Clear first

  similar.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
    `;
    card.onclick = () => window.location.href = `product.html?id=${p.id}`;
    carousel.appendChild(card);
  });
}

function scrollCarousel(direction) {
  const container = document.getElementById("similar-carousel");
  const scrollAmount = container.offsetWidth / 1.2;
  container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}


function addToCart(product, price) {
  const cart = JSON.parse(localStorage.getItem('dropculture-cart')) || [];
  cart.push({ product, price });
  localStorage.setItem('dropculture-cart', JSON.stringify(cart));
  updateCartCounter(); // 🛒 Update live counter
  alert(`${product} added to cart.`);
}

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("dropculture-cart")) || [];
  const counter = document.getElementById("cart-count");
  if (counter) {
    counter.textContent = cart.length;
    counter.style.display = cart.length > 0 ? "inline-block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProduct();
  updateCartCounter();
});
