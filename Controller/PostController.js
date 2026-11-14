import prisma from "../DB/db.config.js";


export const fetchPosts = async (req, res) => {
    const posts = await prisma.post.findMany();
    return res.status(200).json({ posts });
}


export const createPost = async (req, res) => {
    const { user_id, title, description } = req.body;

       
    const newPost = await prisma.post.create({
        data: {
            user_id : user_id,
            title : title,
            description : description
        }
    })

    return res.status(201).json({ message: "Post created successfully", post: newPost });
};

export const showPost = async (req, res) => {
    const PostId = req.params.id;
    const post = await prisma.post.findFirst({
        where: {
            id: parseInt(PostId)
        }
    });
    return res.status(200).json({ post });
};

export const updatePost = async (req, res) => {
    const {user_id, title, description} = req.body;
    const PostId = req.params.id
    await prisma.post.update({
        where : {
            id : parseInt(PostId)
        },
        data : {
            user_id : user_id,
            title : title,
            description : description
        }
    })
    return res.status(200).json({message : "Post updated successfully"})
}

export const deletePost = async (req, res) => {
    const PostId = req.params.id;
    await prisma.post.delete({
        where: {
            id: parseInt(PostId)
        }
    });
    return res.status(200).json({ message: "Post deleted successfully" });
};

export const searchPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (page < 1 || limit < 1) {
        return res.status(400).json({ message: "Page and limit must be positive integers" });
    }
    if (!req.query.q) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
    }
    const skip = (page - 1) * limit;
    const { query } = req.query.q;
    const posts = await prisma.post.findMany({
        where: {
          decscription: {
            contains: query,
            mode: 'insensitive',
          },
        }
    });
    const totalPosts = await prisma.post.count({
        where: {
          decscription: {
            contains: query,
            mode: 'insensitive',
          },
        }
    });
    return res.status(200).json({ posts, totalPosts, currentPage: page, totalPages: Math.ceil(totalPosts / limit) });
};
