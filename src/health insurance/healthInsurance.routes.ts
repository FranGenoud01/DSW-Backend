import { Router } from "express";
import { add, findOne, findall, remove, sanitizedHealthInsuranceInput, update  } from "./healthInsurance.controler.js";

export const healthInsuranceRouter= Router()

healthInsuranceRouter.get('/', findall)
healthInsuranceRouter.get('/:id', findOne)
healthInsuranceRouter.post('/', sanitizedHealthInsuranceInput, add)
healthInsuranceRouter.put('/:id', sanitizedHealthInsuranceInput, update)
healthInsuranceRouter.patch('/:id', sanitizedHealthInsuranceInput, update)
healthInsuranceRouter.delete('/:id', remove)