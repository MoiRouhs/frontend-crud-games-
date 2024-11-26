import puppeteer from 'puppeteer';

const testRegistrarJuego = async () => {
  console.log('Tester: Juan Peña');
  console.log('Nombre del test: Registrar juego');
  console.log('Iniciando......');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();

  // Captura de logs del navegador
  page.on('console', (msg) => {
    console.log('Página log:', msg.text());
  });

  // Captura de respuestas de la red para diagnosticar errores 500
  page.on('response', async (response) => {
    if (response.url().includes('/addgame') && response.status() !== 200) {
      console.log('Error al registrar el juego:', response.status(), await response.text());
    }
  });

  try {
    const width = 1280;
    const height = 720;
    await page.setViewport({ width, height });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    console.log('Página cargada.');

    // Hacer clic en el enlace "Crear un juego"
    console.log('Accediendo al formulario de creación...');
    await page.waitForSelector('a.boton[href="/addgame"]', { visible: true });
    await page.click('a.boton[href="/addgame"]');
    console.log('Redirigido al formulario.');

    // Espera a que el campo 'Código' esté disponible
    await page.waitForSelector('input[placeholder="Código"]', {
      visible: true,
      timeout: 60000,
    });

    console.log('Completando formulario...');
    // Completa los campos
    await page.type('input[placeholder="Código"]', '20002');
    await page.type('input[placeholder="Nombre"]', 'HALO-3');
    await page.type(
      'input[placeholder="Descripción"]',
      'Un clásico de plataformas'
    );
    await page.type('input[placeholder="Consola"]', 'xbox');
    await page.type('input[placeholder="Año de lanzamiento"]', '2001');
    await page.type('input[placeholder="Número de jugadores"]', '6');
    await page.type(
      'input[placeholder="URL de la imagen"]',
      'https://example.com/contra.png'
    );

    // Esperar a que el botón de enviar sea visible
    await page.waitForSelector('button[type="submit"]', {
      visible: true,
      timeout: 5000,
    });

    console.log('Enviando formulario...');
    await page.click('button[type="submit"]');

    // Esperar por la posible redirección
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });
    console.log('Página después de la redirección:', page.url());

    // Captura de pantalla para ver el estado de la página
    await page.screenshot({ path: 'debug-screenshot.png' });

    // Esperar por el mensaje de éxito
    console.log('Esperando mensaje de éxito...');
    try {
      await page.waitForSelector('.success-message', {
        visible: true,
        timeout: 20000, // 20 segundos
      });

      // Verificar mensaje de éxito
      console.log('Verificando resultado...');
      const successMessage = await page.evaluate(() => {
        const el = document.querySelector('.success-message');
        return el ? el.textContent : null;
      });

      if (successMessage && successMessage.includes('Juego registrado con éxito')) {
        console.log('✅ Prueba pasada: El juego fue registrado correctamente.');
      } else {
        console.error(
          '❌ Prueba fallida: No se encontró el mensaje de éxito esperado.'
        );
        // Depuración adicional: Obtener el contenido del cuerpo completo
        const pageContent = await page.content();
        console.log('Contenido de la página después de enviar el formulario:');
        console.log(pageContent);
      }
    } catch (error) {
      console.log('No se encontró el mensaje de éxito.');
      console.error(error);
    }
  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    await browser.close();
    console.log('Fin del test');
  }
};

export default testRegistrarJuego;
