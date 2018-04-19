const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
})

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to print server log');
        }
    })

    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
 })

app.get('/', (req, res) => {
    // res.send('<h1>Welcome</h1>'); res.send({     name: 'Danny',     likes:
    // ['cricket', 'Tennis', 'hockey'] })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        name: 'Danny',
        currentYear: new Date().getFullYear(),
        likes: ['cricket', 'Tennis', 'hockey']
    })
})

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
})

app.get('/bad', (req, res) => {
    res.send({errorMessage: 'Unable to handle request'})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});