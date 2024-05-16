import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async validateAuth(DNI, password) {
        const userByDNI = await this.userService.findOneByDNI(DNI);
        if (!userByDNI) {
            return null;
        }
        const passwordCorrect = await bcrypt.compare(password, userByDNI.password);
        if (!passwordCorrect) {
            return null;
        }
        return userByDNI;
    }
    sign(payload, secret) {
        return jwt.sign(payload, secret);
    }
    async generateJWT(patient) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // Token expira en 1 hora
        const payload = {
            DNI: patient.DNI,
            name: patient.name,
            surname: patient.surname,
            exp: expirationDate.getTime() / 1000,
        };
        return {
            accessToken: this.sign(payload, '123456'),
            patient,
        };
    }
}
//# sourceMappingURL=auth.services.js.map