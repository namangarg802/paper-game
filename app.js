const express=require("express");
const bodyParser=require("body-parser");
const ejs=require('ejs');
const app = express();
const dotenv= require('dotenv');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
const { MongoClient } = require("mongodb");
const mongoose=require('mongoose');
const CircularJSON = require('circular-json');
dotenv.config();

  mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true });

const resultSchema=new mongoose.Schema({
  player1:String,
  player2:String,
  player3:String,
  player4:String,
  player12:Number,
  player21:Number,
  player13:Number,
  player31:Number,
  player14:Number,
  player41:Number,
  player23:Number,
  player32:Number,
  player24:Number,
  player42:Number,
  player34:Number,
  player43:Number
})
const Result=new mongoose.model("Result",resultSchema);

var i=0;
var name={};

app.get("/",(req,res)=>{
  res.render("home");
})
app.get("/outcome",function(req,res)
{

  i=i+1;
  var randomNumber1=Math.floor(Math.random()*3)+1;
  var randomNumber2=Math.floor(Math.random()*3)+1;
  var randomNumber3=Math.floor(Math.random()*3)+1;
  var randomNumber4=Math.floor(Math.random()*3)+1;
  var img1,img2,img3,img4,p12=0,p21=0,p13=0,p31=0,p14=0,p41=0,p23=0,p32=0,p24=0,p42=0,p34=0,p43=0;
  if(randomNumber1===1)
  img1="Stone";
  else if(randomNumber1===2)
  img1="Paper";
  else
  img1="Sicissor";

  if(randomNumber2===1)
  img2="Stone";
  else if(randomNumber2===2)
  img2="Paper";
  else
  img2="Sicissor";

  if(randomNumber3===1)
  img3="Stone";
  else if(randomNumber3===2)
  img3="Paper";
  else
  img3="Sicissor";

  if(randomNumber4===1)
  img4="Stone";
  else if(randomNumber4===2)
  img4="Paper";
  else
  img4="Sicissor";

  if(randomNumber1===1)
  {
    if(randomNumber2===2)
        p21=1;
    else if(randomNumber2===3)
         p12++;
    if(randomNumber3===2)
             p31++;
    else if(randomNumber3===3)
              p13++;
    if(randomNumber4===2)
                  p41++;
    else if(randomNumber4===3)
                   p14++;

  }
  else  if(randomNumber1===2)
  {
    if(randomNumber2===1)
        p12++;
    else if(randomNumber2===3)
         p21++;
    if(randomNumber3===1)
             p13++;
    else if(randomNumber3===3)
              p31++;
    if(randomNumber4===1)
                  p14++;
    else if(randomNumber4===3)
                   p41++;
  }
  else  if(randomNumber1===3)
  {
    if(randomNumber2===1)
        p21++;
    else if(randomNumber2===2)
         p12++;
    if(randomNumber3===1)
             p31++;
    else if(randomNumber3===2)
              p13++;
    if(randomNumber4===1)
                  p41++;
    else if(randomNumber4===2)
                   p14++;

  }
   if(randomNumber2===1)
    {
      if(randomNumber3===2)
          p31++;
      else if(randomNumber3===3)
           p23++;
      if(randomNumber4===2)
               p42++;
      else if(randomNumber4===3)
                p24++;
    }
    else  if(randomNumber2===2)
    {

      if(randomNumber3===1)
               p23++;
      else if(randomNumber3===3)
                p23++;
      if(randomNumber4===1)
                    p24++;
      else if(randomNumber4===3)
                     p24++;
    }
    else  if(randomNumber2===3)
    {
      if(randomNumber3===1)
               p32++;
      else if(randomNumber3===2)
                p23++;
      if(randomNumber4===1)
                    p42++;
      else if(randomNumber4===2)
                     p24++;
    }
     if(randomNumber3===1)
      {
        if(randomNumber4===2)
                 p43++;
        else if(randomNumber4===3)
                  p34++;
      }
      else if(randomNumber3===2)
       {
         if(randomNumber4===1)
                  p34++;
         else if(randomNumber4===3)
                   p43++;

       }
       else if(randomNumber3===3)
        {
          if(randomNumber4===1)
                   p34++;
          else if(randomNumber4===2)
                    p43++;
        }
  console.log(img1,img2,img3,img4);
   const result=new Result({

   player1:img1,
   player2:img2,
   player3:img3,
   player4:img4,
    player12:p12,
    player21:p21,
    player13:p13,
    player31:p31,
    player14:p14,
    player41:p41,
    player23:p23,
    player32:p32,
    player24:p24,
    player42:p42,
    player34:p34,
    player43:p43
  });


  result.save(err=>{
    if(err){
        console.log(err);

      }
      else{
        console.log("success result");

      }
  })
  console.log(result);

  console.log( randomNumber1, randomNumber2, randomNumber3,randomNumber4);
  res.render("outcome",{img1:randomNumber1,img2:randomNumber2,img3:randomNumber3,img4:randomNumber4});
});
app.post("/outcome",(req,res)=>{

  var iteration=Result.find({},(err,resul)=>{
    if(err)
      console.log(err);
    if(!err)
    {
      if(resul)
      {

        const str = CircularJSON.stringify(resul);
        const data=JSON.parse(str);
          name=data;
          console.log(data.length);
          res.render("table",{result:data,length:data.length})
      }
    }
  });


});





app.listen(3000,function()
{
  console.log("server started successfully");
})
