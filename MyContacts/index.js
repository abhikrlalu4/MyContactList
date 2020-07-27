const express= require('express');
const path=require('path');
const port=4000;
const app=express();

const db=require('./config/mongoose');
const Contact=require('./models/contact');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views') );
app.use(express.urlencoded());
app.use(express.static('assets'));





//middleware1
// app.use(function(req,res,next){
//     req.myName="Nidhi";
//    //console.log("middleware1 is called");
//    next();
// });
// //middleware2

// app.use(function(req,res,next){
//     console.log('My name from m1',req.myName);
//     //console.log("Middleware2 called");
//     next();
// })
var contactList =[
    {
        name:"Nidhi Goel",
        phone:"1100119901"
    },
    {
        name:"Muskan Kapoor",
        phone:"9877580110"
    },
    {
        name:"Lakshay Goel",
        phone:"985580110"
    }
]
app.get('/',function(req,res){
    // console.log(req);
    // console.log(__dirname);
    //  res.send('<h1>Cool it is working or no?</h1>');
   // console.log('from the get route cotroller',req.myName);
   
   Contact.find({},function(err,contacts){
       if(err)
       {
           console.log("error in fetching contacts from db");
           return;
       }
       return res.render('home',
       {
           title:" Contacts List",
           contact_list: contacts
       });
   });
  
});


app.get('/practice',function(req,res){
    
    return res.render('practice',
    {
        title:"Let us play with ejs"
    });
});


app.post('/create-contact',function(req,res){
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //      name:req.body.name, 
    //      phone:req.body.phone
    // });

  //contList.push(req.body);
  Contact.create({
      name: req.body.name,
      phone:req.body.phone
  }, function(err,newContact){
      if(err)
      {
          console.log("error in creating a contact");
          return;
      }
      console.log("**********",newContact);
      return res.redirect('back');
  });
   
});


app.get('/delete-contact',function(req,res){
    //console.log(req.query);
    let id=req.query.id;
    // let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1)
    // {
    //     contactList.splice(contactIndex,1);
    // }

    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in deleting an object from database");
            return;
        }
    })
    return res.redirect('back');
    
});








app.listen(port,function(err){
    if(err)
    {
        console.log('error in running the server',err);
       
    }
    console.log('Yipeeee My server is working',port);

});