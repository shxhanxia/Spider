import fs from 'fs'
import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';

// 爬取的目标网站
const url = 'http://www.srvf.cn';

// 发出HTTP请求，并处理响应
const response = await axios.get(url, {
    responseType: 'arraybuffer',
});
console.log(response.data)
const contentType = response.headers['content-type'];
const charsetMatch = contentType.match(/charset=([\w-]+)/i);
const charset = charsetMatch ? charsetMatch[1] : 'utf-8';
const html = iconv.decode(Buffer.from(response.data), charset);
const $ = cheerio.load(html);

// 使用$对象来解析HTML，比如：
const title = $('title').text();
console.log(title);

// 将结果保存到文件中
const fileName = 'result.txt';
const content = `Title: ${title}\nURL: ${url}`;
fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    console.log(`Result saved to ${fileName}`);
});