const express = require('express');
const hbs = require('hbs');
let app = express();
const fs = require('fs');
const port = (process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) =>{
        if (e)
        {
            console.log(e);
        }
    })
    next();
})
// app.use((req, res, next) => {
//     res.render('maintanance.hbs', {
//         pageTitle: 'Home page',
//         welcomeMessage: 'welcome to the website'
//         });
// });
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'welcome to the website'
        });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About page',
        
        });
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects page',
        
        });
});
app. get('/bad', (req, res) => {
    res.send({
        error: 'error'
    });
});

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});
