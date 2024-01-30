import { Professional } from "../professional/professional.entity.js";
import {Request, Response} from "express";
import { orm } from "../shared/orm.js";
import { Shift } from "./shift.entity.js";
import { Patient } from "../patient/patient.entity.js";
const entityManager= orm.em

async function generateShiftWeakly(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.id
    const professional = await entityManager.findOneOrFail(Professional, { licenseNumber })
    // Obtener la fecha actual y calcular el primer y último día de la semana actual
    const dateNow = new Date()
    const dayNow = dateNow.getDay()
    const firstDayWeek = new Date(dateNow)
    firstDayWeek.setDate(dateNow.getDate() - dayNow + 1)
    const lastDatWeek = new Date(firstDayWeek)
    lastDatWeek.setDate(firstDayWeek.getDate() + 4)
    const shifts = []
    // Iterar sobre cada día de la semana actual
    for (let date = new Date(firstDayWeek); date <= lastDatWeek; date.setDate(date.getDate() + 1)) {
      // Iterar sobre cada hora laboral del día (de 8 am a 4 pm)
      for (let hour = 8; hour <= 16; hour++) {
        const newShift = new Shift()
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()) // Crear una nueva instancia de Date solo con la fecha
        const formattedDate = newDate.toISOString().split('T')[0] // Obtener la fecha formateada como "YYYY-MM-DD"
        newShift.dateShift = formattedDate
        newShift.hourShift = `${hour}:00`
        newShift.status = "disponible"
        newShift.licenseProfessional = professional
        newShift.price = professional.price
        shifts.push(newShift)
      }
    }
    // Persistir los turnos en la base de datos
    for (const newShift of shifts) {
      entityManager.persist(newShift)
    }
    await entityManager.flush() 
    return res.status(200).json({message: shifts})
  } catch (error:any) {
      res.status(500).json({ message: error.message });
      return []
    }
}


async function update(req: Request, res: Response) {
  try {
    const shiftId = Number.parseInt(req.params.id)
    const shiftToUpdate = await entityManager.findOneOrFail(Shift, { id: shiftId })
    if (!shiftToUpdate){
      return res.status(404).json({message: 'Shift not found'})
    }
    const DNI = req.params.dni
    const patient = await entityManager.findOneOrFail(Patient, { DNI })
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    shiftToUpdate.dniPatient=patient
    shiftToUpdate.status='ocupado'
    entityManager.assign(shiftToUpdate, shiftToUpdate)
    await entityManager.flush()
    res.status(200).json({ message: 'Shift updated', data: shiftToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const shift = await entityManager.findOne(Shift, { id, dniPatient:null })
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' })
    }
    await entityManager.removeAndFlush(shift)
    res.status(200).json({ message: 'Shift removed successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function removeByProf(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.lic
    const professional= await entityManager.findOne(Professional, {licenseNumber})
    const shift = await entityManager.find(Shift, { licenseProfessional:professional,dniPatient: null})
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' })
    }
    await entityManager.removeAndFlush(shift)
    res.status(200).json({ message: 'Shift removed successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { generateShiftWeakly, remove, update, removeByProf };
