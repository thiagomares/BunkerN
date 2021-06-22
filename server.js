/*
Este código irá realizar uma cópia de dados que são pertinentes aos objetivos do Bunker N

Em uma explicação mais suscinta, este código irá coletar os dados que estão acessíveis no lado do cliente, tais como nome da empresa
e endereço e vão replicar em uma página gerada pelo próprio código gerado abaixo.
*/

// As constantes abaixo farão a importação das bibliotecas expressjs que servirá como servidor interno do código e o puppeteer como 
// uma espécie de navegador.
const express = require("express");
const puppeteer = require("puppeteer");

const server = express(); // Aqui o servidor está sendo inicializado

// Esta function irá fazer todo o trabalho de cópia dos dados
server.get('/', async (request, Response) => {
    /*
    Nas três proximas linhas, estou requisitando que o puppeteer inicialize, 
    abra uma nova pagina, e acesse a pagina de interesse
    */
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.secovimg.com.br/associados.php");
    
    // Esta função irá buscar no código HTML os seguintes dados atrelados aos marcadores e classes
    const pagecontent = await page.evaluate(() => {
        return {
            nome: document.querySelector('.nome_associado h4').innerHTML,
            endereco: document.querySelector('li p').innerHTML,
        };
    });

    await browser.close();
    
    // E por fim este método irá retornar em formato HTML os valores obtidos
    Response.send({
        Nome: pagecontent.nome,
        Endereço: pagecontent.endereco
    }) 
});


const port = 3000;

// Esta função irá realizar a abertura do servidor para acesso.
server.listen(port, () => {
    console.log(`Servidor carregado, acesse http://localhost:${port}`);
});
