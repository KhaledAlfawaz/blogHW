import {prisma}  from '../config/db'
import {Request , Response} from 'express'
import { role } from '@prisma/client'

export const  getAllUsers = async (req:Request , res:Response)=> {
    try {
        const users = await prisma.user.findMany({
            select:{
                id:true,
                username:true,
                email:true,
                role:true,
            }
        })
        if(users){
            res.json(users)
        }else {
            res.status(404).json('Sorry users not found').status(404) 
        }
    } catch (error) {
        res.json(error)
    }
}

export const  getUser = async (req:Request , res:Response)=> {
    const {id} = req.params
    try {
        if (id === undefined){
        res.json('Please write the id');
        } else {
            const user = await prisma.user.findFirst({
                where:{
                    id
                },
                select:{
                    id:true,
                    username:true,
                    email:true,
                    role:true,
                }
            })
            if(user){
                res.json(user)
            }else {
                res.status(404).json('Sorry user not found')
            }        
        }
    } catch (error) {
        res.json(error)
    }
}

export const createUser = async (req:Request , res:Response)=> {
    const username:string = req.body.username
    const email:string = req.body.email
    const password:string = req.body.password
    const role:role = req.body.role

    try {
        if (username === undefined || email === undefined || password === undefined || role === undefined) {
            res.json('Please write username , email and password')
        } else {
            if(role.toLowerCase() == 'admin' || role.toLowerCase() == 'user'){
                const user = await prisma.user.create({
                    data:{
                        username:username,
                        email:email,
                        password:password,
                        role:role.toLowerCase() as role
                    }
                })
                if(user){
                    res.json(user)
                }else {
                    res.json('somthing went wrong please try again')
                } 
            } else{
                res.json('role can only be admin or user')
            }
        }
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req:Request , res:Response)=>{
    try {
        const user = await prisma.user.delete({
            where:{
                id:req.params.id
            }
        })
        if(user){
            res.json(user)
        }else {
            res.json('somthing went wrong please try again')
        } 
    } catch (error) {
        console.log(error);
        
    }
}
