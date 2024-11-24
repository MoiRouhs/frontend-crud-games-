import puppeteer from "puppeteer";

const testRegistrarJuego = async () => {
  console.log("Tester: Juan Peña");
  console.log("Nombre del test: Registrar juego");
  console.log("Iniciando......");

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  try {
    const width = 1280;
    const height = 720;
    await page.setViewport({ width, height });

    await page.goto("http://localhost:5173", { waitUntil: "networkidle2" });
    console.log("Página cargada.");

    // Espera a que el campo 'Código' esté disponible
    await page.waitForSelector('input[placeholder="Código"]', {
      visible: true,
      timeout: 60000,
    });

    console.log("Completando formulario...");
    // Completa los campos
    await page.type('input[placeholder="Código"]', "1123456");
    await page.type('input[placeholder="Nombre"]', "Super Mario Bros");
    await page.type('input[placeholder="Descripción"]', "Un clásico de plataformas");
    await page.type('input[placeholder="Consola"]', "Nintendo");
    await page.type('input[placeholder="Año de lanzamiento"]', "1985");
    await page.type('input[placeholder="Número de jugadores"]', "2");
    await page.type('input[placeholder="URL de la imagen"]', "https://example.com/mario.png");

    // Esperar a que el botón de enviar sea visible
    await page.waitForSelector('button[type="submit"]', {
      visible: true,
      timeout: 5000,
    });

    console.log("Enviando formulario...");
    const button = await page.$('button[type="submit"]');

    // Verificar si el botón contiene el texto esperado
    const buttonText = await page.evaluate((btn) => btn.textContent.trim(), button);

    if (buttonText === "Agregar Juego") {
      await button.click();
    } else {
      console.error(`❌ El texto del botón no es 'Agregar Juego'. Texto encontrado: ${buttonText}`);
    }

    // Verificar mensaje de éxito
    console.log("Verificando resultado...");
    const successMessage = await page.evaluate(() => {
      const el = document.querySelector(".success-message");
      return el ? el.textContent : null;
    });

    if (successMessage && successMessage.includes("Juego registrado con éxito")) {
      console.log("✅ Prueba pasada: El juego fue registrado correctamente.");
    } else {
      console.error(
        "❌ Prueba fallida: No se encontró el mensaje de éxito esperado."
      );
    }
  } catch (error) {
    console.error("❌ Error durante la prueba:", error);
  } finally {
    await browser.close();
    console.log("Fin del test");
  }
};

testRegistrarJuego();
