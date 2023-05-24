//switch theme
const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const slider = document.querySelector("#slider-tema");

const setTheme = (theme) => {
	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
};

slider.addEventListener("click", () => {
	let switchToTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
	setTheme(switchToTheme);
});

setTheme(localStorage.getItem("theme") || preferedColorScheme);
//

const fallidos = document.querySelector(".fallidos");
const ultimoResultado = document.querySelector(".ultimo-resultado");
const mayorMenor = document.querySelector(".mayot-menor");
const enviarAdivina = document.querySelector(".enviar-adivina");
const inputAdivina = document.querySelector(".input-adivina");

let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let cantidadIntentos = 1;
let btnReseteo;

function controlarNumero() {
	const numeroIngresado = Number(inputAdivina.value);
	if (cantidadIntentos === 1) {
		fallidos = "Numero ingresados antes: ";
	}

	fallidos.textContent += numeroIngresado + " ";

	if (numeroIngresado === numeroAleatorio) {
		ultimoResultado.textContent = "Felicitaciones ! Adivinaste el numero !";
		ultimoResultado.style.backgroundColor = "green";
		mayorMenor.textContent = "";
		finDelJuego();
	} else if (cantidadIntentos === 10) {
		ultimoResultado = "Perdiste ! Fin del juego !";
		mayorMenor.textContent = "";
		finDelJuego();
	} else {
		ultimoResultado.textContent = "Fallaste !";
		ultimoResultado.style.backgroundColor = "red";
		if (numeroIngresado < numeroAleatorio) {
			mayorMenor.textContent = "El numero que ingresaste es bajo";
		} else if (numeroIngresado > numeroAleatorio) {
			mayorMenor.textContent = "El numero que ingresaste es mas bajo";
		}
	}
	cantidadIntentos++;
	inputAdivina.value = "";
	inputAdivina.focus();
}

enviarAdivina.addEventListener("click", controlarNumero);
