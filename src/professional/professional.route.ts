import { Router } from "express";
import { add, findOne, findall, getProfBySpeciality, remove, sanitizedProfessionalInput, update } from "./professional.controler.js";

export const professionalRouter= Router()

professionalRouter.get('/', findall)
professionalRouter.get('/:id', findOne)
professionalRouter.post('/', sanitizedProfessionalInput, add)
professionalRouter.get('/:id/speciality', getProfBySpeciality)
professionalRouter.put('/:id', sanitizedProfessionalInput, update)
professionalRouter.patch('/:id', sanitizedProfessionalInput, update)
professionalRouter.delete('/:id', remove)