import testRegistrarJuego from './juan_pena.js'
import testConsultarJuego from './niyi_gutierres.js'
import testEditarJuego from './carlos_rocha.js'
import testEliminarJuego from './luis_ruiz.js'


console.log('Iniciando sesión de testing');

const registrar = await testRegistrarJuego();
const consultar = await testConsultarJuego();
const editar = await testEditarJuego();
const eliminar = await testEliminarJuego();

console.log('Finalizada sesión de testing');
