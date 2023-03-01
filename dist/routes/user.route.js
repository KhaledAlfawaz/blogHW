"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get('/', user_controller_1.getAllUsers);
route.post('/', user_controller_1.createUser);
route.get('/:id', user_controller_1.getUser);
route.delete('/:id', user_controller_1.deleteUser);
exports.default = route;
