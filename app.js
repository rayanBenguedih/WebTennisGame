const express = require('express');

const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.json());

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.post('/saveData', (req, res) => {
    const data = req.body;

    player1Name = req.body.player1Name;
    player1Level = req.body.player1Level;
    player2Name = req.body.player2Name;
    player2Level = req.body.player2Level;

    res.json({ message: 'Data received' });
});



app.post("/sendResults", (req, res) => {
    
    results = req.body.resultsReturned;


    let playerAScore = 0;
    let playerBScore = 0;

    let setsAList = [];
    let setsBList = [];
    
    
    let winnerA = 0;
    let winnerB = 0;

    for (let i = 0; i < results.length; i++) {

        if (results[i] == player1Name)
            playerAScore += 1;
        else 
            playerBScore += 1;
        


        if (((playerAScore == 6 || playerBScore == 6) && Math.abs(playerAScore - playerBScore) >= 2)
              || (playerAScore == 7 || playerBScore == 7)) {
            
            setsAList.push(playerAScore);
            setsBList.push(playerBScore);

            if (playerAScore > playerBScore)
                winnerA += 1;
            else
                winnerB += 1;
            
            playerAScore = 0;
            playerBScore = 0;
            
        }


        if (setsAList.length == 3)
            break;
    }

    let winnerName = winnerA > winnerB ? player1Name : player2Name;

    a = {

        "player1Set": setsAList,
        "player2Set": setsBList,
        "currentGame": winnerA > winnerB ? ["AV", "-"] : ["-", "AV"],
        "matchState": winnerA == 3 || winnerB == 3 ? `Le gagnant est ${winnerName}` : "Jeu en cours, pas de vainqueur",

    };

    res.send(JSON.stringify(a));
});



app.get('/results', (req, res) => {
    res.sendFile(__dirname + '/results.html');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});