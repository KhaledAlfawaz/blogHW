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
exports.deleteUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const db_1 = require("../config/db");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            }
        });
        if (users) {
            res.json(users);
        }
        else {
            res.status(404).json('Sorry users not found').status(404);
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id === undefined) {
            res.json('Please write the id');
        }
        else {
            const user = yield db_1.prisma.user.findFirst({
                where: {
                    id
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                }
            });
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json('Sorry user not found');
            }
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    try {
        if (username === undefined || email === undefined || password === undefined || role === undefined) {
            res.json('Please write username , email and password');
        }
        else {
            if (role.toLowerCase() == 'admin' || role.toLowerCase() == 'user') {
                const user = yield db_1.prisma.user.create({
                    data: {
                        username: username,
                        email: email,
                        password: password,
                        role: role.toLowerCase()
                    }
                });
                if (user) {
                    res.json(user);
                }
                else {
                    res.json('somthing went wrong please try again');
                }
            }
            else {
                res.json('role can only be admin or user');
            }
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.user.delete({
            where: {
                id: req.params.id
            }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.json('somthing went wrong please try again');
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
