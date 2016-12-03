var router = require('koa-router')();

router.get('/', function *(next) {
  console.log(this.request.query)
  console.log(this.query)

  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

module.exports = router;