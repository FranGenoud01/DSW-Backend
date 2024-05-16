var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { HealthInsurance } from '../health insurance/healthInsurance.entity.js';
let Patient = class Patient {
};
__decorate([
    PrimaryKey({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Patient.prototype, "DNI", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "surname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "birthdate", void 0);
__decorate([
    ManyToOne(() => HealthInsurance, { nullable: true, unique: false }),
    __metadata("design:type", Object)
], Patient.prototype, "healthInsurance", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "adress", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "phoneNumber", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "sex", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "password", void 0);
Patient = __decorate([
    Entity()
], Patient);
export { Patient };
//# sourceMappingURL=patient.entity.js.map