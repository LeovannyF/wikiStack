const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js')
const { db, Page, User } = require('./models');
// const models = require('./models');
const layout = require('./views/layout.js');

app.get('/', function(req, res, next){
  res.send(layout(''));
});

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname +'/public'));

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const port = process.env.PORT || 3000;

const init = async() => {
  // await models.User.sync()
  // await models.Page.sync()
  await db.sync({force:true})
  app.listen(port, ()=> {
    console.log(`I am listening on port ${port}`);
  });
}
init();


module.exports = app;
