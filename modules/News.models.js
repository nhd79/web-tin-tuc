const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let news = new Schema({
    news_title: {
        type: String
    },
    news_content: {
        type: String
    },
    url: {
        type: String
    }
});


news.statics.show = (callback) => {
    //var news = require("./addNews.models");
    News.find({})
        .exec((err, data) => {

            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }

        });
}

var News = mongoose.model('news', news, 'news');

module.exports = News;