import prisma from "../DB/db.config.js";


export const fetchUsers = async (req, res) => {
    const users = await prisma.user.findMany({
      select: {
        _count: {
          select: {
            post: true,
          },
        },
    }})

    return res.status(200).json({ users });
}


export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where : {
            email : email
        }
    })

    if (findUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
        data: {
            name : name,
            email : email,
            password : password
        }
    })

    return res.status(201).json({ message: "User created successfully", user: newUser });
};

export const showUser = async (req, res) => {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: parseInt(userId)
        }
    });
    return res.status(200).json({ user });
};

export const updateUser = async (req, res) => {
    const {name, email, password} = req.body;
    const userId = req.params.id
    await prisma.user.update({
        where : {
            id : parseInt(userId)
        },
        data : {
            name : name,
            email : email,
            password : password
        }
    })
    return res.status(200).json({message : "User updated successfully"})
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await prisma.user.delete({
        where: {
            id: parseInt(userId)
        }
    });
    return res.status(200).json({ message: "User deleted successfully" });
};