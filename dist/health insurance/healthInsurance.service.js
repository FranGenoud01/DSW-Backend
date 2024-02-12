import { HealthInsurance } from './healthInsurance.entity.js';
class HealthInsuranceService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async findAllHealthInsurances() {
        return await this.entityManager.find(HealthInsurance, {});
    }
    async findOneHealthInsurance(id) {
        try {
            return await this.entityManager.findOneOrFail(HealthInsurance, id);
        }
        catch (error) {
            return null;
        }
    }
    async createHealthInsurance(healthInsurance) {
        try {
            const newHealthInsurance = this.entityManager.create(HealthInsurance, healthInsurance);
            await this.entityManager.persistAndFlush(newHealthInsurance);
            return newHealthInsurance;
        }
        catch (error) {
            throw new Error('Failed to create health insurance');
        }
    }
    async updateHealthInsurance(id, healthInsurance) {
        const healthInsuranceToUpdate = await this.entityManager.findOneOrFail(HealthInsurance, id);
        this.entityManager.assign(healthInsuranceToUpdate, healthInsurance);
        await this.entityManager.flush();
        return healthInsuranceToUpdate;
    }
    async removeHealthInsurance(id) {
        const healthInsuranceToRemove = await this.entityManager.findOne(HealthInsurance, id);
        if (!healthInsuranceToRemove) {
            throw new Error('Health insurance not found');
        }
        await this.entityManager.removeAndFlush(healthInsuranceToRemove);
    }
}
export default HealthInsuranceService;
//# sourceMappingURL=healthInsurance.service.js.map