import { EntityManager } from '@mikro-orm/mysql';
import { Professional } from './professional.entity.js';
import { Speciality } from '../specialty/speciality.entity.js';

class ProfessionalService {
  private readonly entityManager: EntityManager;
  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async findAllProfessionals() {
    return await this.entityManager.find(
      Professional,
      {},
      { populate: ['speciality'] }
    );
  }

  async findOneProfessional(licenseNumber: string) {
    try {
      return await this.entityManager.findOneOrFail(
        Professional,
        { licenseNumber },
        { populate: ['speciality'] }
      );
    } catch (error) {
      return null;
    }
  }

  async createProfessional(
    professionalData: Professional
  ): Promise<Professional> {
    try {
      const newProfessional = this.entityManager.create(
        Professional,
        professionalData
      );
      await this.entityManager.persistAndFlush(newProfessional);
      return newProfessional;
    } catch (error) {
      throw new Error('Failed to create professional');
    }
  }

  async updateProfessional(licenseNumber: string, professional: Professional) {
    const professionalToUpdate = await this.entityManager.findOneOrFail(
      Professional,
      { licenseNumber }
    );
    this.entityManager.assign(professionalToUpdate, professional);
    await this.entityManager.flush();
    return professionalToUpdate;
  }

  async removeProfessional(licenseNumber: string) {
    const professional = await this.entityManager.findOne(Professional, {
      licenseNumber,
    });
    if (!professional) {
      throw new Error('Professional not found');
    }
    await this.entityManager.removeAndFlush(professional);
  }

  async getProfBySpeciality(idSpeciality: number) {
    try {
      const speciality = await this.entityManager.findOneOrFail(
        Speciality,
        idSpeciality
      );
      const professionals = await this.entityManager.find(
        Professional,
        { speciality },
        { populate: ['speciality'] }
      );
      return professionals;
    } catch (error: any) {
      return null;
    }
  }
}

export default ProfessionalService;
