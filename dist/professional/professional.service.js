import { Professional } from './professional.entity.js';
import { Speciality } from '../specialty/speciality.entity.js';
import { HealthInsurance } from '../health insurance/healthInsurance.entity.js';
class ProfessionalService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async findAllProfessionals() {
        return await this.entityManager.find(Professional, {}, { populate: ['speciality'] });
    }
    async findOneProfessional(licenseNumber) {
        try {
            return await this.entityManager.findOneOrFail(Professional, { licenseNumber }, { populate: ['speciality'] });
        }
        catch (error) {
            return null;
        }
    }
    async createProfessional(professionalData) {
        try {
            const newProfessional = this.entityManager.create(Professional, professionalData);
            await this.entityManager.persistAndFlush(newProfessional);
            return newProfessional;
        }
        catch (error) {
            throw new Error('Failed to create professional');
        }
    }
    async updateProfessional(licenseNumber, professional) {
        const professionalToUpdate = await this.entityManager.findOneOrFail(Professional, { licenseNumber });
        this.entityManager.assign(professionalToUpdate, professional);
        await this.entityManager.flush();
        return professionalToUpdate;
    }
    async removeProfessional(licenseNumber) {
        const professional = await this.entityManager.findOne(Professional, {
            licenseNumber,
        });
        if (!professional) {
            throw new Error('Professional not found');
        }
        await this.entityManager.removeAndFlush(professional);
    }
    async getProfBySpeciality(idSpeciality) {
        try {
            const speciality = await this.entityManager.findOneOrFail(Speciality, idSpeciality);
            const professionals = await this.entityManager.find(Professional, { speciality }, { populate: ['speciality'] });
            return professionals;
        }
        catch (error) {
            return null;
        }
    }
    async getProfByHealthInsurance(idHealthInsurance) {
        try {
            const healthInsurance = await this.entityManager.findOneOrFail(HealthInsurance, idHealthInsurance);
            const professionals = await this.entityManager.find(Professional, { healthInsurances: healthInsurance }, {
                populate: [
                    'speciality',
                    'healthInsurances',
                ],
            });
            return professionals;
        }
        catch (error) {
            return null;
        }
    }
}
export default ProfessionalService;
//# sourceMappingURL=professional.service.js.map