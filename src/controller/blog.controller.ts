import { prisma } from '../config/db';
import { Request, Response } from 'express';

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany();
    if (blogs) {
      res.json(blogs);
    } else {
      res.status(404).json('Sorry blogs not found');
    }
  } catch (error) {
    res.json(error);
  }
};

export const createBlog = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  const title: string = req.body.title;

  try {
    if (title === undefined || user_id === undefined) {
      res.json('Please write title and user_id');
    } else {
      const blog = await prisma.blog.create({
        data: {
          title: title,
          user_id: user_id,
        },
      });
      if (blog) {
        res.json(blog);
      } else {
        res.json('Sorry something went wrong , please try again');
      }
    }
  } catch (error) {
    res.json(error);
  }
};

export const getUserBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id === undefined){
        res.json('Please write the id');

    }else {

        const blogs = await prisma.blog.findMany({
          where: {
            user_id: id,
          },
        });
        if (blogs) {
          res.json(blogs);
        } else {
          res.json('Sorry this user doesnt have blogs');
        }
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const title = req.body.title;

  try {
    if (id === undefined || title === undefined){
      res.json('Please write title and user_id');
    } else {
        const blog = await prisma.blog.update({
          where: {
            id: id,
          },
          data: {
            title: title,
          },
        });
        if (blog) {
          res.json(blog);
        } else {
          res.json('Sorry something went wrong , please try again');
        }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllBlogs = async (req: Request, res: Response) => {
  const user_id  = req.params.user_id;

  try {
    if (user_id === undefined) {
      res.json('Please write user_id');
    } else {
      const blog = await prisma.blog.deleteMany({
        where: {
          user_id: user_id,
        },
      });
      if (blog) {
        res.json('blogs deleted successfully');
      } else {
        res.json('Sorry something went wrong , please try again');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
    const {id}  = req.params;
    
    try {
      if (id === undefined) {
        res.json('Please write id');
      } else {
        const blog = await prisma.blog.delete({
          where: {
            id:id,
          },
        });
        if (blog) {
          res.json('blog deleted successfully');
        } else {
          res.json('Sorry something went wrong , please try again');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };