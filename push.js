const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BLBK1NVUYXhyJpO2aMux8gkPEkmbmQ3fXz9Xo_3GSssU_orDhLeYaFtLssO_LnrRU_czIjEE2UgFTQhanCT9hRQ',
  privateKey: '9JYLs8G5QtFmh9BTN8jDNwXFeENoERE9wTz3c4IyNV0',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

//jangan lupa ya setiap buka web di device baru endpoint dan key nya berubah jadi harus diganti diganti terus
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/cGcOMso7Fbk:APA91bFSE_I-Ag8IX2RHcDDiQ8fdLt29UoEWofOZEhLAsNtAj5tmZHNC00D6bX6USP8GXksqdYLe9578sDck9we57ZDAnJED1Xso3pFr_YnfcRE_ROI-rboP-Dvk2tyHBJmYuphZI77C',
  keys: {
    p256dh: 'BHL1vzJEGGZQ52w1Y1IHuqqIFlokXtqwYgRTTgEm89nk259QVpWbJWgRvPlAhgUuwxGO+qqUE/ycAxt0xSVloT0=',
    auth: 'WOAeNwIhWfFgdg1ND3rfSA==',
  },
};
const payload = 'pesan dari push notification';
const options = {
  gcmAPIKey: '580211239650',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
