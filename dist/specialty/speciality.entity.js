var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Professional } from "../professional/professional.entity.js";
let Speciality = class Speciality extends BaseEntity {
    constructor() {
        super(...arguments);
        this.professionals = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Speciality.prototype, "description", void 0);
__decorate([
    OneToMany(() => Professional, (professional) => professional.speciality, {
        cascade: [Cascade.ALL]
    }),
    __metadata("design:type", Object)
], Speciality.prototype, "professionals", void 0);
Speciality = __decorate([
    Entity()
], Speciality);
export { Speciality };
//# sourceMappingURL=speciality.entity.js.map