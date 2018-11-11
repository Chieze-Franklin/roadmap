var fs = require('fs');
var path = require('path');

function readJsonFromFile(node) {
  var json = {};
  var treeData = {};
  var data = fs.readFileSync(node + '/node.json', 'utf8');
  treeData = JSON.parse(data);
  json = treeData;
  var innerDirs = fs.readdirSync(node)
    .map(name => path.join(node, name))
    .filter(content => fs.lstatSync(content).isDirectory());
  var children = innerDirs;
  if (children && children.length) {
      json.children = [];
      children.forEach(function(child) {
          var childJson = readJsonFromFile(child);
          json.children.push(childJson);
      });
  }
  return json;
}

var json = readJsonFromFile("roadmap");
console.log('JSON compiled!');
fs.writeFile('roadmap.json', JSON.stringify(json), function(err) {
  if (err) {
      console.log(err);
  } else {
      console.log("JSON written to file!");
  }
});