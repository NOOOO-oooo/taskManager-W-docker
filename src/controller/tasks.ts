import { PrismaClient}from '@prisma/client'

import { Request,Response } from 'express'

import redis from '../../redis';

const prisma= new PrismaClient();

export const createTask=async(req:Request,res:Response)=>{
    try {
        const newTask=await prisma.tasks.create({
            data:{
                description:req.body.description,
            }
        })
 res.status(200).json({newTask})

    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}

export const getTask=async(req:Request,res:Response)=>{
    try {
        const one=await prisma.tasks.findUnique({
            where:{
                id:+req.params.id
            }
            
        })
        res.status(200).json({message:"here you go:",one})
    } catch (error) {
        
    }
}


export const allTasks=async(req:Request,res:Response)=>{
//    the key value s
    const cacheKey= "task:all"
    try {
        // 
        const cached =await redis.get(cacheKey);
        if(cached){
            console.log("yes its cached")
            console.log({cached})
            res.status(200).json(JSON.parse(cached))
        }else{
            const all=await prisma.tasks.findMany()
       
            await redis.set(cacheKey,JSON.stringify(all),'EX',3600)
            
             res.status(200).json({message:"here you go:",all})
        }
    } catch (e:any) {
        console.log({e})
        res.status(500).json({e:e.message})
    }
}

export const deleteTask=async(req:Request,res:Response)=>{
    try {
        const target=await prisma.tasks.delete({
            where:{
                id:+req.params.id
            }
        })
 res.status(200).json({message:"task deleted"})

    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}

export const pendingTasks=async(req:Request,res:Response)=>{
    try {
        const allPending=await prisma.tasks.findMany({where:{
            task_status:"pending"
        }})
        res.status(200).json({allPending})
    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}

export const changeDesc=async(req:Request,res:Response)=>{
    try {
        const editdesc=await prisma.tasks.update({
            where:{
                id:+req.params.id
            },
            data:{
                description:req.body.description
            }
        })
        res.status(200).json("It has been updated successfully")
    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}


export const inProgress=async(req:Request,res:Response)=>{
    try {
        const progress=await prisma.tasks.update({
            where:{
                id:+req.params.id
            },
            data:{
                task_status:"in-progress"
            }
        })
        res.status(200).json("status updated successfully")
    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}


export const done=async(req:Request,res:Response)=>{
    try {
        const progress=await prisma.tasks.update({
            where:{
                id:+req.params.id
            },
            data:{
                task_status:"done"
            }
        })
        res.status(200).json("task done!")
    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}

export const doneTasks=async(req:Request,res:Response)=>{
    try {
        const done=await prisma.tasks.findMany({where:{
            task_status:"done"
        }})
        res.status(200).json({done})
    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}


export const progressTasks=async(req:Request,res:Response)=>{
    try {
        const progressTasks=await prisma.tasks.findMany({where:{
            task_status:"in-progress"
        }})
        res.status(200).json({progressTasks})
    } catch (e:any) {
        res.status(500).json({e:e.message})
    }
}
