# Games_eCommerce
<h1> SHOPPING CART </h1>.


<h3>MODALIDAD DE TRABAJO</h3>

El proyecto será abordado en dos etapas.

Etapa 1: Desarrollar la estructura del Backend
Etapa 2: Desarrollar  la estructura del Frontend

<h3>TECNOLOGIA DE DESARROLLO</h3>
Formato:
Se desarrollará una aplicación del tipo API REST, con formato de intercambio JSON ( javascript object Notation).
Backend:
Para el desarrollo del Backend se utilizará el framework Express con Node.js 

Persistencia:
Para la persistencia de datos se utilizará la base de datos no relacional MongoDB, utilizando la versión Atlas para no descargar el motor de base de datos localmente.

La elección de este motor se basa en la exploración y conocimiento de funcionamiento y características. Modelo ODM

Seguridad:

Las contraseñas se almacenarán cifradas.
Además se asegurarán algunos endpoints utilizando el componente jsonwebtoken (JWT) 
para autenticación del cliente,implementado mediante el uso de un middleware.


Frontend
Para el desarrollo del Frontend de utilizará la librería de Aplicación REACT + Node.js
La decisión de uso se basa en la exploración y conocimiento de la herramienta.

Manejo de respositorio:
Se deberá manejar el repositorio del proyecto utilizando la herramienta GitHub.
Para ello se deberá vincular el proyecto y adicionar al docente como colaborador del mismo,
con la finalidad de evaluación y consulta.

Entorno de programacón:

Para la programación se utilizará la herramienta grautita Visual Studio Code (Windows).


<h3>ESTRUCTURA DEL PROYECTO</h3>
Backend
Se utilizará el patrón Modelo Vista Controlador

Modelos:
 
 user
 
 games
 
 order
 
 cart
 
 library
 
 Controladores:
 
 UserController
 
 GameController
 
 OrderController
 
 CartController
 
 LibController
 
 
 Endpoints:
 
 Para cada uno de los modelos se generarán los endpoints que permitirán la realización del CRUD
 
 GET, POST, PUT, DELETE
 
 Testing:
 
 Para realizar el testing de endpoints se utilizará el componente chai o mocha.
 
 Para listar cualquiera de los modelos, se deberán utilizar valores de limit y offset, para devolver objetos muy extensos.
 
 
 

<h3>CONSIDERACIONES FUNCIONALES</h3>

El sistema perimitira el CRUD de clientes, productos y ordenes

Las ordenes de compra, se confirman cuando se ingresa en el frontend el domicilio de entrega del pedido.

Se deberá poder listar productos, clientes, ordenes.

Al momento de realizar una venta el sistema deberá verificar las existencias del producto y actualizar su stock.


<h3>TESTING </h3>

A  fin de realizar las pruebas de funcionamiento se utilizará la herramienta POSTMAN.

TDD ( Test Driven Development)

Para realizar el testing unitario del código se utilizará el componente MOCHA o CHAI
