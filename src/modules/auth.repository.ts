import { prisma } from "../lib/prisma";

export const authRepository = {
    findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    },

    createUser(email: string, password: string) {
        return prisma.user.create({
            data: { email, password }
        });
    }
};
