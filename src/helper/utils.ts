function formatNumber(x = '', comma = ',') {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, comma);
}

function formatDate(date, comma = '/') {
  date = new Date(date);
  let day = date.getDate();
  if (day < 10) day = '0' + day;
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  if (comma === '-') return date.getFullYear() + '-' + month + '-' + day;
  return day + '/' + month + '/' + date.getFullYear();
}

function formatDateTime(date) {
  const format = t => {
    return t < 10 ? '0' + t : t;
  };
  date = new Date(date);
  let day = date.getDate();
  day = format(day);
  let month = date.getMonth() + 1;
  month = format(month);
  let hour = date.getHours();
  hour = format(hour);
  let mins = date.getMinutes();
  mins = format(mins);
  return `${hour}:${mins} ${day}/${month}/${date.getFullYear()}`;
}

function formatTimeSecond(second) {
  console.log('second', second);
  const m = Math.floor(second / 60),
    s = second % 60;
  let result = '';
  if (m > 0) result += m + ' phút ';
  return result + s + ' giây';
}

function validEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validPhone(phone) {
  const regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regex.test(String(phone).toLowerCase());
}

function getURLLink(link) {
  if (link.startsWith('http') || link.startsWith('https')) return link;
  return 'https://' + link;
}

function momentToDate(moment, format = 'YYYY-MM-DD') {
  return moment.format(format);
}

function onlyNumber(text) {
  return text.replace(/\D/g, '');
}

function createMarkup(html) {
  return { __html: unescapeHTML(html) };
}

function unescapeHTML(escapedHTML = '') {
  return escapedHTML
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function removeHTMLTags(text = '') {
  if (!text) return '';
  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, '');
}

function convertISOString(date) {
  const newDate = new Date(date);
  const tzoffset = newDate.getTimezoneOffset() * 60000; //offset in milliseconds
  return new Date(newDate.valueOf() - tzoffset).toISOString();
}

function validPassword(password = '') {
  return password.length >= 8;
}

function addArrayItemByIndex(arr, index, item) {
  arr.splice(index, 0, item);
  return arr;
}

function getOrgFromRouter() {
  return window.location.pathname.split('/')[1] ?? '';
}

function abbreviateNumber(number) {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  let tier = (Math.log10(number) / 3) | 0;
  if (tier === 0) return number;
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);
  let scaled = number / scale;
  return scaled.toFixed(1) + suffix;
}

function checkYoutubeLink(link) {
  return /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/.test(
    link,
  );
}

function getCookie(name = 'access_token') {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function isProduction() {
  return window.location.host.includes('eclazz');
}

function arrayEquals(a, b, isSort = true) {
  if (isSort) {
    a = a.sort();
    b = b.sort();
  }
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function scrollToElementID(id) {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop,
    });
  }
}

function getEquation(string, mobile = false) {
  //string = `!!![equation](<math xmlns="http://www.w3.org/1998/Math/MathML"><mfenced open="{" close=""><mrow><mtable columnalign="left"><mtr><mtd><mi>c</mi><mo>=</mo><mn>0</mn></mtd></mtr><mtr><mtd><mn>100</mn><mi>a</mi><mo>+</mo><mn>10</mn><mi>b</mi><mo>=</mo><mn>50</mn></mtd></mtr><mtr><mtd><mo>-</mo><mfrac><mi>b</mi><mrow><mn>2</mn><mi>a</mi></mrow></mfrac><mo>=</mo><mn>10</mn></mtd></mtr></mtable><mo>&#x21D4;</mo><mfenced open="{" close=""><mrow><mtable columnalign="left"><mtr><mtd><mi>c</mi><mo>=</mo><mn>0</mn></mtd></mtr><mtr><mtd><mn>10</mn><mi>a</mi><mo>+</mo><mi>b</mi><mo>=</mo><mn>5</mn></mtd></mtr><mtr><mtd><mn>20</mn><mi>a</mi><mo>+</mo><mi>b</mi><mo>=</mo><mn>0</mn></mtd></mtr></mtable><mo>&#x21D4;</mo><mfenced open="{" close=""><mtable columnalign="left"><mtr><mtd><mi>c</mi><mo>=</mo><mn>0</mn></mtd></mtr><mtr><mtd><mi>a</mi><mo>=</mo><mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mtd></mtr><mtr><mtd><mi>b</mi><mo>=</mo><mn>10</mn></mtd></mtr></mtable></mfenced></mrow></mfenced></mrow></mfenced></math>)!!!`
  return (
    unescapeHTML(string)
      .replaceAll(/>\n</g, `><mo linebreak="newline"></mo><`)
      .replaceAll(/\n/g, '<br />')
      .replaceAll(/!!!\[equation\]\((.*?)\)!!!/g, '$1')
      .replaceAll(
        /!!!\[image\]\((.*?)\)!!!/g,
        "<img src='$1' style='margin: auto' alt='image'/>",
      )
      .replaceAll(
        /!!!\[audio\]\((.*?)\)!!!/g,
        `<audio src='$1' style='width: ${
          mobile ? `100%` : `60%`
        }; margin-top: 1rem; margin: auto' controls='controls' ></audio>`,
      )
      .replaceAll(
        /!!!\[video\]\((.*?)\)!!!/g,
        `<video src='$1' style='width: ${
          mobile ? `100%` : `60%`
        }; margin-top: 1rem; margin: auto' controls='controls' ></video>`,
      )
      //.replaceAll(/\<math xmlns="http:\/\/www.w3.org\/1998\/Math\/MathML"/g, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"')
      //.replaceAll(/<mo>\.<\/mo><mo>&#xA0;<\/mo>/g, `<mo>.</mo><mo>&#xA0;</mo><mspace linebreak='goodbreak' />`)
      //.replaceAll(`<mspace linebreak`, `</math><math xmlns="http://www.w3.org/1998/Math/MathML"><mspace linebreak`)
      //.replaceAll(/<mfenced open="(.*?)" close="(.*?)">(.*?)<\/mfenced>(.*?)/g, `<mrow><mo>$1</mo>$3<mo>$2</mo></mrow>$4`)
      // .replaceAll(/<mfenced open="(.*?)" close="(.*?)"><(.*>)>(.*>)<><>/g)
      .replaceAll(/<span style="(.*?)>((.|\n)*?)<\/span>/g, '$2') // remove style css
      .replaceAll(/!!!\[sub\]\((.*?)\)!!!/g, `<sub>$1</sub>`)
      .replaceAll(/!!!\[sup\]\((.*?)\)!!!/g, `<sup>$1</sup>`)
  );
}

function objectToParams(object) {
  const keys = Object.keys(object);
  let link = '?';
  for (let key of keys) {
    if (object[key]) link += `${key}=${object[key]}&`;
  }
  if (link === '?') return '';
  return link.substr(0, link.length - 1);
}

function getDateFromNow(num) {
  let date = new Date();
  date.setDate(new Date().getDate() + num);
  return date;
}
function getDateFromDate(num, range) {
  let date = new Date(num);
  date.setDate(date.getDate() + range);
  return date;
}
function isJsonWebToken(token) {
  let jwt = token.split('.');
  if (jwt?.length === 3) return true;
  return false;
}

function contentHasMathML(str = '') {
  if (!str) return false;
  return str.indexOf('<math xmlns') >= 0;
}
export {
  formatNumber,
  formatDateTime,
  formatTimeSecond,
  formatDate,
  validEmail,
  validPhone,
  getURLLink,
  momentToDate,
  onlyNumber,
  createMarkup,
  removeHTMLTags,
  unescapeHTML,
  convertISOString,
  validPassword,
  addArrayItemByIndex,
  getOrgFromRouter,
  abbreviateNumber,
  checkYoutubeLink,
  getCookie,
  isProduction,
  arrayEquals,
  scrollToElementID,
  getEquation,
  objectToParams,
  getDateFromNow,
  getDateFromDate,
  isJsonWebToken,
  contentHasMathML,
};
