var express = require('express');
var cors = require('cors');
var mutler = require('multer');
/*var fileUpload = mutler({ dest: 'uploads/' });*/
var fileUpload = mutler();/*if no dir specified, it will save to system default temp directory*/
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

/*'upfile' is the name specified in the upload form in HTML file*/
app.post('/api/fileanalyse', fileUpload.single('upfile'), (req, res) => {
  res.json(fileInformation(req.file));
})

/*get information about the file and return json object*/
function fileInformation(file){
  let jsonObject = {
    "name": file.originalname,
    "type": file.mimetype,
    "size": file.size
  };
  return jsonObject;
};

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
