var express = require('express');
var cors = require('cors');
const multer = require("multer");
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const upload = multer({
  storage:multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,"./public");
    },
  filename:(req,file,cb)=>{
    cb(null, file.originalname)
  }
  })
})

app.use("/", (req,res,nex)=>{
  console.log("\n \n")
  console.log(req.originalUrl,req.method)
  nex();
})

app.post("/api/fileanalyse", upload.single("upfile"), (req,res)=>{

  const obj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.send(obj)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
