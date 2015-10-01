'use strict'
var User = require('../routes/userData');
var users = [];

User.find({}, function(err, users){
  if(err) throw err;
  console.log("users found!");
  
  
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
  
    browser.get('http://127.0.0.1:4000/#/login');
    browser.switchTo().alert().accept();
    browser.findElement(webdriver.By.id('username')).sendKeys(users[0].username);
    browser.findElement(webdriver.By.id('password')).sendKeys(users[0].password);
    browser.findElement(webdriver.By.id('login')).then(clickLink);

    browser.switchTo().alert().accept();
    browser.switchTo().alert().accept();
    browser.switchTo().alert().accept();
    browser.wait(waitSeconds, 5000);
  });







//browser.wait(findTutsPlusLink, 2000).then(clickLink).then(logTitle).then(closeBrowser, handleFailure);
