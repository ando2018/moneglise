const express = require("express");
const multer = require("multer");
const http = require("http");
const host = "localhost";
const excelToJson = require("convert-excel-to-json");
const bodyParser = require("body-parser")
const { v4: uuidv4 } = require("uuid");
const app = express(); 
const port = process.env.PORT || 10000;
var fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fileName = "moneglisedata";

var storage = multer.diskStorage(
  {
      destination: "./uploadsTmp/",
      limits: {
        fileSize: 5000000 // 5mb
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg|xlsx)$/)) {
            return callback(new Error("Please upload a Picture(PNG or JPEG)"))
        }
        callback(undefined, true);
      },
      filename: function ( req, file, cb ) {
          cb( null, file.originalname );
      }
  }
);


var upload = multer( { storage: storage } );

const copyFile = function(file,file2){
    fs.stat(file2, function (err, stats) {
      if (err) {
        fs.copyFile(file, file2, (err) => {
          if (err) {
              console.log("Error Found: copyFile", err);
          }else{
            fs.rmSync(file, {
              force: true,
          });
        }
      });
      }else{
        fs.unlink(file2,function(err){
          if(err) return console.log(err);
          fs.copyFile(file, file2, (err) => {
            if (err) {
                console.log("Error Found: copyFile", err);
            }else{
              fs.rmSync(file, {
                force: true,
            });
          }
        });
      });  
      }
    });
}
// ------------------------------------------------------------------------------------------------
app.post("/api/checkPwd",(req,res)=>{
        try {
          if (req.body.id =="kiraro" && req.body.pwd =="asix") {
            res.status(200).json({res : Buffer.from("OK."+Date.now().toString()).toString("base64") });
          }else{
            res.status(200).json({res : Buffer.from("KO."+Date.now().toString()).toString("base64")});
          }
        } catch (err) {
          res.status(500).json(err)
        }
})
// ------------------------------------------------------------------------------------------------
app.post("/api/uploadxlsx",upload.single("file"),(req,res)=>{
  var file = __dirname + "/uploadsTmp/" + req.file.filename;
  var file2 = __dirname + "/" + fileName +".xlsx" ;
  console.log(req.file)
        try {
            copyFile(file,file2);
            res.status(200).json([]);
        } catch (err) {
          console.error(err);
        }
})
// ------------------------------------------------------------------------------------------------
app.post("/api/uploadimg",upload.single("file"),(req,res)=>{
  var file = __dirname + "/uploadsTmp/" + req.file.filename;
  var file2 = __dirname + "/uploads/" +  req.body.folder + "/" + req.file.filename ;
  if(req.file?.filename == null || req.file?.filename == "undefined" ) {
        res.status(400).json("No File uploadimg");
      }
      else{
        try {
          if (!fs.existsSync(__dirname + "/uploads/" +  req.body.folder)) {
            fs.mkdirSync(__dirname + "/uploads/" +  req.body.folder);
            copyFile(file,file2);
            var imgLists = fs.readdirSync(__dirname + "/uploads/" +  req.body.folder)
              imgLists = imgLists.map(res=> ( "../../uploads/" +  req.body.folder + "/" +res))
              imgLists.push(("../../uploads/" +  req.body.folder + "/"+req.file.filename))
            res.status(200).json(imgLists);
          }else{
            copyFile(file,file2);
            var imgLists = fs.readdirSync(__dirname + "/uploads/" +  req.body.folder)
            imgLists.push(("../../uploads/" +  req.body.folder + "/"+req.file.filename))
            res.status(200).json(imgLists);
          }
        } catch (err) {
          console.error(err);
        }
      }
})
// ------------------------------------------------------------------------------------------------
app.post("/api/uploadNews",upload.single("file"),(req,res)=>{
  var folder = "ARTICLES" ;
  var file = __dirname + "/uploadsTmp/" + req.file.filename;
  var file2 = __dirname + "/uploads/" +folder  + "/" +req.body.id +"_"+ req.file.filename ;
  if(req.file?.filename == null || req.file?.filename == "undefined" ) {
        res.status(400).json("No File");
      }
      else{
        let fileRename = __dirname + "/uploadsTmp/" +req.body.id +"_"+ req.file.filename;
        fs.rename(file, fileRename, err => {
          if (err) {
            console.error("error rename =>" + err);
          }
          try {
            if (!fs.existsSync(__dirname + "/uploads/" +  folder)) {
              fs.mkdirSync(__dirname + "/uploads/" +  folder);
              copyFile(fileRename,file2);
              let imgLists = fs.readdirSync(__dirname + "/uploads/" +  folder)
              imgLists = imgLists.map(res=> ( "../../uploads/" +  folder + "/" +res))
              imgLists.push(("../../uploads/" +  folder + "/"+ +req.body.id +"_"+ req.file.filename))
              res.status(200).json(imgLists);
            }else{
              copyFile(fileRename,file2);
              let imgLists = fs.readdirSync(__dirname + "/uploads/" +  folder)
              imgLists = imgLists.map(res=> ( "../../uploads/" +  folder + "/" +res))
              imgLists.push(("../../uploads/" +  folder + "/"+ +req.body.id +"_"+ req.file.filename))
              res.status(200).json(imgLists);
            }
          } catch (err) {
            console.error(err);
          }
        });
      }
})
// ------------------------------------------------------------------------------------------------
app.get("/api/readAlls",(req,res)=>{
  try{
    const resultDatareadAlls = excelToJson({
      sourceFile: fileName + ".xlsx",
      header:{
        rows: 1
    },
    columnToKey: {
      "*" : "{{columnHeader}}",
    }
    });
    res.status(200).json(resultDatareadAlls);
    }catch(err){
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
app.get("/api/readArticles",(req,res)=>{
  try{
    const resultDatareadArticles = excelToJson({
      sourceFile: fileName + ".xlsx",
      header:{
        rows: 1
    },
    columnToKey: {
      "*" : "{{columnHeader}}",
    }
    });

    const folderName = "./uploads/ARTICLES/";
    if (fs.existsSync(folderName)) {
      imgByFolder = fs.readdirSync(folderName); 
      resultDatareadArticles.articles.forEach(el=>{
        if(el.id){
          el.img = imgByFolder.filter(f=>f.split("_")[0] == el.id )[0] ? folderName + imgByFolder.filter(f=>f.split("_")[0] == el.id )[0] : "";
        }
      })
      console.log(resultDatareadArticles.articles)
    }else{
      res.send("pas d images dans rep=>" + folder);
    }
    
    res.status(200).json(resultDatareadArticles.articles);
    }catch(err){
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
app.get("/api/readPhotosSampana",(req,res)=>{
  try{
    const folderName = "SAMPANA";
    if (!fs.existsSync(__dirname + "/uploads/" +  folderName)) {
       fs.mkdirSync(__dirname + "/uploads/" +  folderName);
       imgByFolder = fs.readdirSync(__dirname + "/uploads/" +  folderName); 
    }else{
      imgByFolder = fs.readdirSync(__dirname + "/uploads/" +  folderName); 
    }
    imgByFolder = imgByFolder.map(res=> ( "../../uploads/" +  folderName) + "/" +res)
    res.status(200).json(imgByFolder);
    }catch(err){
      res.status(500);
    }
})// ------------------------------------------------------------------------------------------------
app.get("/api/readPhotosBirao",(req,res)=>{
  try{
    const folderName = "BIRAO";
    if (!fs.existsSync(__dirname + "/uploads/" +  folderName)) {
       fs.mkdirSync(__dirname + "/uploads/" +  folderName);
       imgByFolder = fs.readdirSync(__dirname + "/uploads/" +  folderName); 
    }else{
      imgByFolder = fs.readdirSync(__dirname + "/uploads/" +  folderName); 
    }
    imgByFolder = imgByFolder.map(res=> ( "../../uploads/" +  folderName) + "/" +res)
    res.status(200).json(imgByFolder);
    }catch(err){
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
app.get("/api/readPhotos",(req,res)=>{
  try{
    const resultDatareadPhotos = excelToJson({
      sourceFile: fileName +".xlsx",
      header:{
        rows: 1
    },
    columnToKey: {
      "*" : "{{columnHeader}}",
    }
    });
    var listCateg = resultDatareadPhotos.photos.map(res=>({cat : res.category, type : res.type,order: res.order})).filter(f=>f.type == "photo").map(re=>(re.cat)).filter(onlyUnique);
    listCateg.forEach(el=>{
      var folderName = "./uploads/" + el;
        resultDatareadPhotos.photos.forEach(res=>{
          if (fs.existsSync(folderName) ) {
            if(res.type == "photo" && el == res.category){
              var imgByFolder = fs.readdirSync(folderName).map(el=>folderName+"/"+el); 
            res.img = imgByFolder;
            }
          }else{
            if(res.type == "photo" && el == res.category){
              res.img =[];
            }
          }
        })
    })
    res.status(200).json(resultDatareadPhotos.photos);
    }catch(err){
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
app.get("/api/readEvenements",(req,res)=>{
  try{
    const resultDatareadEvenements = excelToJson({
      sourceFile: fileName +".xlsx",
      header:{
        rows: 1
    },
    columnToKey: {
      "*" : "{{columnHeader}}",
    }
    });
    res.status(200).json(resultDatareadEvenements.evenements);
    }catch(err){
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
app.get("/api/readProfil",(req,res)=>{
  try{
    const resultDatareadProfil = excelToJson({
      sourceFile: fileName + ".xlsx",
      header:{
        rows: 1
    },
    columnToKey: {
      "*" : "{{columnHeader}}",
    }
    }); 
    resultDatareadProfil.profil.forEach(e=>{
      e.coupleNomImg = { 'nom': e.nom, 'img': e.img,'profil': e.profil }; 
    })
    res.status(200).json(resultDatareadProfil.profil);
    }catch(err){
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
app.get("/api/readInfos",(req,res)=>{
  try{
    const resultDatareadInfos = excelToJson({
      sourceFile: fileName +".xlsx",
      header:{
        rows: 1
    },
    columnToKey: {
      "*" : "{{columnHeader}}",
    }
    });
    res.status(200).json(resultDatareadInfos.infos);
    }catch(err){
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
app.post("/api/readPhotoUploaded",(req,res)=>{
  try{
    var folder =req.query.folder  ? req.query.folder   : "";
    var imgByFolder = [];
    const folderName = "../../uploads/"+folder;
    if (fs.existsSync(folderName)) {
      imgByFolder = fs.readdirSync(folderName); 
    }else{
      res.send("pas d images dans rep=>" + folder);
    }
    res.status(200).json(imgByFolder);
    }catch(err){
      console.log(err)
      res.status(500);
    }
})
// ------------------------------------------------------------------------------------------------
app.post("/api/contact", (req, res) => {
  try{
    console.log(req)
    const { name, message, email,phone} = req.body;
    var results  = {
      name_ : name,
      message_: message,
      email_ : email,
      phone_ : phone
    }
    res.status(200).json(results);
    }catch(err){
      console.log(err)
      res.status(500);
    }
});
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + "/"));

app.get("*", (req, res) => {
 res.sendFile(__dirname + "/index.html")
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

