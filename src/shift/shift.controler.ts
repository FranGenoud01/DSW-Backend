import { Professional } from '../professional/professional.entity.js';
import { Request, Response } from 'express';
import { orm } from '../shared/orm.js';
import { Shift } from './shift.entity.js';
import ShiftService from './shift.service.js';
const entityManager = orm.em;

const shiftService = new ShiftService(entityManager);

async function generateShiftWeakly(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.id;
    const professional = await entityManager.findOneOrFail(Professional, {
      licenseNumber,
    });
    // Obtener la fecha actual y calcular el primer y último día de la semana actual
    const dateNow = new Date();
    const dayNow = dateNow.getDay();
    const firstDayWeek = new Date(dateNow);
    firstDayWeek.setDate(dateNow.getDate() - dayNow + 1);
    const lastDatWeek = new Date(firstDayWeek);
    lastDatWeek.setDate(firstDayWeek.getDate() + 4);
    const shifts = [];
    // Iterar sobre cada día de la semana actual
    for (
      let date = new Date(firstDayWeek);
      date <= lastDatWeek;
      date.setDate(date.getDate() + 1)
    ) {
      // Iterar sobre cada hora laboral del día (de 8 am a 4 pm)
      for (let hour = 8; hour <= 16; hour++) {
        const newShift = new Shift();
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ); // Crear una nueva instancia de Date solo con la fecha
        const formattedDate = newDate.toISOString().split('T')[0]; // Obtener la fecha formateada como "YYYY-MM-DD"
        newShift.dateShift = formattedDate;
        newShift.hourShift = `${hour}:00`;
        newShift.status = 'disponible';
        newShift.licenseProfessional = professional;
        newShift.price = professional.price;
        shifts.push(newShift);
      }
    }
    for (const newShift of shifts) {
      entityManager.persist(newShift);
    }
    await entityManager.flush();
    return res.status(200).json({ message: shifts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return [];
  }
}

async function findall(req: Request, res: Response) {
  try {
    const shifts = await shiftService.findAllShifts();
    res.status(200).json({ message: 'Found all shifts', data: shifts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const shift = await shiftService.findOneShift(id);
    if (!shift) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json({ message: 'Found shift', data: shift });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const shiftId = Number.parseInt(req.params.id);
    const DNI = req.params.dni;
    const shiftToUpdate = await shiftService.updateShift(shiftId, DNI);
    if (!shiftToUpdate)
      return res.status(404).json({ message: 'Shift not found' });
    res.status(200).json({ message: 'Shift updated', data: shiftToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    await shiftService.removeShift(id);
    res.status(200).json({ message: 'Shift removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function removeByProf(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.lic;
    const shift = await shiftService.removeShiftByProf(licenseNumber);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json({ message: 'Shift removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { generateShiftWeakly, remove, update, removeByProf, findall, findOne };
