var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

var driver = new webdriver.Builder()
.forBrowser('firefox')
.build();

exports.driver = driver;
exports.getStudentsById = function (start, end) {
  
  let index = start;
  async function getData(index) {
    var data = {};
    return new Promise((resolve, reject) => {
      driver.findElement(By.id('MainContent_tbStudentID_I'))
      .then(async function(el) {
        await el.clear();
        await el.sendKeys(index + '\n');
        await el.sendKeys(webdriver.Key.ENTER);
        await driver.wait(function() {
          return driver.wait(until.elementLocated(By.css('#MainContent_gvStudents_DXDataRow0 td')), 1000)
          .then(function() {
            return driver.findElement(By.css('#MainContent_gvStudents_DXDataRow0 td'))
            .then(ele => ele.getText().then(txt => { return txt == index}))
            .catch(err => 0)
          })
        }, 1000)
        .then(() => {
          var field = [];
          field[0] = 'idStudent';
          field[1] = 'surName';
          field[2] = 'midName';
          field[3] = 'priName';
          field[4] = 'birth';
          field[5] = 'class';
          field[6] = 'eduProgram';
          driver.findElements(By.css('#MainContent_gvStudents_DXDataRow0 td'))
          .then(function(eles) {
            eles.forEach((ele, i) =>{ 
              ele.getText()
              .then(text => {if(field[i]) data[field[i]] = text;})

            });

          })
        })
        .catch(err => reject(`Not exist id ${index}`));
        el.clear();
        resolve(data);

      });
    })
    
  }
  var students = [];
  var invalid = [];
  return driver.get('http://sis.hust.edu.vn/ModuleSearch/GroupList.aspx')
  .then(async function() {
    for(var i = start; i <= end; i++) {
      await getData(i)
      .then(data => students.push(data))
      .catch(err => invalid.push(i));
    }
    // driver.quit();
    return {students: students, invalid: invalid}
  })
}

