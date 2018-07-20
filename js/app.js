// VARIABLES
const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
const formularioGastos = document.querySelector('#agregar-gasto');
const btnReiniciar = document.querySelector('#reiniciar-app');
let cantidadPresupuesto;

// CLASE RELACIONADO CON OPERACIONES DEL PRESUPUESTO
class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
	}
	// Metodo para calcular el restante
	calcularRestante(cantidad = 0) {
		return this.restante -= cantidad;
	}
}

class Interfaz {
	insertarPresupuesto(cantidad) {
		const spanPresupuesto = document.querySelector('#total');
		const spanRestante = document.querySelector('#restante');

		spanPresupuesto.innerHTML = `${cantidad}`;
		spanRestante.innerHTML = `${cantidad}`;
	}
	mostrarAlerta(mensaje, tipo) {
		// creamos el div  y el mensaje
		const div = document.createElement('div');
		let texto = document.createTextNode(mensaje);
		// le agregamos las clases de bootstrap para las alertas
		div.classList.add('text-center', 'alert');
		// comprobamos que tipo de alerta debe ser
		if (tipo === 'error') {
			div.classList.add('alert-danger');
		} else {
			div.classList.add('alert-success');
		}
		// insertamos el mensaje dentro del div
		div.appendChild(texto);
		// insertamos el div antes del form
		document.querySelector('.primario').insertBefore(div, formularioGastos);

		// hacemos que el mensaje se quite
		setTimeout(function () {
			document.querySelector('.primario .alert').remove();
			// reseteamos el formulario
			formularioGastos.reset();
		}, 1500);
	}
	agregarLista(nombre, gasto) {
		// creamos el lugar donde colocarlo y el elemento a colocar
		const listaGastos = document.querySelector('#gastos ul');
		const li = document.createElement('li');
		// agregamos clases de bootstrap a el li
		li.className = 'list-group-item d-flex justify-content-between align-items-center';
		// insertamos los valores
		li.innerHTML = `
			${nombre}
			<span class="badge badge-primary badge-pill">$ ${gasto}</span>
		`;
		// insertamos en el html
		listaGastos.appendChild(li);
	}
	presupuestoRestante(cantidad) {
		const restante = document.querySelector('#restante');
		const presupuestoRestanteUsuario = cantidadPresupuesto.calcularRestante(cantidad);
		restante.innerHTML = `${presupuestoRestanteUsuario}`;
		this.comprobarRestante();
		console.log(presupuestoRestanteUsuario);
	}
	comprobarRestante() {
		// tenemos nuestro objeto seleccionado y el div del restante
		const presupuestoTotal = cantidadPresupuesto.presupuesto;
		const presupuestoActual = cantidadPresupuesto.restante;
		
		// comprobamos el restante actual y cambiamos de color
		if ((presupuestoTotal/4) > presupuestoActual) {
			const divRestante = document.querySelector('.restante');
			divRestante.classList.remove('alert-success', 'alert-warning');
			divRestante.classList.add('alert-danger');
		} else if ((presupuestoTotal/2) > presupuestoActual) {
			const divRestante = document.querySelector('.restante');
			divRestante.classList.remove('alert-success');
			divRestante.classList.add('alert-warning');
		}
	}
	reiniciarApp() {
		window.location.reload();
	}
}


// EVENTS LISTENERS

document.addEventListener('DOMContentLoaded', function () {
	if (presupuestoUsuario === null || presupuestoUsuario === '') {
		// con esto recargamos la pagina cada que quede vacio
		window.location.reload();
	} else {
		// instanciamos la clase del presupuesto
		cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
		// instanciamos a la interfaz
		const ui = new Interfaz();
		// llamamos al metodo presupuesto y pasamos el presupuesto del objeto
		ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
	}
});

formularioGastos.addEventListener('submit', function (e) {
	// obtenemos los valores del formulario
	const nombreGasto = document.querySelector('#gasto').value;
	const cantidadGasto = document.querySelector('#cantidad').value;
	// instanciamos a interfaz
	const ui = new Interfaz();

	if (nombreGasto === '' || cantidadGasto === '') {
		// Mandamos 2 parametros, el mensaje y el tipo de alerta
		ui.mostrarAlerta('Porfavor agrega un gasto', 'error')
	} else {
		ui.mostrarAlerta('Se agregó correctamente', 'success');
		ui.agregarLista(nombreGasto, cantidadGasto);
		ui.presupuestoRestante(cantidadGasto);
	}

	e.preventDefault();
});

btnReiniciar.addEventListener('click', function () {
	// llamamos al metodo de la interfaz reiniciiar app para volver a cargar pagina
	const ui = new Interfaz();
	ui.reiniciarApp();
});
