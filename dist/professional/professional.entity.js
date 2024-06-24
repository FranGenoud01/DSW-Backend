var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Entity, ManyToMany, ManyToOne, PrimaryKey, Property, } from '@mikro-orm/core';
import { Speciality } from '../specialty/speciality.entity.js';
import { HealthInsurance } from '../health insurance/healthInsurance.entity.js';
let Professional = class Professional {
};
__decorate([
    PrimaryKey({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Professional.prototype, "licenseNumber", void 0);
__decorate([
    ManyToOne(() => Speciality, { nullable: true, unique: false }),
    __metadata("design:type", Object)
], Professional.prototype, "speciality", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Professional.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Professional.prototype, "surname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Professional.prototype, "price", void 0);
__decorate([
    ManyToMany(() => HealthInsurance, (healthInsurance) => healthInsurance.professionals, {
        cascade: [Cascade.ALL],
        owner: true,
    }),
    __metadata("design:type", Array)
], Professional.prototype, "healthInsurances", void 0);
Professional = __decorate([
    Entity()
], Professional);
export { Professional };
//# sourceMappingURL=professional.entity.js.map