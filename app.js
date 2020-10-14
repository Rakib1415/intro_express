const express = require('express');
const morgan = require('morgan');

const app = express();

// app.use(morgan('dev'));

function customMiddleware (req, res, next){

    if(req.url === '/help'){
        res.send('<h1>Sorry, i am blocked by admin</h1>');
    }
    console.log('I am logged', req.url);
    next();
}

function tinyLogger(){
    return (req, res, next) =>{
        console.log(`${req.method}- ${req.url}`);
        next();

    }
}
const middleWare = [customMiddleware, tinyLogger()];
app.use(middleWare);

app.get('/about', morgan('dev'), (req, res)=>{
    // res.send('<h1>I am a About page</h1>');
    res.json({
        message : 'I am a json object from about handler'
    });

});

app.get('/help', (req, res)=>{
    res.send('<h1>I am a Help page</h1>')
});

app.get('/',(req, res)=>{
    res.send('<h1>I am listening</h1>');
});

app.get('*', (req, res) => {
    res.send('<h2>404 Not Found</h2>');
});
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`The server is running to port ${PORT}`);
}); 