const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 2000;
var app = express();



hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var nowDate = new Date().toDateString();
    var nowTime = new Date().getHours().toString() + ":"+ new Date().getMinutes().toString()+":"+ new Date().getSeconds().toString();
    if(fs.existsSync('log.txt')){
        fs.appendFileSync('log.txt', "\n"+nowDate + "--"+ nowTime+" || " + req.url);
    }else{
        fs.writeFileSync('log.txt', "\n"+nowDate + "--"+ nowTime+" || " + req.url);
    }
    
    next();
    
});

//app.use((req, res, next)=>{
//    res.render('megnets.hbs');
////    next();
//})
app.use(express.static(__dirname+"/public"));

hbs.registerHelper('getYear', () => {
   return new Date().getFullYear()
});

hbs.registerHelper('capsMe', (toCap, pe) => {
    toCap = hbs.Utils.escapeExpression(toCap);
    return new hbs.SafeString(toCap.toUpperCase() + pe.toLowerCase());

})

app.get('/', (req, res) => {
   res.render('home.hbs',{
       welcomeMessage: 'happy to see you visiting my page',
       pageTitle: 'Home Page'
   });
});

app.get('/bad', (req, res) =>{
    res.json({
        errorMessage: 'Bad Gateway'
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/contact', (req, res) =>{
    res.render('contact.hbs',{
        pageTitle: 'Contact Page',
        pmessage: 'Here is my phone number:',
        number: '09398795465'
    });
});

app.listen(port, () => {
    console.log(`Express started on port ${port}`);
});