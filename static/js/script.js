// Front‑end interactivity for IgnitoSolutions
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Cart sidebar toggle
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      cartSidebar.classList.toggle('open');
    });
  }

  // In‑page navigation close on link click (for mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Product definitions built from data attributes on buttons
  const cart = [];

  // Add to cart handler
  document.querySelectorAll('.card button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price')) || 0;
      addToCart(id, name, price);
    });
  });

  function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
  }

  function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
      cart.splice(index, 1);
    }
    updateCart();
  }

  function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.querySelector('.cart-count');
    if (countEl) countEl.textContent = count;
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.name} x ${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
      const btn = document.createElement('button');
      btn.textContent = 'Remove';
      btn.setAttribute('data-id', item.id);
      btn.classList.add('remove-btn');
      li.appendChild(btn);
      cartList.appendChild(li);
      total += item.price * item.quantity;
    });
    totalEl.textContent = `$${total.toFixed(2)}`;
    cartList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }

  // Checkout button: collects user info via prompt and posts to server
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
      }
      const name = prompt('Your name:');
      if (!name) return;
      const email = prompt('Your email:');
      if (!email) return;
      const message = prompt('Additional notes (optional):') || '';
      fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total: cart.reduce((s, i) => s + i.price * i.quantity, 0), name, email, message })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            alert('Thank you! Your order has been received.');
            cart.length = 0;
            updateCart();
            cartSidebar.classList.remove('open');
          } else {
            alert('There was an error processing your order. Please try again.');
          }
        })
        .catch(() => alert('There was an error processing your order. Please try again.'));
    });
  }

  // Contact form submission via AJAX
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      fetch('/contact', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            alert('Thank you for reaching out! We will contact you soon.');
            contactForm.reset();
          } else {
            alert(data.message || 'There was an error sending your message.');
          }
        })
        .catch(() => alert('There was an error sending your message.'));
    });
  }

  // CTA buttons on services cards: scroll to contact and prefill message
  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const messageField = document.querySelector('#contact-form textarea[name="message"]');
      if (messageField) {
        messageField.value = `I’m interested in ${name}. Please provide more information.`;
      }
      // Smooth scroll to contact section
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.hidden').forEach((el, index) => {
    observer.observe(el);
    el.style.transitionDelay = `${index * 100}ms`;
  });
});