const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require("fs");
const yt_url = `your youtube url here`
setInterval(getcount, 10000);
function getcount() {
  fetch(yt_url)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body.toString());
      let bodystr = body.toString();
      bodystr = bodystr.replace(/<script >/g, "<script>");
      console.log($("div.watch-view-count").html());
      let viewcount = $("div.watch-view-count").html().toString();
      viewcount = viewcount.replace(/\D/g, "");
      viewcount = viewcount + "," + new Date() + "\r\n";
      fs.appendFileSync('log.txt', viewcount);
    });
}
