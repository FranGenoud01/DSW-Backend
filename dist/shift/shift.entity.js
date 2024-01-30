var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Patient } from "../patient/patient.entity.js";
import { Professional } from "../professional/professional.entity.js";
let Shift = class Shift extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Shift.prototype, "dateShift", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Shift.prototype, "hourShift", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Shift.prototype, "status", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Shift.prototype, "price", void 0);
__decorate([
    ManyToOne(() => Patient, { nullable: true, unique: false }),
    __metadata("design:type", Object)
], Shift.prototype, "dniPatient", void 0);
__decorate([
    ManyToOne(() => Professional, { nullable: false, unique: false }),
    __metadata("design:type", Object)
], Shift.prototype, "licenseProfessional", void 0);
Shift = __decorate([
    Entity()
], Shift);
export { Shift };
//# sourceMappingURL=shift.entity.js.map