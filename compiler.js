var fs = require('fs');
var path = require('path');

function readJsonFromFile(node, parent) {
  var json = {};
  var treeData = {};
  var currentDir = (parent ? parent + '/' : '') + node;
  var data = fs.readFileSync(currentDir + '/node.json', 'utf8');
  treeData = JSON.parse(data);
  json = treeData;
  var innerDirs = fs.readdirSync(currentDir)
    .map(name => path.join(currentDir, name))
    .filter(content => fs.lstatSync(content).isDirectory());
  var children = innerDirs; //treeData.children;
  if (children && children.length) {
      json.children = [];
      children.forEach(function(child) {
          var childJson = readJsonFromFile(child, null); // readJsonFromFile(child, currentDir);
          json.children.push(childJson);
      });
  }
  return json;
}

var json = readJsonFromFile("roadmap", null);
console.log('JSON compiled!');
fs.writeFile('roadmap.json', JSON.stringify(json), function(err) {
  if (err) {
      console.log(err);
  } else {
      console.log("JSON written to file!");
  }
});