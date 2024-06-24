import { Speciality } from './speciality.entity.js';
class SpecialityService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async findAllSpecialities() {
        const specialities = await this.entityManager.find(Speciality, {});
        return specialities
            .filter((speciality) => speciality.id !== undefined && speciality.id !== null)
            .sort((a, b) => {
            if (a.id !== undefined && b.id !== undefined) {
                return a.id - b.id;
            }
            return 0;
        });
    }
    async findOneSpeciality(id) {
        try {
            return await this.entityManager.findOneOrFail(Speciality, id);
        }
        catch (error) {
            return null;
        }
    }
    async createSpeciality(speciality) {
        try {
            const newSpeciality = this.entityManager.create(Speciality, speciality);
            await this.entityManager.persistAndFlush(newSpeciality);
            return newSpeciality;
        }
        catch (error) {
            throw new Error('Failed to create speciality');
        }
    }
    async updateSpeciality(id, speciality) {
        const specialityToUpdate = await this.entityManager.findOneOrFail(Speciality, id);
        this.entityManager.assign(specialityToUpdate, speciality);
        await this.entityManager.flush();
        return specialityToUpdate;
    }
    async removeSpeciality(id) {
        const specialityToRemove = await this.entityManager.findOne(Speciality, id);
        if (!specialityToRemove) {
            throw new Error('Speciality not found');
        }
        await this.entityManager.removeAndFlush(specialityToRemove);
    }
}
export default SpecialityService;
//# sourceMappingURL=speciality.service.js.map