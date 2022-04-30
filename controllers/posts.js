const Posts = require('../model/posts');
const successHandle = require('../service/successHandle')
const errorHandle = require('../service/errorHandle')

async function getPosts (req, res) {
  const allPost = await Posts.find();
  successHandle(res, allPost);
}

async function createPost (req, res) {
  try {
    const data = req.body;
    if (data.content) {
      const newPost = await Posts.create({
        name: data.name,
        content: data.content,
        tags: data.tags,
        type: data.type,
        image: data.image
      })
      successHandle(res, newPost);
    } else {
      errorHandle(res);
    }
  } catch(err) {
    errorHandle(res, err);
  }
}

async function deleteAllPosts(req, res) {
  await Posts.deleteMany({});
  successHandle(res, []);
}

async function deletePost(req, res) {
  const id = req.params.id;
  try {
    if (id) {
      const deletedPost = await Posts.findByIdAndDelete(id);
      if (deletedPost) {
        successHandle(res, deletedPost)
      } else {
        errorHandle(res);
      }
    } else {
      errorHandle(res);
    }
  } catch (err) {
    errorHandle(res, err);
  }
}

async function editPost(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    if (data.content) {
      const editedPost = await Posts.findByIdAndUpdate(id, {
        name: data.name,
        content: data.content,
        tags: data.tags,
        type: data.type,
        image: data.image
      },{
        new: true,
        runValidators: true
      })
      if (editedPost) {
        successHandle(res, editedPost)
      } else {
        errorHandle(res);
      }
    } else {
      errorHandle(res);
    }
  } catch (err) {
    errorHandle(res, err);
  }
}

module.exports = {
  getPosts, 
  createPost,
  deleteAllPosts,
  deletePost,
  editPost,
}