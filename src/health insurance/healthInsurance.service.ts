import { EntityManager } from '@mikro-orm/mysql';
import { HealthInsurance } from './healthInsurance.entity.js';

class HealthInsuranceService {
  private readonly entityManager: EntityManager;
  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async findAllHealthInsurances() {
    return await this.entityManager.find(HealthInsurance, {});
  }

  async findOneHealthInsurance(id: number) {
    try {
      return await this.entityManager.findOneOrFail(HealthInsurance, id);
    } catch (error) {
      return null;
    }
  }

  async findHealthInsuranceByDescription(description: string) {
    try {
      return await this.entityManager.findOneOrFail(HealthInsurance, {
        description,
      });
    } catch (error) {
      return null;
    }
  }

  async createHealthInsurance(
    healthInsurance: HealthInsurance
  ): Promise<HealthInsurance> {
    try {
      const newHealthInsurance = this.entityManager.create(
        HealthInsurance,
        healthInsurance
      );
      await this.entityManager.persistAndFlush(newHealthInsurance);
      return newHealthInsurance;
    } catch (error) {
      throw new Error('Failed to create health insurance');
    }
  }

  async updateHealthInsurance(id: number, healthInsurance: HealthInsurance) {
    const healthInsuranceToUpdate = await this.entityManager.findOneOrFail(
      HealthInsurance,
      id
    );
    this.entityManager.assign(healthInsuranceToUpdate, healthInsurance);
    await this.entityManager.flush();
    return healthInsuranceToUpdate;
  }

  async removeHealthInsurance(id: number) {
    const healthInsuranceToRemove = await this.entityManager.findOne(
      HealthInsurance,
      id
    );
    if (!healthInsuranceToRemove) {
      throw new Error('Health insurance not found');
    }
    await this.entityManager.removeAndFlush(healthInsuranceToRemove);
  }
}

export default HealthInsuranceService;
