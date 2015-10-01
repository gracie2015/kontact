'use strict'

var webdriver = require('/Users/nathan/Workspace/Selenium/node_modules/selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox'}).build();
//var By = webdriver.By;

function waitSeconds(){
  
}
 


function clickLink(link){
  link.click();
  console.log("sign up button clicked");
}

function handleFailure(err){
  console.error('Something went wrong\n', err.stack, '\n');
  closeBrowser();
}

function closeBrowser(){
  browser.close();
}
var num = Math.floor(Math.random()*9);

browser.get('http://127.0.0.1:4000/#/register');
browser.switchTo().alert().accept();



browser.findElement(webdriver.By.id('firstName')).sendKeys('firstName_'+num);
browser.findElement(webdriver.By.id('lastName')).sendKeys('lastName_'+num);

browser.findElement(webdriver.By.id('username')).sendKeys('user_'+num);
browser.findElement(webdriver.By.id('password')).sendKeys('123');

console.log(num);

browser.findElement(webdriver.By.id('register')).then(clickLink);
browser.wait(waitSeconds, 5000);

//browser.wait(findTutsPlusLink, 2000).then(clickLink).then(logTitle).then(closeBrowser, handleFailure);
