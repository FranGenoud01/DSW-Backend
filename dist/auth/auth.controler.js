export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        const { DNI, password } = req.body;
        try {
            const patient = await this.authService.validateAuth(DNI, password);
            if (!patient) {
                throw new Error('Invalid user or password');
            }
            const token = await this.authService.generateJWT(patient);
            res.json({ token });
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}
//# sourceMappingURL=auth.controler.js.map