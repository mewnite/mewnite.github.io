window.onload = function () {
  localStorage.setItem("coquete", false);
};

function mostrarCargando() {
  var spinner = document.getElementById("loading-spinner");
  spinner.classList.add("loading");
}
function ocultarCargando() {
  var spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("loading");
}

let boton = document.getElementById("boton");
if (!boton) {
  boton = document.createElement("button");
  boton.id = "boton";
  boton.innerText = "Decisiometro";
  document.getElementById("Contenedor").appendChild(boton);
}

document.getElementById("rango").addEventListener("input", (event) => {
  let rango = document.getElementById("rango");
  let valor = (document.getElementById("valor").innerText = rango.value);
  if (document.getElementById("coquete")) {
    document.body.removeChild(document.getElementById("coquete"));
  }
  boton.addEventListener("click", () => {
    document.getElementById("publicar").style.display = "block";
    let inputsActuales = document.querySelectorAll('input[id^="input"]');
    let diferencia = valor - inputsActuales.length;
    if (diferencia > 0) {
      for (let i = 0; i < diferencia; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.id = `input${inputsActuales.length + i}`;
        input.classList.add("styled-input");
        const estadoLocalStorage = localStorage.getItem("coquete");
        if (estadoLocalStorage === "true") {
          input.classList.add("rosa");
        } else {
          input.classList.remove("rosa");
        }
        input.placeholder = `Ingrese la decisión número: ${
          inputsActuales.length + i + 1
        }`;
        document.body.appendChild(input);
      }
    } else if (diferencia < 0) {
      for (let i = 0; i < Math.abs(diferencia); i++) {
        document.body.removeChild(
          inputsActuales[inputsActuales.length - 1 - i]
        );
      }
    }
  });
});

document.getElementById("publicar").addEventListener("click", () => {
  let inputs = document.querySelectorAll('input[id^="input"]');
  let decisiones = [];
  inputs.forEach((input) => {
    decisiones.push(input.value);
    input.value = "";
  });
  let resultado;
  resultado = Math.floor(Math.random() * inputs.length);
  let resultado_final = decisiones[resultado];
  let respuesta = document.getElementById("respuesta");
  if (!respuesta) {
    let respuesta = document.body.appendChild(document.createElement("div"));
    respuesta.id = "respuesta";
    respuesta.className = "respuesta";
    let spinner = respuesta.appendChild(document.createElement("div"));
    spinner.id = "loading-spinner";
    spinner.className = "spinner";
    let oraculo = respuesta.appendChild(document.createElement("p"));
    oraculo.id = "oraculo";
    oraculo.className = "oraculo";
    oraculo.innerText = resultado_final;
    mostrarCargando();
    setTimeout(() => {
      oraculo.style.display = "block";
      let reinicio = document.body.appendChild(
        document.createElement("button")
      );
      reinicio.id = "reiniciar";
      reinicio.className = "reiniciar";
      reinicio.innerHTML = "Reiniciar";

      ocultarCargando();
    }, 3000);
  } else {
    respuesta.parentNode.removeChild(respuesta);
  }
});

let firstClick = true;
document.getElementById("coquete").addEventListener("click", () => {
  if (firstClick) {
    if (document.getElementById("titulo")) {
      document.getElementById("titulo").classList.add("rosa");
    }
    let coquete = document.getElementById("coquete");
    coquete.style.backgroundColor = "#e17c99";
    localStorage.setItem("coquete", true);
    document.body.classList.add("rosa");
    document.getElementById("Contenedor").classList.add("rosa");
    document.getElementById("rango").classList.add("rosa");
    document.getElementById("boton").classList.add("rosa");
    let publicar = document.getElementById("publicar");
    if (boton.classList.value === "rosa") {
      publicar.classList.add("rosa");
    } else {
      publicar.classList.remove("rosa");
    }
    firstClick = false;
  } else if (!firstClick) {
    localStorage.setItem("coquete", false);
    document.body.classList.remove("rosa");
    document.getElementById("Contenedor").classList.remove("rosa");
    document.getElementById("rango").classList.remove("rosa");
    document.getElementById("boton").classList.remove("rosa");
    boton.classList.remove("rosa");
    let coquete = document.getElementById("coquete");
    coquete.style.backgroundColor = "#e099ad";
    if (document.getElementById("titulo")) {
      document.getElementById("titulo").classList.remove("rosa");
    }
    firstClick = true;
  }
});

document.getElementById("titulo").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    var nuevoTitulo = document.getElementById("titulo").value;
    var cont = document.getElementById("cont");
    var titulo = document.getElementById("titulo");
    var label = document.getElementById("label");
    cont.removeChild(titulo);
    cont.removeChild(label);
    cont.appendChild(document.createElement("h2")).innerHTML = nuevoTitulo;
  }
});
