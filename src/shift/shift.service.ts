import { EntityManager } from '@mikro-orm/mysql';
import { Shift } from './shift.entity.js';
import { Patient } from '../patient/patient.entity.js';
import { Professional } from '../professional/professional.entity.js';

class ShiftService {
  private readonly entityManager: EntityManager;
  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async findAllShifts() {
    return await this.entityManager.find(
      Shift,
      {},
      {
        populate: [
          'licenseProfessional' as 'licenseProfessional',
          'licenseProfessional.speciality' as 'licenseProfessional.speciality',
        ],
      }
    );
  }

  async findOneShift(id: number) {
    try {
      return await this.entityManager.findOneOrFail(Shift, id);
    } catch (error) {
      return null;
    }
  }

  async findOneByDNI(DNI: string) {
    try {
      const patient = await this.entityManager.findOneOrFail(Patient, { DNI });
      const shifts = await this.entityManager.find(Shift, {
        dniPatient: patient,
      });
      const now = new Date();
      const filteredShifts = shifts.filter((shift) => {
        const fechaTurno = new Date(shift.dateShift + ' ' + shift.hourShift);
        return fechaTurno > now;
      });
      filteredShifts.sort((shiftA, shiftB) => {
        const dateA = new Date(shiftA.dateShift + ' ' + shiftA.hourShift);
        const dateB = new Date(shiftB.dateShift + ' ' + shiftB.hourShift);

        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return 0;
        }
      });
      return filteredShifts;
    } catch (error) {
      return null;
    }
  }

  async updateShift(idShift: number, dniPatient: string, price: number) {
    try {
      const shiftToUpdate = await this.entityManager.findOneOrFail(
        Shift,
        idShift
      );
      if (!shiftToUpdate) return null;
      const DNI = dniPatient;
      const patient = await this.entityManager.findOneOrFail(Patient, { DNI });
      if (!patient) throw new Error('Patient not found');
      shiftToUpdate.dniPatient = patient;
      shiftToUpdate.status = 'ocupado';
      shiftToUpdate.price = price;
      this.entityManager.assign(shiftToUpdate, shiftToUpdate);
      await this.entityManager.flush();
      return shiftToUpdate;
    } catch (error: any) {
      return null;
    }
  }

  async cancelShift(idShift: number) {
    try {
      const shiftToCancel = await this.entityManager.findOneOrFail(
        Shift,
        idShift
      );
      shiftToCancel.dniPatient = null;
      shiftToCancel.status = 'disponible';
      await this.entityManager.flush();
      return shiftToCancel;
    } catch (error: any) {
      console.error('Error al cancelar el turno:', error.message);
      return null;
    }
  }

  async getShiftsFreeByProf(licenseNumber: string, today: Date = new Date()) {
    try {
      const professional = await this.entityManager.findOneOrFail(
        Professional,
        { licenseNumber }
      );
      const dateStr = today.toISOString().split('T')[0];
      const shifts = await this.entityManager.find(Shift, {
        licenseProfessional: professional,
        status: 'disponible',
        dniPatient: null,
        dateShift: {
          $gt: dateStr,
        },
      });
      return shifts;
    } catch (error: any) {
      console.error('Error al encontrar un turno', error.message);
      return null;
    }
  }

  async getHoursFreeByProf(shifts: Shift[], date: string) {
    const matchingShifts = shifts.filter((shift) => shift.dateShift === date);
    return matchingShifts;
  }

  async removeShift(id: number) {
    const shiftToRemove = await this.entityManager.findOne(Shift, id);
    if (!shiftToRemove) {
      throw new Error('Health insurance not found');
    }
    await this.entityManager.removeAndFlush(shiftToRemove);
  }

  async removeShiftByProf(licenseNumber: string) {
    try {
      const professional = await this.entityManager.findOne(Professional, {
        licenseNumber,
      });
      const shift = await this.entityManager.find(Shift, {
        licenseProfessional: professional,
        dniPatient: null,
      });
      if (!shift) {
        return null;
      }
      await this.entityManager.removeAndFlush(shift);
      return shift;
    } catch (error: any) {
      return null;
    }
  }
}

export default ShiftService;
