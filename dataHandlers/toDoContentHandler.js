const fs = require('fs');
const ContentParser = require('./parseContent');
const GetHtmlFormat = require('./htmlConverter');
contentParser=new ContentParser();
htmlConverter=new GetHtmlFormat();

const TodoContentHandler=function() {
  this.purpose='handlesTodoData';
}

TodoContentHandler.prototype = {

  storeData:function(userFile,title,body,todoList) {
    let userTodoList = JSON.parse(fs.readFileSync(userFile,'utf8'));
    let todoContent = contentParser.parseContent(title,body,todoList);
    userTodoList.push(todoContent);
    fs.writeFileSync(userFile, JSON.stringify(userTodoList));
    return userTodoList;
  },

  handleData:function(userName,title,body,todoList) {
    let userFile = './data/'+userName+'.json';
    if(fs.existsSync(userFile)) {
      return this.storeData(userFile,title,body,todoList);
    } else {
      fs.writeFileSync('./data/'+userName+'.json',JSON.stringify([]));
      return this.handleData(userName,title,body,todoList);
    }
  },

  getPrevioustodoItem:function(filePath){
    if(fs.existsSync(filePath)) {
      let fileContent=JSON.parse(fs.readFileSync(filePath,'utf8'));
      let lastTodoItem = JSON.parse(fileContent[fileContent.length-1]);
      return htmlConverter.getHtmlFormat(lastTodoItem);
    }
    return '';
  }

}

module.exports = TodoContentHandler;