import puppeteer from "puppeteer";

const testEditarJuego = async () => {
  console.log('Tester: Carlos Rocha');
  console.log('Nombre del test: Editar Registro de un juego');
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

  // Crear una copia de los datos modificados
  const dataTesting = {
    ...dataCapturate,
    'Nombre': `${ dataCapturate['Nombre']} + TEST`,
    'Descripción': `${ dataCapturate['Descripción']} + TEST`,
    'Consola': `${ dataCapturate['Consola']} + TEST`,
    'Año de Lanzamiento': `${ parseInt(dataCapturate['Año de Lanzamiento']) + 1 }`,
    'Número de Jugadores': `${ parseInt(dataCapturate['Número de Jugadores']) + 1}`,
  }

  // Clic en el boton editar
  await page.click('button')

  //Cambiarndo los valores del formulario de editar
  await page.$eval('input[name="name"]', el => el.value = ''); // Limpia el campo
  await page.type('input[name="name"]', dataTesting['Nombre']) // Llena el campo
  await page.$eval('input[name="description"]', el => el.value = '');
  await page.type('input[name="description"]', dataTesting['Descripción'])
  await page.$eval('input[name="console"]', el => el.value = '');
  await page.type('input[name="console"]', dataTesting['Consola'])
  await page.$eval('input[name="release_year"]', el => el.value = '');
  await page.type('input[name="release_year"]', dataTesting['Año de Lanzamiento'])
  await page.$eval('input[name="number_of_players"]', el => el.value = '');
  await page.type('input[name="number_of_players"]', dataTesting['Número de Jugadores'])

  // Clic sobre el boton para actualizar información
  await page.click('button[type="submit"]')

  // Al volver a la página del juego Vuelve a capturar los datos
  const dataValidation = await page.evaluate(() => {
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
  console.log('Datos de validación:', dataTesting);
  console.log('Datos nueva captura:', dataValidation);

  let codigo = true;
  if(dataCapturate['Código'] === dataValidation['Código']){
    console.log('El código es igual: ok')
  }else{
    console.log('El código es diferente')
    codigo = false;
  }

  let nombre = true;
  if(dataCapturate['Nombre'] !== dataValidation['Nombre']){
    console.log('El nombre es diferente: ok')
  }else{
    console.log('El nombre es igual.')
    nombre = false;
  }

  let descripcion = true;
  if(dataCapturate['Descripción'] !== dataValidation['Descripción']){
    console.log('La descripción es diferente: OK')
  }else{
    console.log('La descripción es igual')
    description = false;
  }

  let consola = true;
  if(dataCapturate['Consola'] !== dataValidation['Consola']){
    console.log('La consola es diferente: ok')
  }else{
    console.log('La console es igual')
    consola = false;
  }

  let agno = true;
  if(dataCapturate['Año de Lanzamiento'] !== dataValidation['Año de Lanzamiento']){
    console.log('El año de lanzamiendo es diferente: OK')
  }else{
    console.log('El año de lanzamiendo es igual')
    agno = false;
  }

  let jugadores = true;
  if(dataCapturate['Número de Jugadores'] !== dataValidation['Número de Jugadores']){
    console.log('El número de jugadores es diferente: OK')
  }else{
    console.log('El número de jugadores es igual')
    jugadores = false;
  }

  if(codigo && nombre && descripcion && consola && agno && jugadores){
    console.log('Test  de edición de juego aprobado')
    console.log('Fin del test');
    return true;
  }else{
    console.log('Test de edición de juego reprobado')
    console.log('Fin del test');
    return false;
  }
  //const randomElementHTML = await page.evaluate(el => el.outerHTML, datos);
  //console.log('p', randomElementHTML )

};

export default testEditarJuego;
