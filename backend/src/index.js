const express= require('express'); //importando funcionalidades do express para essa variavel ctrl + c fecha o servidor
const routes= require('./routes');//importando o arquivo routes lembrar do./ pois é arquivo
const cors= require('cors');

const app= express();

app.use(cors());//sem nenhum parametro qualquer aplicação pode acessar o backend    
app.use(express.json());//transforma o json em algo entendivel
app.use(routes);//usando as rotas


app.listen(3333);//ouvindo a porta 3333  
