import { PrismaClient, type Prisma } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient;
}

const prisma =
    process.env.NODE_ENV === "production" || !global.prisma
        ? new PrismaClient()
        : global.prisma;

const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
    excludeModels: ["Institution", "GeCategory", "Course", "Articulation"],
    excludeMethods: ["findFirst"],
    storage: {
        type: "memory",
        options: { size: 256, invalidation: true },
    },
    cacheTime: 3_600, // 1 hour
});
prisma.$use(cacheMiddleware);

export const db = prisma;
