const fetch = require("node-fetch");
const fs = require("fs");
const cheerio = require("cheerio");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log("\033[2J");
readline.question(`\r\nEnter YouTube Video URL :  `, yt_url => {
  async function getcount() {
    let res = await fetch(yt_url);
    let body = await res.text();
    let bodystr = body.toString();
    bodystr = bodystr.replace(/<script >/g, "<script>");
    const $ = cheerio.load(bodystr);
    console.log($("div.watch-view-count").html());
    let viewcount = $("div.watch-view-count")
      .html()
      .toString();
    viewcount = viewcount.replace(/\D/g, "");
    viewcount = viewcount + "," + new Date() + " @@" + "\r\n";
    return viewcount;
  }
  readline.close();
  setInterval(() => {
    getcount()
      .then(data => {
        fs.appendFileSync("log.txt", data);
      })
      .catch(err => console.error(err));
  }, 100);
});
