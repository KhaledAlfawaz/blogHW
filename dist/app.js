"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const blog_route_1 = __importDefault(require("./routes/blog.route"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.use('/blogs', blog_route_1.default);
app.use('/users', user_route_1.default);
app.listen(port, () => {
    console.log(`Express running on port:${port}`);
});
