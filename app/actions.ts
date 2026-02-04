"use server";

import prisma from "@/lib/db";
import * as z from "zod";

const registrationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    college: z.string().min(2, "College name is required"),
    course: z.string().min(2, "Course is required"),
    year: z.string().min(1, "Select your year"),
    teamName: z.string().optional().nullable(),
    experience: z.string().min(1, "Select experience level"),
    interest: z.string().optional().nullable(),
    food: z.string().min(1, "Select food preference"),
    shirtSize: z.string().min(1, "Select shirt size"),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export async function registerParticipant(data: RegistrationData) {
    try {
        const validatedData = registrationSchema.parse(data);

        const participant = await prisma.participant.create({
            data: validatedData,
        });

        return { success: true, participant };
    } catch (error: any) {
        console.error("Registration error:", error);
        if (error instanceof z.ZodError) {
            return { success: false, message: "Validation failed", errors: error.flatten() };
        }
        return { success: false, message: error.message || "Internal server error" };
    }
}
