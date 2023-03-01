"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_controller_1 = require("../controller/blog.controller");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get('/', blog_controller_1.getAllBlogs);
route.post('/', blog_controller_1.createBlog);
route.get('/:id', blog_controller_1.getUserBlog);
route.put('/:id', blog_controller_1.updateBlog);
route.delete('/user/:user_id', blog_controller_1.deleteAllBlogs);
route.delete('/:id', blog_controller_1.deleteBlog);
exports.default = route;
