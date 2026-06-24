import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { coachingInquiries } from "@db/schema";

export const inquiryRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        programType: z.string().min(1),
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(coachingInquiries).values({
        userId: input.userId ?? null,
        programType: input.programType,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? null,
        message: input.message ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),
});
