import { EntityManager } from '@mikro-orm/mysql';
import { Speciality } from './speciality.entity.js';

class SpecialityService {
  private readonly entityManager: EntityManager;
  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async findAllSpecialities() {
    return await this.entityManager.find(Speciality, {});
  }

  async findOneSpeciality(id: number) {
    try {
      return await this.entityManager.findOneOrFail(Speciality, id);
    } catch (error) {
      return null;
    }
  }

  async createSpeciality(speciality: Speciality): Promise<Speciality> {
    try {
      const newSpeciality = this.entityManager.create(Speciality, speciality);
      await this.entityManager.persistAndFlush(newSpeciality);
      return newSpeciality;
    } catch (error) {
      throw new Error('Failed to create speciality');
    }
  }

  async updateSpeciality(id: number, speciality: Speciality) {
    const specialityToUpdate = await this.entityManager.findOneOrFail(
      Speciality,
      id
    );
    this.entityManager.assign(specialityToUpdate, speciality);
    await this.entityManager.flush();
    return specialityToUpdate;
  }

  async removeSpeciality(id: number) {
    const specialityToRemove = await this.entityManager.findOne(Speciality, id);
    if (!specialityToRemove) {
      throw new Error('Speciality not found');
    }
    await this.entityManager.removeAndFlush(specialityToRemove);
  }
}

export default SpecialityService;
