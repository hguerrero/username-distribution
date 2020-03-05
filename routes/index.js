var express = require('express');
var router = express.Router();

var accounts = process.env.OPENSHIFT_ACCOUNTS || 50;
var password = process.env.OPENSHIFT_PASSWORD || 'r3dh4t1!';
var taken = [9,10];
var currentAvailable = 0;
var title = "CCN - Dev Track";


/* GET home page. */
router.get('/', function(req, res, next) {

  // does 'user' Cookie exist
  var id = 0;
  console.log('start',id);
  if (req.cookies && req.cookies.ccn_user) {
    console.log('cookies',req.cookies);
    id = req.cookies.ccn_user;
    console.log('cookie',id);
  } else {
    id = getNextUser();
    // set cookie
    res.cookie('ccn_user',id, {maxAge:30000});
    console.log('new',id);
  }

  var data = {
    userId: id,
    password: password,
    title: title
  };
  return res.render('index', data);
});

module.exports = router;

function getNextUser(){
  if(currentAvailable === accounts){
    console.error('No more accounts available');
    return "No More Accounts"
  }

  currentAvailable++;
  console.log('Current Users:',currentAvailable);

  if(taken.indexOf(currentAvailable) >= 0){
    return getNextUser();
  }

  return "user"+currentAvailable;
}