import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let s = readFileSync(file, 'utf8');

const fixes = [
  [/Faizan Idrishi \u2014/g, 'Faizan Idrishi |'],
  [/Moh Faizan Y\. Idrishi \u2014/g, 'Moh Faizan Y. Idrishi,'],
  [/I'm Moh Faizan Y\. Idrishi \u2014 a/g, "I'm Moh Faizan Y. Idrishi, a"],
  [/don't just build themes \u2014 I/g, "don't just build themes. I"],
  [/D2C brands \u2014 from/g, 'D2C brands. From'],
  [/Social Media Manager \u2014 CoinsCapture/g, 'Social Media Manager at CoinsCapture'],
  [/sites \u2014 from architecture/g, 'sites, from architecture'],
  [/platform \u2014 28/g, 'platform. 28'],
  [/message \u2014 available/g, 'message. Available'],
  [/enquiry \u2014 Faizan/g, 'enquiry from Faizan'],
  [/Message sent \u2014 I/g, 'Message sent. I'],
  [/Bags \u2014 backpacks/g, 'Bags, backpacks'],
  [/\+' \u2014 Faizan/g, "+' | Faizan"],
  [/\/\* ([A-Z &]+) \u2014 ([^*]+) \*\//g, '/* $1 | $2 */'],
  [/\u2014 Web3Forms/g, ' Web3Forms'],
];

for (const [pattern, replacement] of fixes) {
  s = s.replace(pattern, replacement);
}
s = s.replace(/ \u2014 /g, '. ');

writeFileSync(file, s);
const remaining = (s.match(/\u2014/g) || []).length;
console.log(`Done. Em dashes remaining: ${remaining}`);
