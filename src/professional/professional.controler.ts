import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/orm.js";
import { Professional } from "./professional.entity.js";
import { Speciality } from "../specialty/speciality.entity.js";

const entityManager= orm.em

function sanitizedProfessionalInput(req:Request, res:Response, next: NextFunction){
  req.body.sanitizedInput={
    licenseNumber:req.body.licenseNumber,
    speciality:req.body.speciality,
    name:req.body.name,
    surname:req.body.surname,
    healthInsurances:req.body.healthInsurances,
    price:req.body.price
  }
  Object.keys(req.body.sanitizedInput).forEach( (key)=>{
    if (req.body.sanitizedInput[key] == undefined) delete req.body.sanitizedInput[key]
  })
  next()
}

async function findall(req:Request, res:Response){
  try {
    const professionals= await entityManager.find(Professional,{},{ populate: ['speciality']})
    res.status(200).json({message: 'Found all professionals', data: professionals})

  } catch (error: any) {
  res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try{const licenseNumber = req.params.id
  const professional= await entityManager.findOneOrFail(Professional,{licenseNumber},{ populate: ['speciality']})
  res.status(200).json({message: 'Found professional', data: professional})
  }catch(error:any){
  res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const professional = entityManager.create(Professional, req.body.sanitizedInput)
    await entityManager.flush()
    res.status(201).json({ message: 'Professional created', data: professional })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function getProfBySpeciality(req:Request, res:Response){
  try {
    const id = parseInt(req.params.id);
    const speciality= await entityManager.findOneOrFail(Speciality, {id})
    const professionals= await entityManager.find(Professional,{speciality},{ populate: ['speciality']})
    res.status(200).json({message: 'Found all professionals', data: professionals})

  } catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.id
    const professionalToUpdate = await entityManager.findOneOrFail(Professional, { licenseNumber })
    entityManager.assign(professionalToUpdate, req.body.sanitizedInput)
    await entityManager.flush()
    res.status(200).json({ message: 'Professional updated', data: professionalToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.id
    const professional = await entityManager.findOne(Professional, { licenseNumber })
    if (!professional) {
      return res.status(404).json({ message: 'Professional not found' })
    }
    await entityManager.removeAndFlush(professional)
    res.status(200).json({ message: 'Professional removed successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {sanitizedProfessionalInput, findOne, findall, add, update, remove, getProfBySpeciality}