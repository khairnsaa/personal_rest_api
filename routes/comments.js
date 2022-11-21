const express = require('express')
const router = express.Router()
const Comment = require('../schemas/commentSchema')

const getPost = async (req, res, next) => {
    let comment;
    try{
        comment = await Comment.findById(req.params.id)
        if( comment === null) res.status(400).json({message: 'comment not found'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
    res.comment = comment;
    next()
}

router.get('/', async (req, res) => {
    try{
        const posts = await Comment.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.get('/:id', getPost, (req, res) => {
    res.json(res.comment)
})

router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    })
    try {
        const newComment = await comment.save()
        res.status(201).json(newComment)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getPost, async (req, res) => {
    try{
        await res.comment.remove()
        res.json({message: 'successful delete comment!'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', getPost, async (req, res) => {
    if(req.body.name != null){
        res.comment.name = req.body.name
    }
    if(req.body.comment != null){
        res.comment.comment = req.body.comment
    }
    try{
        const updatedPost = await res.comment.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router