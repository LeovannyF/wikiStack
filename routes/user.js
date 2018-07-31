const express = require('express');
const router = express.Router();
const {User} = require('../models');
const {Page} = require('../models');
const userList = require('../views/userList.js');
const userPages = require('../views/userPages.js');


router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(userList(user));
  } catch (error) { next(error) }
});

router.get('/:id', async (req, res, next) => {
  // console.log('i am in the id', req.params.id)
  try {
      const allUserPost = await Page.findAll({
        where: {
          authorId: req.params.id
        }
      });
      const user = await User.findOne({
        where:{id: req.params.id}
      })
    // console.log(allUserPost);
    // console.log('I am the USER', user);
    res.send(userPages(user, allUserPost));
  } catch (error) { next(error) }

});

module.exports = router;
