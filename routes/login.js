const express = require('express');
var router = express.Router();
var User = require("../modules/userAuthentication");

router.get('/',(req,res,next)=>{
	res.render("login",{ error: 'Hello guys' });
})

router.post('/',(req,res,next)=>{
	if(req.body.username&&req.body.password){
		User.authenticate(req.body.username,req.body.password,(err,user)=>{
			if(err||!user){
				 res.render('login',{ error: 'Muốn hack trang tao hay gì' });
			}else{
				req.session.userId = user._id;
				return res.redirect('./admin');
			}
		});
	}
})

router.get('/admin',(req,res,next)=>{
	User.findById(req.session.userId)
		.exec((err,user)=>{
			if(err){
				return next(err);
			}else{
				if(!user){
					res.render('login',{ error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
				}else{
					return res.render("dashboard");
				}
			}
		})
})

router.get('/logout',(req,res,next)=>{
	if(req.session){
		req.session.destroy((err)=>{
			if(err){
				return next(err);
			}else{
				return res.redirect('/login');
			}
		});
	}
});

module.exports = router;