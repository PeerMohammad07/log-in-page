var express = require("express")
var router = express.Router()


//presaved mail d pass
const credential = {
  email:"Football@gmail.com",
  password:"player123"
}


//login router
router.post('/login', (req, res) => {
  if (req.body.email === credential.email && req.body.password === credential.password) {
      req.session.user = req.body.email; // Store the user's email in the session
      res.redirect('/route/dashboard');
      // res.end("Login success.....")
  } else {
      if(req.body.email != credential.email){
      res.render('base', { message: "Enter a valid mail" });}
      else if(req.body.password != credential.password){
          res.render('base', { message: "Enter a valid password" });
      }

  }
});

//route for dashboard
// router.get('/dashboard',(req,res)=>{
//    if(req.session.user){
//      res.render('dashboard',{user: req.session.user})
//    }
//    else{
//     res.send("Unauthorize User")
//    }
// })


//array of object
// Route for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    let products = [
      {
        src: "/assets/images.jpeg",
        name: "Cristiano Ronaldo",
        club: "Al-nasar",
        goals: 863,
        age: 38,
        country: "Portugal",
      },
      {
        src: "/assets/wq4l6w3ftzn6gequts2v.webp",
        name: "Lionel Messi",
        club: "Inter-miami",
        goals: 800,
        age: 36,
        country: "Argentina",
      },
      {
        src: "/assets/610163282-neymar-of-fc-barcelona-reacts-during-the-la-gettyimages-1477046671-800.avif",
        name: "Neymar Jr.",
        club: "Al-Hilal",
        goals: 400,
        age: 31,
        country: "Brazil",
      },
      {
        src: "/assets/1782489960.0.jpg",
        name: "Kylian Mbappe",
        club: "Psg",
        goals: 287,
        age: 24,
        country: "France",
      },
      {
        src: "/assets/7bd2d-16493517792724-1920.avif",
        name: "Benzema",
        club: "Al-itthad",
        goals: 453,
        age: 34,
        country: "France",
      },
      {
        src: "/assets/download.jpeg",
        name: "Vinicious Jr.",
        club: "Real Madrid",
        goals: 63,
        age: 23,
        country: "Brazil",
      },
    ];

    // Pass the products array to the 'dashboard' view
    res.render('dashboard', { user: req.session.user, products });
  }else{
    res.render('base')
  }
});

// //route for logout
// router.get('/logout',(req,res)=>{
//   req.session.destroy(function(err){
//     if(err){
//       console.log(err);
//       res.send("error")
//     }else{
//       res.render('base',{title:"express",logout:"Logout Successfully...!"})
//     }
//   })
// })


//logout router
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
    
      res.render('base', { title: 'Express', logout: 'Logout Successfully' });
    }
  });

});


//exporting router
module.exports=router;