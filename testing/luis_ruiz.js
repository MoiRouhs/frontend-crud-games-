import puppeteer from "puppeteer";

const testEliminarJuego = async () => {
  console.log('Tester: Luis Ruiz');
  console.log('Nombre del test: Eliminar juego');
  console.log('Iniciando......');
  
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  const width = 1280;
  const height = 720;

  await page.setViewport({ width, height });

  await page.goto("http://localhost:5173");

  // Ir a la página Todos los juegos
  await page.click('a[href*="allgames"]');

  // Capturar todos los juegos antes de eliminar
  const juegosAntes = await page.evaluate(() => {
    const juegos = [];
    const filas = document.querySelectorAll('.games-table tbody tr');
    filas.forEach(fila => {
      const codigo = fila.querySelector('td:nth-child(1)').textContent.trim();
      const nombre = fila.querySelector('td:nth-child(2)').textContent.trim();
      juegos.push({ codigo, nombre });
    });
    return juegos;
  });

  if (juegosAntes.length === 0) {
    console.log('No hay juegos disponibles para eliminar.');
    await browser.close();
    return false;
  }

  // Seleccionar un juego aleatorio
  const randomIndex = Math.floor(Math.random() * juegosAntes.length);
  const juegoSeleccionado = juegosAntes[randomIndex];
  
  console.log(`Juego seleccionado para eliminar: Código - ${juegoSeleccionado.codigo}, Nombre - ${juegoSeleccionado.nombre}`);

  // Seleccionar el botón de eliminar
  const filas = await page.$$('.games-table tbody tr');
  const filaJuego = filas[randomIndex]; // Usar el índice aleatorio para seleccionar la fila

  const botonEliminar = await filaJuego.$(`td:nth-child(4) > button`); 
  await botonEliminar.click();
  
  console.log(`Botón de eliminar clickeado para el juego con código: ${juegoSeleccionado.codigo}`);

  // Capturar todos los juegos después de eliminar
  const juegosDespues = await page.evaluate(() => {
    const juegos = [];
    const filas = document.querySelectorAll('.games-table tbody tr');
    filas.forEach(fila => {
      const codigo = fila.querySelector('td:nth-child(1)').textContent.trim();
      const nombre = fila.querySelector('td:nth-child(2)').textContent.trim();
      juegos.push({ codigo, nombre });
    });
    return juegos;
  });

  // Validar que el juego eliminado ya no está en la lista
  if (juegosDespues.length === 0) {
    console.log(`El juego con código ${juegoSeleccionado.codigo} ha sido eliminado exitosamente. No quedan más juegos.`);
    console.log('Test de Eliminar un juego aprobado');
    await browser.close();
    console.log('Fin del test');
    return true;
  }

  const juegoEliminado = juegosDespues.find(juego => juego.codigo === juegoSeleccionado.codigo);

  if (!juegoEliminado) {
    console.log(`El juego con código ${juegoSeleccionado.codigo} y nombre ${juegoSeleccionado.nombre} ha sido eliminado exitosamente.`);
    console.log('Test de Eliminar un juego aprobado');
    await browser.close();
    console.log('Fin del test');
    return true;
  } else {
    console.log(`El juego con código ${juegoSeleccionado.codigo} aún está presente en la lista.`);
    console.log('Test de Eliminar un juego reprobado');
    await browser.close();
    console.log('Fin del test');
    return false;
  }
};

export default testEliminarJuego;
