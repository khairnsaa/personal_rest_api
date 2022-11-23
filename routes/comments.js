const express = require('express')
const router = express.Router()
const Post = require('../schemas/postSchema')

const getComent = async (req, res, next) => {
    let comment;
    try{
        comment = await Post.findOne({"comments._id": req.params.id})
        if( comment === null) res.status(400).json({message: 'comment not found'})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
    res.comment = comment;
    next()
}

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id)
    try{
        if(!post) res.status(404).json({message: 'Error 404! Post Not Found'})
        res.status(200).json(post.comments)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, {
        $addToSet: {
            comments: [
                {
                    name: req.body.name,
                    comment: req.body.comment
                },
            ],
        },
    })
    try{
        if(!post) res.status(404).json({message: 'Error 404! Post not found'})
        res.status(201).json({message: 'new comment successfully created'})
    } catch (err) {
        res.status(409).json({error: err.message});
    }
})

// router.delete('/:id', getComent, async (req, res) => {
//     const id = req.params.id
//     try{
//         res.comment.comments = res.comment.comments.filter((el) => el._id != id)
//         // const newComment = await res.comment.save()
//         console.log(res.comment)
//         // res.json(newComment)
//     } catch (err) {
//         res.json({error: err.message})
//     }
// })

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const selectedPost = await Post.findOne({ "comments._id": id })
    if( selectedPost === null) res.status(400).json({message: 'post not found'})
    try{
        let comment = selectedPost.comments.id(id);
        
        const newComment = selectedPost.comments.filter(el => el._id !== comment._id)
        selectedPost.comments = newComment
        selectedPost.save();
        res.status(201).json({message: "Comment deleted successfuly."});
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const selectedPost = await Post.findOne({ "comments._id": id })
    if( selectedPost === null) res.status(400).json({message: 'post not found'})
    try{
        let comment = selectedPost.comments.id(id);
        
        comment.name = req.body.name
        comment.comment = req.body.comment
    
        selectedPost.save();
        res.status(201).json({message: "Comment updated successfuly."});
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
})

module.exports = router