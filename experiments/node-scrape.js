const axios = require('axios');
const cheerio = require('cheerio');

// const url = 'https://www.wired.com/story/an-engineer-gets-9-years-for-stealing-dollar10m-from-microsoft/';

const url = "https://earther.gizmodo.com/the-u-s-should-stop-blaming-other-countries-for-plasti-1845532389";
axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    console.log($.text());
  })
  .catch(console.error);
