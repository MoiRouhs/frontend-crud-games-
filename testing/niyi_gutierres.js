import puppeteer from "puppeteer";

const testConsultarJuego = async () => {
  console.log('Tester: Niyi Gutierres');
  console.log('Nombre del test: Consultar juego');
  console.log('Iniciando......');

    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      args: ['--start-maximized']
    });
    const page = await browser.newPage();
    const width = 1280; // Ancho típico de una pantalla grande
    const height = 720; // Alto típico de una pantalla grande
  
    await page.setViewport({ width, height });
    await page.goto("http://localhost:5173");
  
    // Ir a la pagina Todos los juegos 
    await page.click('a[href*="allgames"]'); // buscamos el boton de interes y hacemos click
  
    const juegos = await page.$$('.games-table tbody tr') // Selecionar todas las filas de juegos
    const randomIndex = Math.floor(Math.random() * juegos.length); // Seleccionar el index de un fila
    const juego = juegos[randomIndex]; // Seleccionar la fila de juego
    const botonConsulta =  await juego.$('button:nth-of-type(1)') // Seleccionar el botón consultar
  
    await botonConsulta.click() // cliquear el botón

    //Caputar los datos del juego en forma de array
  const dataCapturate = await page.evaluate(() => {
    const paragraphs = document.querySelectorAll('p');
    const imgSrc = document.querySelector('img').getAttribute('src');
    const jsonData = {};

    paragraphs.forEach(p => {
      const strongElement = p.querySelector('strong');
      if (strongElement) {
        const key = strongElement.textContent.replace(':', '').trim(); // Limpiar el texto del título
        const value = p.textContent.replace(strongElement.textContent, '').trim(); // Extraer el valor
        jsonData[key] = value; // Agregar al objeto JSON
      }
    });
    jsonData['imgSrc'] = imgSrc;
    console.log('jsonData', jsonData)
    return jsonData;
  });

      // Cierro navegador
  await browser.close();
  
  console.log('Datos capturados:', dataCapturate);
  
      //Verifica que los datos consultados sean correctos
  let codigo = true;
  if(dataCapturate['Código']) {
    console.log('El código es correcto');
    } else{
    console.log('El código no es correcto');
    codigo = false;
    }
  
  let nombre = true;
  if (dataCapturate['Nombre']) {
    console.log('El nombre es correcto');
  } else{
    console.log('El nombre no es correcto');
    codigo = false;
    }
  
    let descripcion = true;
    if (dataCapturate['Descripción']) {
      console.log('La descripción es correcta');
    } else{
      console.log('La descripción no es correcta');
      codigo = false;
      }

      let consola = true;
      if (dataCapturate['Consola']) {
        console.log('La consola es correcta');
      } else{
        console.log('La consola no es correcta');
        codigo = false;
        }
      
        let año = true;
        if (dataCapturate['Año de Lanzamiento']) {
          console.log('El año de lanzamiento es correcto');
        } else{
          console.log('El año de lanzamiento no es correcto');
          codigo = false;
          }
        
          let jugadores = true;
          if (dataCapturate['Número de Jugadores']) {
            console.log('El número de jugadores es correcto');
          } else{
            console.log('El número de jugadores no es correcto');
            codigo = false;
            }
      // Verificar si el test fue aprobado o no (En caso de ser aprobado, retorno true; sino, false)
      if (codigo, nombre, descripcion, consola, año, jugadores) {
        console.log('Test de consulta de juego aprobado')
        console.log('Fin del test');
      return true;
    } else {
      console.log('Test de consulta de juego reprobado')
      console.log('Fin del test');
      return false;
      }
  await browser.close();
  
};

export default testConsultarJuego;
