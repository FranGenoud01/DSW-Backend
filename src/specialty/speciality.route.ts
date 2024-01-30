import { Router } from "express";
import { add, findOne, findall, remove, sanitizedSpecialityInput, update } from "./speciality.controler.js";


export const specialityRouter=Router()

specialityRouter.get('/', findall)
specialityRouter.get('/:id', findOne)
specialityRouter.post('/', sanitizedSpecialityInput, add)
specialityRouter.put('/:id', sanitizedSpecialityInput, update)
specialityRouter.patch('/:id', sanitizedSpecialityInput, update)
specialityRouter.delete('/:id', remove)