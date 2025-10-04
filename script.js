const carta = document.getElementById("carta");
const bateriaBaja = document.getElementById("bateriaBaja");
const cargaCorazon = document.getElementById("cargaCorazon");

const relleno = document.querySelector(".relleno");
const mensaje = document.getElementById("mensaje");
const corazonesDiv = document.getElementById("corazones");
const corazonSvg = document.querySelector(".corazon");

const musicaFondo = document.getElementById("musicaFondo");
const sonidoBateria = document.getElementById("sonidoBateria");

// Mostrar carta al inicio
carta.classList.add("activo");

// 🎶 Reproducir música de fondo cuando abra
window.addEventListener("click", () => {
  if (musicaFondo.paused) {
    musicaFondo.volume = 0.6;
    musicaFondo.play();
  }
}, { once: true });

// Botón Ver más -> batería baja -> luego corazón
document.getElementById("verMasBtn").addEventListener("click", () => {
  carta.classList.remove("activo");
  bateriaBaja.classList.add("activo");

  // 🔊 Sonido batería baja
  sonidoBateria.play();

  setTimeout(() => {
    bateriaBaja.classList.remove("activo");
    cargaCorazon.classList.add("activo");
  }, 3000);
});

// ⚡ Detectar carga real del celular o laptop
if ('getBattery' in navigator) {
  navigator.getBattery().then(function(battery) {
    function checkCharging() {
      if (battery.charging) {
        iniciarCarga();
      }
    }
    battery.addEventListener('chargingchange', checkCharging);
    checkCharging();
  });
}

// ⚡ Animación de carga
function iniciarCarga() {
  let carga = 0;
  const intervalo = setInterval(() => {
    if (carga >= 100) {
      clearInterval(intervalo);
      mostrarFinalRomantico();
    } else {
      carga += 10;
      let nuevaY = 200 - (carga * 2);
      relleno.setAttribute("y", nuevaY);
    }
  }, 500);
}

// 💖 Mostrar mensaje romántico + corazones flotando
function mostrarFinalRomantico() {
  corazonSvg.classList.add("iluminado");
  mensaje.innerHTML = "💖 Así como este corazón se llena de energía,<br> tú llenas mi vida de amor y felicidad.<br><br>Nayeli, mi ojitos de uva 🍇,<br> eres todo mi ser.<br><br> ¡Felices 3 meses, mi amor eterno! 💖";

  // Generar corazones flotando
  setInterval(() => {
    const corazonF = document.createElement("div");
    corazonF.classList.add("corazon-flotante");
    corazonF.innerHTML = "💖";
    corazonF.style.left = Math.random() * 100 + "vw";
    corazonF.style.fontSize = (20 + Math.random() * 30) + "px";
    corazonF.style.animationDuration = (3 + Math.random() * 4) + "s";
    corazonesDiv.appendChild(corazonF);

    setTimeout(() => {
      corazonF.remove();
    }, 7000);
  }, 500);
}
