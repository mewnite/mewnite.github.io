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

function manos(){
  let mano_izq = document.getElementById("mano_izq")
  let mano_der = document.getElementById("mano_der")
  mano_der.style.display = "block";
  mano_izq.style.display = "block"
  mano_der.animate(
    [
      { right: '0' }, // Posición inicial: extremo derecho
      { right: '25%' } // Posición final: centro de la pantalla
    ],
    {
      duration: 3000, // Duración de la animación en milisegundos
      easing: 'ease', // Función de temporización
      fill: 'forwards' // Mantener la posición final después de la animación
    }
  );

  mano_izq.animate(
    [
      { left: '0' }, // Posición inicial: extremo derecho
      { left: '25%' } // Posición final: centro de la pantalla
    ],
    {
      duration:4000, // Duración de la animación en milisegundos
      easing: 'ease', // Función de temporización
      fill: 'forwards' // Mantener la posición final después de la animación
    }
  );
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
    if ((diferencia > 0) && (!document.getElementById("oraculo"))) {
      for (let i = 0; i < diferencia; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.id = `input${inputsActuales.length + i}`;
        input.classList.add("styled-input");
        input.required = true;
        console.log(input.required)
        const estadoLocalStorage = localStorage.getItem("coquete");
        if (estadoLocalStorage === "true") {
          input.classList.add("rosa");
        } else if(estadoLocalStorage === "false"){
          input.classList.remove("rosa");
        }
        input.placeholder = `Ingrese la decisión número: ${
          inputsActuales.length + i + 1
        }`;
        document.body.appendChild(input);
      }
      if(!document.getElementById("oraculo")){
    } else if (diferencia < 0) {
      for (let i = 0; i < Math.abs(diferencia); i++) {
        document.body.removeChild(
          inputsActuales[inputsActuales.length - 1 - i]
        );
      }
    }
  }
  });
});

document.getElementById("publicar").addEventListener("click", () => {
  let inputs = document.querySelectorAll('input[id^="input"]');
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

  let decisiones = [];
  inputs.forEach((input) => {
    decisiones.push(input.value);
    input.value = "";
  });
  
  decisiones = shuffleArray(decisiones);
  let resultado = Math.floor(Math.random() * decisiones.length);
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
    oraculo.style.zIndex = "0"
    oraculo.innerText = resultado_final;
      const anchoPantalla = window.innerWidth
      if(anchoPantalla > 750){
        manos()
      }else if(anchoPantalla <=750){
        mostrarCargando()
      }
   

    setTimeout(() => {
      oraculo.style.display = "block";
      let reinicio = document.body.appendChild(
        document.createElement("button")
      );
      reinicio.id = "reiniciar";
      reinicio.className = "reiniciar";
      reinicio.innerHTML = "Reiniciar";
      reinicio.addEventListener("click", () =>{
        location.reload()
      })
      ocultarCargando();
      mano_der.animate(
        [
          {right: '25'},
          {right: '0%'}
        ],{
          duration:3000,
          easing: 'ease',
          fill: 'forwards'
        }
      )
      mano_izq.animate(
        [
          {left: '25'},
          {left: '0%'}
        ],{
          duration:3000,
          easing: 'ease',
          fill: 'forwards'
        }
      )
    }, 4000);
    setTimeout(() => {
      document.body.removeChild(mano_der)
      document.body.removeChild(mano_izq)
    }, 8000);
  }
});



let firstClick = true;
document.getElementById("coquete").addEventListener("click", () => {
  if (firstClick) {
    if (document.getElementById("titulo")) {
      document.getElementById("titulo").classList.add("rosa");
    }else if(document.getElementById("nuevo_titulo")){
      document.getElementById("nuevo_titulo").classList.add("rosa");
    }
    localStorage.setItem("coquete", true);
    document.body.classList.add("rosa");
    if(document.getElementById("enviar_pregunta")){
      document.getElementById("enviar_pregunta").classList.add("rosa")
    }
    document.getElementById("Contenedor").classList.add("rosa");
    document.getElementById("rango").classList.add("rosa");
    document.getElementById("boton").classList.add("rosa");
    document.getElementById("normal").classList.add("rosa")
    let publicar = document.getElementById("publicar");
    const estadoLocalStorage = localStorage.getItem("coquete");
    if (estadoLocalStorage === "true") {
      publicar.classList.add("rosa");
    }
    firstClick = false;
  } else if (!firstClick) {
    localStorage.setItem("coquete", false);
    document.body.classList.remove("rosa");
    if(document.getElementById("enviar_pregunta")){
      document.getElementById("enviar_pregunta").classList.remove("rosa")
    }else if(document.getElementById("nuevo_titulo")){
      document.getElementById("nuevo_titulo").classList.remove("rosa")   
     }
    document.getElementById("Contenedor").classList.remove("rosa");
    document.getElementById("rango").classList.remove("rosa");
    document.getElementById("boton").classList.remove("rosa");
    boton.classList.remove("rosa");
    if (document.getElementById("titulo")) {
      document.getElementById("titulo").classList.remove("rosa");
    }
    let publicar = document.getElementById("publicar");
    publicar.classList.remove("rosa");
    firstClick = true;
  }
});

document.getElementById("enviar_pregunta").addEventListener("click", () =>{
  var nuevoTitulo = document.getElementById("titulo").value;
  var cont = document.getElementById("cont");
  var titulo = document.getElementById("titulo");
  if(titulo.value != ""){
  var label = document.getElementById("label");
  cont.removeChild(titulo);
  cont.removeChild(label);
  const Titulin = cont.appendChild(document.createElement("h2")); 
  Titulin.innerHTML = nuevoTitulo
  Titulin.className = "nuevo_titulo"
  Titulin.id = "nuevo_titulo"
  document.getElementById("cont").removeChild(document.getElementById("enviar_pregunta"))
  }
})

document.getElementById("titulo").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    var titulo = document.getElementById("titulo");
    if(titulo.value != ""){
    var nuevoTitulo = document.getElementById("titulo").value;
    var cont = document.getElementById("cont");
    var label = document.getElementById("label");
    cont.removeChild(titulo);
    cont.removeChild(label);
    const Titulin = cont.appendChild(document.createElement("h2")); 
    Titulin.innerHTML = nuevoTitulo
    Titulin.className = "nuevo_titulo"
    Titulin.id = "nuevo_titulo"
    document.getElementById("cont").removeChild(document.getElementById("enviar_pregunta"))
  }
}
});
