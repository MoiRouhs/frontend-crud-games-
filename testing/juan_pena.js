import puppeteer from 'puppeteer';

const testRegistrarJuego = async () => {
  console.log('Tester: Juan Peña');
  console.log('Nombre del test: Registrar juego');
  console.log('Iniciando...');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    args: ['--start-maximized'],
  });

  const page = await browser.newPage();

  // Captura de logs del navegador
  page.on('console', (msg) => console.log('Página log:', msg.text()));

  // Captura de respuestas para diagnosticar errores
  page.on('response', async (response) => {
    if (response.url().includes('/addgame')) {
      console.log(`Respuesta API [${response.url()}]: Estado ${response.status()}`);
      if (response.status() !== 200) {
        console.error('Error en la API:', await response.text());
      }
    }
  });

  try {
    const width = 1280;
    const height = 720;
    await page.setViewport({ width, height });

    console.log('Cargando página principal...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

    console.log('Página cargada. Accediendo al formulario de creación...');
    await page.waitForSelector('a[href="/addgame"]', { visible: true, timeout: 3000 });
    await page.click('a[href="/addgame"]');

    console.log('Formulario cargado. Completando campos...');
    await page.waitForSelector('input[placeholder="Código"]', { visible: true, timeout: 10000 });
    await page.type('input[placeholder="Código"]', '20002');
    await page.type('input[placeholder="Nombre"]', 'HALO-3');
    await page.type('input[placeholder="Descripción"]', 'Un clásico de plataformas');
    await page.type('input[placeholder="Consola"]', 'xbox');
    await page.type('input[placeholder="Año de lanzamiento"]', '2001');
    await page.type('input[placeholder="Número de jugadores"]', '6');
    await page.type(
      'input[placeholder="URL de la imagen"]',
      'https://example.com/contra.png'
    );

    console.log('Enviando formulario...');
    await page.waitForSelector('button[type="submit"]', { visible: true, timeout: 3000 });
    await page.click('button[type="submit"]');

    console.log('Esperando redirección o carga de la página...');
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 2000 });
    console.log('Página después de redirección:', page.url());

    console.log('Esperando mensaje de éxito o error...');
    const successSelector = '.success-message';
    const errorSelector = '.error-message';

    try {
      // Esperamos el selector de éxito o error
      await page.waitForSelector(successSelector, { visible: true, timeout: 3000 });
      const successMessage = await page.evaluate((selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent : null;
      }, successSelector);

      if (successMessage && successMessage.includes('Juego registrado con éxito')) {
        console.log('✅ Prueba pasada: El juego fue registrado correctamente.');
      } else {
        console.error('❌ Prueba fallida: No se encontró el mensaje de éxito esperado.');
      }
    } catch (error) {
      console.error('❌ No se encontró el mensaje de éxito. Verificando error...');

      // Si no se encontró éxito, revisar el mensaje de error
      try {
        await page.waitForSelector(errorSelector, { visible: true, timeout: 3000 });
        const errorMessage = await page.evaluate((selector) => {
          const el = document.querySelector(selector);
          return el ? el.textContent : null;
        }, errorSelector);

        if (errorMessage) {
          console.error('❌ Error al registrar el juego: ', errorMessage);
        }
      } catch (error) {
        console.error('❌ No se encontró mensaje de error tampoco.');
      }
    }

  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    await browser.close();
    console.log('Fin del test.');
  }
};

export default testRegistrarJuego;
