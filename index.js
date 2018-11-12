const express = require('express')
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const $ = require('cheerio')
const url = 'https://www.instagram.com/roolee/'

const app = express()

app.use(bodyParser.json())

app.listen(3045, ()=>{
    console.log('listening on port 3045')
})


//Gets Instagram Images On Server Load

var instaPhotos = []

function getFromInsta(){
    puppeteer.launch()
    .then(function(browser){
        return browser.newPage();
    })
    .then(function(page){
        return page.goto(url).then(function(){
            return page.content()
        })
        .then(function(html){
            let tempArr = []
            $('img', html).each(function(){
    
                let test = $(this).attr('src')

                    tempArr.push(test)
                instaPhotos = tempArr
            })
            })
    })
}
getFromInsta()


//Updates Insta Photos every half hour

setInterval(getFromInsta,600000)



app.get('/api/insta', (req,res)=>{
    console.log('hit')
    res.status(200).send(instaPhotos)
        })


app.get('/api/hey', (req,res)=>{
    res.status(200).send('hello there!')
})