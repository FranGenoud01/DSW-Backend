import { Router } from "express";
import { add, findOne, findall, remove, sanitizePatientInput, update } from "./patient.controler.js";

export const patientRouter= Router()

patientRouter.get('/', findall)
patientRouter.get('/:id', findOne)
patientRouter.post('/', sanitizePatientInput, add)
patientRouter.put('/:id', sanitizePatientInput, update)
patientRouter.patch('/:id', sanitizePatientInput, update)
patientRouter.delete('/:id', remove)