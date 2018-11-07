var fs = require('fs');

function readJsonFromFile(node, parent) {
  var json = {};
  var treeData = {};
  var data = fs.readFileSync((parent ? parent + '/' : '') + node + '/node.json', 'utf8');
  treeData = JSON.parse(data);
  json = treeData;
  var children = treeData.children;
  if (children && children.length) {
      json.children = [];
      children.forEach(function(child) {
          var childJson = readJsonFromFile(child, (parent ? parent + '/' : '') + node);
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