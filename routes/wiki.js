const express = require('express');
const router = express.Router();
const layout = require('../views/layout.js');
const {addPage} = require('../views')
const {Page} = require('../models');
const Sequelize = require('sequelize');

module.exports = router;

router.get('/', function(req, res, next){
  res.redirect('/');
})

router.post('/', async (req, res, next) => {

  const page = new Page ({
    title: req.params.title,
    content: req.params.content
  });

  try {
    await page.save();
    res.redirect('/wiki/${page.slug}');
  } catch (error) { next(error) }
});

router.get('/add', function(req, res, next){
  res.send(addPage());
});
