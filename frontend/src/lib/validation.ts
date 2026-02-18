import { z } from "zod";

/**
 * Centralized validation schemas for all forms
 * Using Zod for type-safe, runtime validation
 */

// Reusable field validators
export const nameValidator = z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name cannot exceed 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .transform((val) => val.trim());

export const phoneValidator = z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .length(10, "Phone number must be exactly 10 digits");

export const emailValidator = z
    .string()
    .email("Invalid email format")
    .max(25, "Email cannot exceed 25 characters")
    .transform((val) => val.trim().toLowerCase());

export const areaValidator = z
    .string()
    .min(5, "Area must be at least 5 characters")
    .max(100, "Area cannot exceed 100 characters")
    .transform((val) => val.trim());

export const messageValidator = z
    .string()
    .max(150, "Message cannot exceed 150 characters")
    .optional();

// Booking Form Schema
export const bookingSchema = z.object({
    service: z.string().min(1, "Please select a service"),
    date: z.string().min(1, "Please select a date"),
    time: z.string().min(1, "Please select a time slot"),
    name: nameValidator,
    phone: phoneValidator,
    area: areaValidator,
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Corporate Inquiry Schema
export const corporateInquirySchema = z.object({
    companyName: z
        .string()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name cannot exceed 100 characters")
        .transform((val) => val.trim()),
    contactPerson: nameValidator,
    email: emailValidator.optional(),
    phone: phoneValidator,
    requirements: z
        .array(
            z.object({
                type: z.string().min(1, "Service type is required"),
                units: z.number().min(1, "At least 1 unit required").max(1000),
            })
        )
        .min(1, "Please add at least one service requirement"),
    additionalNotes: z
        .string()
        .max(500, "Additional notes cannot exceed 500 characters")
        .optional(),
});

export type CorporateInquiryFormData = z.infer<typeof corporateInquirySchema>;

// Review Form Schema
export const reviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating").max(5),
    comment: z
        .string()
        .min(10, "Review must be at least 10 characters")
        .max(500, "Review cannot exceed 500 characters")
        .transform((val) => val.trim()),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;


// Helper for real-time single field validation
export function validateSingleField<T>(
    schema: z.ZodObject<any>,
    field: string,
    value: unknown
): string {
    const fieldSchema = schema.shape[field];
    if (!fieldSchema) return "";

    const result = fieldSchema.safeParse(value);
    if (result.success) return "";

    return result.error.errors[0]?.message || "Invalid input";
}

// Helper function for manual validation (without React Hook Form)
export function validateField<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: boolean; data?: T; errors?: Record<string, string> } {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
        if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
        }
    });

    return { success: false, errors };
}
