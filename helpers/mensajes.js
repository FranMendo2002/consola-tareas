require("colors");

const mostrarMenu = () => {
    return new Promise(res => {
        console.clear();
        console.log("======================".cyan);
        console.log("    MENU DE TAREAS    ".bold.brightGreen);
        console.log("======================\n".cyan);
        console.log(`${"1.".yellow} Crear una tarea`);
        console.log(`${"2.".yellow} Listar las tareas`);
        console.log(`${"3.".yellow} Listar tareas completadas`);
        console.log(`${"4.".yellow} Listar tareas pendientes`);
        console.log(`${"5.".yellow} Completar tarea(s)`);
        console.log(`${"6.".yellow} Borrar una tarea`);
        console.log(`${"0.".yellow} Salir \n`);

        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(`Su elección: `.brightCyan.italic, opc => {
            readline.close();
            res(opc);
        });
    });
};

const pausa = () => {
    return new Promise(res => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(
            `\nPresione ${"ENTER".green} para continuar \n`,
            opc => {
                readline.close();
                res();
            }
        );
    });
};

module.exports = {
    mostrarMenu,
    pausa,
};
