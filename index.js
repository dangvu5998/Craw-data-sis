var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
function getDataById(start, end) {
  
  let index = start;
  function getData(index) {
    driver.findElement(By.id('MainContent_tbStudentID_I'))
    .then(async function(el) {
      await el.sendKeys(index);
      await el.sendKeys(webdriver.Key.ENTER);
      var data = {};
      
      await driver.wait(until.elementLocated(By.id('MainContent_gvStudents_DXDataRow0')), 1000)
      .then(() => {
        var field = [];
        field[0] = 'idStudent';
        field[1] = 'surName';
        field[2] = 'midName';
        field[3] = 'name';
        field[4] = 'birth';
        field[5] = 'class';
        field[6] = 'eduProgram';
        driver.findElements(By.css('#MainContent_gvStudents_DXDataRow0 td'))
        .then(function(eles) {
          eles.forEach((ele, i) =>{ 
            ele.getText()
            .then(text => data[field[i]] = text)

          });

        })
      })
      .catch(err => console.log(`Not exist ${index} id`));
      console.log(data);

    })
  }
  driver.get('http://sis.hust.edu.vn/ModuleSearch/GroupList.aspx')
  .then(function() {

    
    getData(20162049);
  })
}

getDataById(20162900, 20163000);