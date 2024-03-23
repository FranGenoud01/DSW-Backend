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
    return await this.entityManager.find(Shift, {});
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
      console.log(now);
      const shiftsFiltrados = shifts.filter((shift) => {
        const fechaTurno = new Date(shift.dateShift);
        console.log(fechaTurno);

        if (this.isSameDay(fechaTurno, now)) {
          console.log(fechaTurno >= now);

          return fechaTurno >= now && this.isAfterHour(now, shift.hourShift);
        } else {
          console.log(fechaTurno >= now);
          return fechaTurno >= now;
        }
      });
      return shiftsFiltrados;
    } catch (error) {
      return null;
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    console.log(date1.getFullYear(), date2.getFullYear());
    console.log(date1.getMonth(), date2.getMonth());
    console.log(date1.getDate(), date2.getDate());
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private isAfterHour(now: Date, hourShift: string): boolean {
    const [hour, minute] = hourShift.split(':').map(Number);
    return (
      now.getHours() < hour ||
      (now.getHours() === hour && now.getMinutes() < minute)
    );
  }

  async updateShift(idShift: number, dniPatient: string) {
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
