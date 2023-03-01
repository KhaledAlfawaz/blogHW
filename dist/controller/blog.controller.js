"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.deleteAllBlogs = exports.updateBlog = exports.getUserBlog = exports.createBlog = exports.getAllBlogs = void 0;
const db_1 = require("../config/db");
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield db_1.prisma.blog.findMany();
        if (blogs) {
            res.json(blogs);
        }
        else {
            res.status(404).json('Sorry blogs not found');
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAllBlogs = getAllBlogs;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.body.user_id;
    const title = req.body.title;
    console.log(user_id);
    console.log(title);
    try {
        if (title === undefined || user_id === undefined) {
            res.json('Please write title and user_id');
        }
        else {
            const blog = yield db_1.prisma.blog.create({
                data: {
                    title: title,
                    user_id: user_id,
                },
            });
            if (blog) {
                res.json(blog);
            }
            else {
                res.json('Sorry something went wrong , please try again');
            }
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.createBlog = createBlog;
const getUserBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id === undefined) {
            res.json('Please write the id');
        }
        else {
            const blogs = yield db_1.prisma.blog.findMany({
                where: {
                    user_id: id,
                },
                select: {
                    title: true,
                    createDate: true,
                },
            });
            if (blogs) {
                res.json(blogs);
            }
            else {
                res.json('Sorry this user doesnt have blogs');
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserBlog = getUserBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const title = req.body.title;
    try {
        if (id === undefined || title === undefined) {
            res.json('Please write title and user_id');
        }
        else {
            const blog = yield db_1.prisma.blog.update({
                where: {
                    id: id,
                },
                data: {
                    title: title,
                },
            });
            if (blog) {
                res.json(blog);
            }
            else {
                res.json('Sorry something went wrong , please try again');
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateBlog = updateBlog;
const deleteAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    try {
        if (user_id === undefined) {
            res.json('Please write user_id');
        }
        else {
            const blog = yield db_1.prisma.blog.deleteMany({
                where: {
                    user_id: user_id,
                },
            });
            if (blog) {
                res.json('blogs deleted successfully');
            }
            else {
                res.json('Sorry something went wrong , please try again');
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAllBlogs = deleteAllBlogs;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id === undefined) {
            res.json('Please write id');
        }
        else {
            const blog = yield db_1.prisma.blog.delete({
                where: {
                    id: id,
                },
            });
            if (blog) {
                res.json('blog deleted successfully');
            }
            else {
                res.json('Sorry something went wrong , please try again');
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteBlog = deleteBlog;
