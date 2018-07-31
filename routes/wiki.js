const express = require('express');
const router = express.Router();
const layout = require('../views/layout.js');
const {addPage} = require('../views');
const {Page} = require('../models');
const {User} = require('../models');
const wikipage = require('../views/wikipage.js');
const main = require('../views/main.js');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();

      console.log("i am pages", pages);
      res.send(main(pages));
  } catch (error) { next(error) }

})

router.post('/', async (req, res, next) => {
  console.log('req body', req.body);
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name:req.body.author,
        email:req.body.email
      }
    });
    const page = await Page.create(req.body);
    page.setAuthor(user);
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }

});

router.get('/add', function(req, res, next){
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikipage(page));
  } catch(error) { next(error) }
});
