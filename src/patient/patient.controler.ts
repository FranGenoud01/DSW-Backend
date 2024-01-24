import { NextFunction, Request, Response } from "express";
import { PatientRepository } from "./patient.repository.js";
import { Patient } from "./patient.entity.js";

const Repository= new PatientRepository
function sanitizePatientInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizeInput={
    nombre:req.body.nombre,
    apellido:req.body.apellido,
    direccion:req.body.direccion,
    telefono:req.body.telefono,
    sexo:req.body.sexo,
    mail:req.body.mail,
    usuario:req.body.usuario,
    password:req.body.password
  }
  Object.keys(req.body.sanitizedInput).forEach( (key)=>{
    if (req.body.sanitizedInput[key] == undefined) delete req.body.sanitizedInput[key]
  })
  next()
}

async function findall(req:Request, res:Response){
  res.json({data:Repository.findAll()})
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const patient = await Repository.findOne({ id })
  if (!patient) {
    return res.status(404).send({ message: 'Patient not found' })
  }
  res.json({ data: patient })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput
  const patientInput = new Patient(
    input.nombre,
    input.apellido,
    input.direccion,
    input.telefono,
    input.sexo,
    input.mail,
    input.usuario,
    input.password
  )
  const patient = await Repository.add(patientInput)
  return res.status(201).send({ message: 'Patient created', data: patient })
}

async function update(req: Request, res: Response) {
  const patient = await Repository.update(req.params.id, req.body.sanitizedInput)
  if (!patient) {
    return res.status(404).send({ message: 'Patient not found' })
  }
  return res.status(200).send({ message: 'Patient updated successfully', data: patient })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const patient = await Repository.delete({ id })

  if (!patient) {
    res.status(404).send({ message: 'Patient not found' })
  } else {
    res.status(200).send({ message: 'Patient deleted successfully' })
  }
}

export {sanitizePatientInput, findall, findOne, add, update, remove}