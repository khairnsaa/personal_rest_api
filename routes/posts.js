const express = require('express')
const router = express.Router()
const Post = require('../schemas/postSchema')

const getPost = async (req, res, next) => {
    let post;
    try{
        post = await Post.findById(req.params.id)
        if( post === null) res.status(400).json({message: 'post not found'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
    res.post = post;
    next()
}

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})

router.post('/', async (req, res) => {
    const post = new Post({
        name: req.body.name,
        post: req.body.post
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getPost, async (req, res) => {
    try{
        await res.post.remove()
        res.json({message: 'successful delete post!'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', getPost, async (req, res) => {
    if(req.body.name != null){
        res.post.name = req.body.name
    }
    if(req.body.post != null){
        res.post.post = req.body.post
    }
    try{
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router