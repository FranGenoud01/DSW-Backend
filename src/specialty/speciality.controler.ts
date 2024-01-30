import { NextFunction, Response, Request } from "express";
import { orm } from "../shared/orm.js";
import { Speciality } from "./speciality.entity.js";


const entityManager=orm.em
function sanitizedSpecialityInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput={
    description:req.body.description
  }
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findall(req:Request, res:Response){
  try {
    const specialities= await entityManager.find(Speciality,{})
    res.status(200).json({message: 'Found all specialities', data: specialities})
  } catch (error:any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req:Request, res:Response) {
  try {
    const id= Number.parseInt(req.params.id)
    const speciality= await entityManager.findOneOrFail(Speciality,{id})
    res.status(200).json({message: 'Found speciality', data:speciality})
  } catch (error:any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const speciality = entityManager.create(Speciality, req.body.sanitizedInput)
    await entityManager.flush()
    res.status(201).json({ message: 'Speciality created', data: speciality })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const specialityToUpdate = await entityManager.findOneOrFail(Speciality, { id })
    entityManager.assign(specialityToUpdate, req.body.sanitizedInput)
    await entityManager.flush()
    res.status(200).json({ message: 'Speciality updated', data: specialityToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const speciality = await entityManager.findOne(Speciality, { id })
    if (!speciality) {
      return res.status(404).json({ message: 'Speciality not found' })
    }
    await entityManager.removeAndFlush(speciality)
    res.status(200).json({ message: 'Speciality removed successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {sanitizedSpecialityInput, findall, findOne, add, update, remove}