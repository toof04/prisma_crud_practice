import prisma from "../DB/db.config.js";


export const fetchComments = async (req, res) => {
    const comments = await prisma.comment.findMany();
    return res.status(200).json({ comments });
}


export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    await prisma.post.update({
        where: {
            id: parseInt(post_id)
        },
        data: {
            comment_count: {
                increment: 1
            }
        }
    })


    const newComment = await prisma.comment.create({
        data: {
            user_id : user_id,
            post_id : post_id,
            comment : comment
        }
    })

    return res.status(201).json({ message: "Comment created successfully", comment: newComment });
};
        
    

export const showComment = async (req, res) => {
    const CommentId = req.params.id;
    const comment = await prisma.comment.findFirst({
        where: {
            id: parseInt(CommentId)
        }
    });
    return res.status(200).json({ comment });
};

export const updateComment = async (req, res) => {
    const {user_id, post_id, comment} = req.body;
    const CommentId = req.params.id
    await prisma.comment.update({
        where : {
            id : parseInt(CommentId)
        },
        data : {
            user_id : user_id,
            post_id : post_id,
            comment : comment
        }
    })
    return res.status(200).json({message : "Comment updated successfully"})
}

export const deleteComment = async (req, res) => {
    const CommentId = req.params.id;
    await prisma.post.update({
        where: {
            id: parseInt(post_id)
        },
        data: {
            comment_count: {
                increment: 1
            }
        }
    })
    await prisma.comment.delete({
        where: {
            id: parseInt(CommentId)
        }
    });
    return res.status(200).json({ message: "Comment deleted successfully" });
};