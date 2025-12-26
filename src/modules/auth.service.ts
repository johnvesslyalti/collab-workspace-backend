import { signToken } from "../lib/jwt";
import { comparePassword, hashPassword } from "../lib/password";
import { authRepository } from "./auth.repository";

export const authService = {
    async register(email: string, password: string) {
        const existingUser = await authRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await authRepository.createUser(
            email,
            hashedPassword
        );

        const token = signToken({ userId: user.id });

        return { user, token };
    },

    async login(email: string, password: string) {
        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValid = await comparePassword(password, user.password);

        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        const token = signToken({ userId: user.id });

        return { user, token };
    }
};
