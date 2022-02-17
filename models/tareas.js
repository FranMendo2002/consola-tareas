const Tarea = require("./tarea");
const colors = require("colors");

class Tareas {
	_listado = {};
	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach(key => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	constructor() {
		this._listado = {};
	}

	borrarTarea(id = "") {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach(tarea => (this._listado[tarea.id] = tarea));
	}

	crearTarea(desc = "") {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	listarTareas() {
		console.log();

		this.listadoArr.forEach((tarea, index) => {
			const indice = `${index + 1}.`.green;
			const completadoEn = tarea.completadoEn
				? `Completada`.green
				: "Pendiente".red;
			let tareaString = `${indice} ${tarea.desc} :: ${completadoEn}`;
			console.log(tareaString);
		});
	}

	listarPendientesCompletadas(completadas = true) {
		let tareasFiltradas = this.listadoArr.filter(tarea =>
			completadas
				? tarea.completadoEn != null
				: tarea.completadoEn == null
		);
		tareasFiltradas.forEach((tarea, i) => {
			const estadoTarea = completadas
				? `Completada en ${tarea.completadoEn.green}`
				: "Pendiente".red;
			const indice = `${i + 1}`.green;
			console.log(`${indice}. ${tarea.desc} :: ${estadoTarea}`);
		});
		console.log();
	}

	toggleCompletadas(ids = []) {
		ids.forEach(id => {
			const tarea = this._listado[id];
			if (!tarea.completadoEn) {
				tarea.completadoEn = new Date().toISOString();
			}
		});

		this.listadoArr.forEach(tarea => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;
