const express = require('express');
const postsRouter = express.Router();
const Posts = require('../model/posts');

postsRouter.get('/', async (req, res) => {
  const allPost = await Posts.find();
  res.status(200).json({
    "status": "success",
    "data": allPost
  });
})

postsRouter.post('/', async (req, res) => {
  try {
    const data = JSON.parse(req,body);
    if (data.content) {
      const newPost = await Posts.create({
        name: data.name,
        content: data.content,
        tags: data.tags,
        type: data.type,
        image: data.image
      })
      res.status(200).json({
        "status": "success",
        "data": newPost
      });
    } else {
      res.status(400).json({
        "status": "false",
        "message": "Wrong data type, or id not found!"
      });
    }
  } catch(err) {
    res.status(400).json({
      "status": "false",
      "message": err.message
    })
  }
})

postsRouter.delete('/', async (req, res) => {
  await Posts.deleteMany({});
  res.status(200).json({
    "status": "success",
    "data": []
  })
})

postsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
    if (id) {
      await Posts.findByIdAndDelete(id);
      res.status(200).json({
        "status": "success",
        "data": id
      })
    } else {
      res.status(400).json({
        "status": "false",
        "message": "Wrong data type, or id not found!"
      });
    }
})

postsRouter.patch('/:id', async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const id = req.params.id;
    if (data.content) {
      const editedPost = await Posts.findByIdAndUpdate(id, {
        name: data.name,
        content: data.content,
        tags: data.tags,
        type: data.type,
        image: data.image
      })
      res.status(200).json({
        "status": "success",
        "data": editedPost
      })
    } else {
      res.status(400).json({
        "status": "false",
        "message": "Wrong data type, or id not found!"
      });
    }
  } catch (err) {
    res.status(400).json({
      "status": "false",
      "message": err.message
    })
  }
})

module.exports = postsRouter;
