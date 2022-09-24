const express = require("express");
const { get } = require("firebase/database");
const app = express();
const getRanking = require('./database/database')

// Ao fazer este comando, a aplicação aceitará arquivor estáticos (nome_da_pasta)
app.use(express.static('public'));
// Dizendo ao express usar o EJS com View engine
app.set("view engine","ejs")
// Permite que leia dados em formulário enviado via JSON
//app.use(bodyParser.json())
//Configurando a porta que o aplicativo vai rodar
app.listen(3000, ()=>{
    console.log("App rodando!")
});

app.get("/", async (req, res)=>{

    const tables = await getRanking()
    tables.sort((playerA, playerB)=>{
        if (playerA.score < playerB.score) {
            return 1
        }
        if (playerA.score === playerB.score) {
            return 0
        }
        if (playerA.score > playerB.score) {
            return -1
        }
    })
    res.render("index",{tables})
});

