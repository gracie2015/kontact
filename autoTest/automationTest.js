'use strict'

var webdriver = require('/Users/nathan/Workspace/Selenium/node_modules/selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'safari'}).build();

function waitSeconds(){
  
}

function logTitle(){
  browser.getTitle().then(function(title){
    console.log('Current Page Title: ' + title);
    console.log('click add button!');
  });
}

function clickLink(link){
  link.click();
  console.log("button clicked");
}

function handleFailure(err){
  console.error('Something went wrong\n', err.stack, '\n');
  closeBrowser();
}

function closeBrowser(){
  browser.close();
}
var num = Math.floor(Math.random()*9);

var location = ['redmond, WA', 'kirkland, WA', 'bellevue, WA', 'renton, WA', 'sammamish, WA'];
var email_sufix = ['@hotmail.com', '@live.com', '@outlook.com', '@163.com', '@gmail.com'];

var random_location = location[Math.floor(Math.random()*location.length)];
var random_email = email_sufix[Math.floor(Math.random()*email_sufix.length)];

browser.get('http://127.0.0.1:3000/#/list');
browser.findElement(webdriver.By.name('adduser')).then(clickLink);
//browser.wait(waitSeconds, 2000);
browser.findElement(webdriver.By.id('firstName')).sendKeys('user_'+num);
browser.findElement(webdriver.By.id('lastName')).sendKeys('user_'+num);

browser.findElement(webdriver.By.id('gender')).sendKeys('M');
browser.findElement(webdriver.By.id('cell')).sendKeys('123');
browser.findElement(webdriver.By.id('email')).sendKeys('user_'+ num + random_email);
browser.findElement(webdriver.By.id('location')).sendKeys(random_location);
console.log(num);

browser.findElement(webdriver.By.name('add')).then(clickLink);
browser.wait(waitSeconds, 2000);

//browser.wait(findTutsPlusLink, 2000).then(clickLink).then(logTitle).then(closeBrowser, handleFailure);