const express = require('express');
var router = express.Router();
var User = require("../modules/userAuthentication");
var news = require("../modules/News.models");
const show = require("../modules/show");


router.get('/', (req, res, next) => {
    res.render("login", { error: 'Hello guys' });
})

router.post('/', (req, res, next) => {
    if (req.body.username && req.body.password) {
        User.authenticate(req.body.username, req.body.password, (err, user) => {
            if (err || !user) {
                res.render('login', { error: 'Muốn hack trang tao hay gì' });
            } else {
                req.session.userId = user._id;
                return res.redirect('./admin');
            }
        });
    }
})

router.get('/admin', (req, res, next) => {

    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('login', { error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
                } else {
                    news.find()
                        .exec((err, data) => {
                            if (err) {
                                console.log(err);
                            } else if (data) {
                                console.log(data.length);
                                res.render("dashboard", { listNews: show(data), total: data.length });
                            }
                        })
                }
            }
        })
})



router.get('/admin/edit', (req, res) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('login', { error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
                } else {
                    res.render('edit', { title: "", content: "", url: "" });
                }
            }
        })
})
router.post('/admin/edit', (req, res) => {
    if (req.body.title && req.body.content) {
        news.findOne({ news_title: req.body.title })
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                } else if (!data) {
                    let tin = new news({
                        news_title: req.body.title,
                        news_content: req.body.content,
                        url: req.body.url.split(" ").join("-")
                    });
                    tin.save()
                        .then(tin => console.log("add successfully"))
                } else {
                    data.news_title = req.body.title;
                    data.news_content = req.body.content;
                    data.url = req.body.url.split(" ").join("-");
                    data.save()
                        .then(res => console.log("update thanh cong"));
                }
            })


        res.redirect('/login/admin/');
    } else {
        res.render("edit", { title: "", content: "", url: "" });
    }

})


router.get('/admin/edit/:_id', (req, res) => {

    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('login', { error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
                } else {
                    news.findById(req.params._id, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let news_title = "\"" + data.news_title + "\"";
                            let news_content = "\"" + data.news_content + "\"";
                            let url = "\"" + data.url + "\"";
                            //console.log(news_title);
                            res.render('edit', { title: news_title, content: news_content, url: url });
                        }
                    })
                }
            }
        })


})

router.get('/admin/edit/delete/:_id', (req, res) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('login', { error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
                } else {
                    news.remove({
                        _id: req.params._id
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('../../');
                            //console.log("Deleted");
                        }
                    })
                }
            }
        })
})



router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                res.redirect('../../');
            }
        });
    }
});

module.exports = router;