var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var info = [{name : 'Nazma Yasmeen',idea : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "},
  {name : "Ritu Mishra",idea : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "},
  {name : "Simran Mittal",idea : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "}]

  length = info.length;
  res.render('index', {l:length , Info : info, title: 'MYT-Ideas' , myturl : 'https://is2-ssl.mzstatic.com/image/thumb/Purple118/v4/d4/fe/cc/d4fecc10-12fe-7cea-7d53-8db73380f5e8/AppIcon_-1x_U007emarketing-85-220-0-9.png/246x0w.jpg'});
});

module.exports = router;
