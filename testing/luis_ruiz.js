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
  const width = 1280; // Ancho típico de una pantalla grande
  const height = 720; // Alto típico de una pantalla grande

  await page.setViewport({ width, height });
  await page.goto("http://localhost:5173");

  // Aquí va el codigo a desarrollar 

  await browser.close();
  console.log('Fin del test');
};

export default testEliminarJuego;
