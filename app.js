const inquirer = require("inquirer");
const { guardarInformacion, leerDB } = require("./helpers/guardarArchivo");
const {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
	let opc = "";
	const tareas = new Tareas();
	const tareasDB = leerDB();
	if (tareasDB) {
		// Establecer las tareas
		tareas.cargarTareasFromArray(tareasDB);
	}

	do {
		opc = await inquirerMenu();

		switch (opc) {
			case "1": // Crear tarea
				const desc = await leerInput("Ingrese la tarea: ");
				tareas.crearTarea(desc);
				break;
			case "2":
				tareas.listarTareas();
				break;
			case "3":
				tareas.listarPendientesCompletadas();
				break;
			case "4":
				tareas.listarPendientesCompletadas(false);
				break;
			case "5":
				const ids = await mostrarListadoChecklist(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;
			case "6":
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id !== "0") {
					// Preguntar si está seguro
					const ok = await confirmar(
						"¿Está seguro que desea borrar la tarea?"
					);
					if (ok) {
						tareas.borrarTarea(id);
						console.log("Tarea borrada " + "CORRECTAMENTE".green);
					}
				}
		}

		guardarInformacion(tareas.listadoArr);
		await pausa();
	} while (opc != "0");
};

main();
