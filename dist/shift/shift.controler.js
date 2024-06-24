import { Professional } from '../professional/professional.entity.js';
import { orm } from '../shared/orm.js';
import { Shift } from './shift.entity.js';
import ShiftService from './shift.service.js';
const entityManager = orm.em;
const shiftService = new ShiftService(entityManager);
async function generateShiftMonthly(req, res) {
    try {
        const licenseNumber = req.params.id;
        const professional = await entityManager.findOneOrFail(Professional, {
            licenseNumber,
        });
        // Obtener la fecha actual y calcular el primer y último día del mes actual
        const dateNow = new Date();
        const firstDayMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
        const lastDayMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);
        // Verificar si el profesional ya tiene turnos generados en el mes actual
        const existingShifts = await entityManager.find(Shift, {
            licenseProfessional: professional,
            dateShift: {
                $gte: firstDayMonth.toISOString().split('T')[0],
                $lte: lastDayMonth.toISOString().split('T')[0],
            },
        });
        if (existingShifts.length > 0) {
            return res.status(400).json({
                message: 'El profesional ya tiene turnos generados este mes.',
            });
        }
        const shifts = [];
        // Iterar sobre cada día del mes actual
        for (let date = new Date(firstDayMonth); date <= lastDayMonth; date.setDate(date.getDate() + 1)) {
            // Verificar si el día actual es un día de semana (lunes a viernes)
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // 0 es domingo, 6 es sábado
                for (let hour = 8; hour <= 16; hour++) {
                    const newShift = new Shift();
                    const formattedDate = date.toISOString().split('T')[0]; // Obtener la fecha formateada como "YYYY-MM-DD"
                    newShift.dateShift = formattedDate;
                    newShift.hourShift = `${hour}:00`;
                    newShift.status = 'disponible';
                    newShift.licenseProfessional = professional;
                    newShift.price = professional.price;
                    shifts.push(newShift);
                }
            }
        }
        for (const newShift of shifts) {
            entityManager.persist(newShift);
        }
        await entityManager.flush();
        return res.status(200).json({ message: shifts });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return [];
    }
}
async function findall(req, res) {
    try {
        const shifts = await shiftService.findAllShifts();
        res.status(200).json({ message: 'Found all shifts', data: shifts });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const shift = await shiftService.findOneShift(id);
        if (!shift)
            return res.status(404).json({ message: 'Not found' });
        return res.status(200).json({ message: 'Found shift', data: shift });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function findByDNI(req, res) {
    try {
        const dni = req.params.dni;
        const shift = await shiftService.findOneByDNI(dni);
        if (!shift)
            return res.status(404).json({ message: 'Not found' });
        return res.status(200).json({ message: 'Found shift', data: shift });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const shiftId = Number.parseInt(req.params.id);
        const DNI = req.params.dni;
        const price = req.body.price;
        const shiftToUpdate = await shiftService.updateShift(shiftId, DNI, price);
        if (!shiftToUpdate)
            return res.status(404).json({ message: 'Shift not found' });
        res.status(200).json({ message: 'Shift updated', data: shiftToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function cancel(req, res) {
    try {
        const shiftId = Number.parseInt(req.params.id);
        const shiftToCancel = await shiftService.cancelShift(shiftId);
        if (!shiftToCancel)
            return res.status(404).json({ message: 'Shift not found' });
        res.status(200).json({ message: 'Shift canceled', data: shiftToCancel });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getShiftsByProfessional(req, res) {
    try {
        const licenseProfessional = req.params.licenseNumber;
        const shifts = await shiftService.getShiftsFreeByProf(licenseProfessional);
        res.status(200).json({ message: 'Shifts avaialable', data: shifts });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getHoursFreeByDate(req, res) {
    try {
        const licenseProfessional = req.params.licenseNumber;
        const date = req.params.date;
        const shifts = (await shiftService.getShiftsFreeByProf(licenseProfessional)) || [];
        if (shifts.length === 0) {
            return res.status(404).json({
                message: 'No hay turnos disponibles para el profesional especificado.',
            });
        }
        const hours = await shiftService.getHoursFreeByProf(shifts, date);
        res.status(200).json({ message: 'Hours available', data: hours });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        await shiftService.removeShift(id);
        res.status(200).json({ message: 'Shift removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function removeByProf(req, res) {
    try {
        const licenseNumber = req.params.lic;
        const shift = await shiftService.removeShiftByProf(licenseNumber);
        if (!shift) {
            return res.status(404).json({ message: 'Shift not found' });
        }
        res.status(200).json({ message: 'Shift removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { generateShiftMonthly, getShiftsByProfessional, getHoursFreeByDate, remove, update, cancel, removeByProf, findall, findOne, findByDNI, };
//# sourceMappingURL=shift.controler.js.map