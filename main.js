// Array de servicios (simula base de datos, puedes agregar más)
const servicios = [
    {
        id: 1,
        nombre: "Auditoría de Seguridad",
        descripcion: "Identificamos vulnerabilidades y mejoramos tus sistemas.",
        precio: 500,
        imagen: "img/audit.jpg"
    },
    {
        id: 2,
        nombre: "Consultoría Personalizada",
        descripcion: "Estrategias de ciberseguridad a medida para tu empresa.",
        precio: 800,
        imagen: "img/consulting.jpg"
    },
    {
        id: 3,
        nombre: "Formación en Ciberseguridad",
        descripcion: "Capacitamos a tu equipo para identificar y evitar amenazas.",
        precio: 300,
        imagen: "img/training.jpg"
    }
];

// Carrito (cargado de LocalStorage si existe)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Renderizar servicios
function renderServicios() {
    const lista = document.getElementById('service-list');
    lista.innerHTML = "";
    servicios.forEach(servicio => {
        const div = document.createElement('div');
        div.className = "service-item";
        div.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.nombre}">
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <span class="price">$${servicio.precio}</span>
            <button data-id="${servicio.id}">Añadir al carrito</button>
        `;
        lista.appendChild(div);
    });
    // Botones agregar al carrito
    document.querySelectorAll('.service-item button').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    });
}

// Agregar servicio al carrito
function agregarAlCarrito(id) {
    const servicio = servicios.find(s => s.id === id);
    const encontrado = carrito.find(item => item.id === id);
    if (encontrado) {
        encontrado.cantidad += 1;
    } else {
        carrito.push({ ...servicio, cantidad: 1 });
    }
    guardarYActualizarCarrito();
}

// Quitar servicio del carrito
function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYActualizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    guardarYActualizarCarrito();
}

// Guardar en localStorage y actualizar DOM
function guardarYActualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

// Renderizar carrito en DOM
function renderCarrito() {
    const lista = document.getElementById('cart-items');
    const totalDiv = document.getElementById('cart-total');
    const countSpan = document.getElementById('cart-count');
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}</span>
            <button class="remove-btn" data-id="${item.id}">&times;</button>
        `;
        lista.appendChild(li);
    });
    // Botones quitar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            quitarDelCarrito(id);
        });
    });
    totalDiv.textContent = carrito.length ? `Total: $${total}` : '';
    countSpan.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

// Formulario de contacto con feedback DOM
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simula envío
    document.getElementById('contact-feedback').textContent = "¡Gracias por contactarnos! Te responderemos pronto.";
    this.reset();
    setTimeout(() => {
        document.getElementById('contact-feedback').textContent = "";
    }, 3500);
});

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', vaciarCarrito);

// Render inicial
document.addEventListener('DOMContentLoaded', () => {
    renderServicios();
    renderCarrito();
});