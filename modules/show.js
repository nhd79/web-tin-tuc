var news = require("../modules/News.models");
var show = (n) => {
    var kq = '';
    for (let i = n.length - 1; i >= 0; i--) {
        kq += "<div class=\"child_static_table\">";
        kq += "<div class=\"title_static_table\">";
        kq += n[i].news_title;
        kq += "</div>";
        kq = kq + ("<button><a href=\"/login/admin/edit/" + n[i]._id + "\" data_method=\"post\">Chỉnh sửa</a></button>");
        kq = kq + ("<button><a href=\"/login/admin/edit/delete/" + n[i]._id + "\">Xóa</a></button>");
        kq += "</div>";
    }
    return kq;
}

module.exports = show;