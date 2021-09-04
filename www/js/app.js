// NCMBの初期化
const applicationKey = 'YOUR_APPLICATION_KEY';
const clientKey = 'YOUR_CLIENT_KEY';
const ncmb = new NCMB(applicationKey, clientKey);
// Mapboxのアクセストークン
const mapboxAccessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

var $ = Dom7;
var app = new Framework7({
  name: 'My App', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  // App store
  store: store,
  // App routes
  routes: routes,
});

// 位置情報を取得するAPIをコールバックからPromiseにする
const getLocation = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

// フォームをオブジェクト化する関数
const serializeForm = (ele) => {
  const f = new URLSearchParams(new FormData($(ele)[0]));
  const params = {};
  for (const values of f) {
    params[values[0]] = values[1];
  }
  return params;
}

// 2点間の距離を求める（メートルで返す）
// https://qiita.com/kawanet/items/a2e111b17b8eb5ac859a
const R = Math.PI / 180;
const distance = (lat1, lng1, lat2, lng2) => {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return parseInt(6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000);
}
