"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, Terminal } from "lucide-react";
import { registerParticipant } from "@/app/actions";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    college: z.string().min(2, "College name is required"),
    course: z.string().min(2, "Course is required"),
    year: z.string().min(1, "Select your year"),
    teamName: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    experience: z.string().min(1, "Select experience level"),
    interest: z.string().optional(),
    food: z.string().min(1, "Select food preference"),
    shirtSize: z.string().min(1, "Select shirt size"),
});

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            experience: "Beginner",
            food: "Veg",
            shirtSize: "M",
        }
    });

    const nextStep = async () => {
        const fields = step === 1
            ? ["name", "email", "phone", "college"]
            : step === 2
                ? ["course", "year", "experience"]
                : ["food", "shirtSize"];

        const isValid = await trigger(fields as any);
        if (isValid) setStep((s) => s + 1);
    };

    const prevStep = () => setStep((s) => s - 1);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await registerParticipant(data);

            if (result.success) {
                setIsSuccess(true);
            } else {
                alert(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 text-center rounded-3xl max-w-lg mx-auto"
            >
                <CheckCircle2 className="w-20 h-20 text-carbon-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold neon-text mb-4">REGISTRATION COMPLETE</h2>
                <p className="text-white/70 mb-8">
                    Welcome to the grid, participant. Your data has been successfully uploaded to CarbonX protocols.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="neon-button w-full"
                >
                    DONE
                </button>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon-400/10 border border-carbon-400/20 text-carbon-400 text-xs font-mono mb-4">
                    <Terminal size={12} />
                    SYSTEM_ACCESS: GRANTED
                </div>
                <h1 className="text-4xl md:text-5xl font-black neon-text mb-2">CARBONX</h1>
                <p className="text-white/50 font-mono text-sm tracking-widest uppercase">Registration Protocol v5.0</p>
            </div>

            <div className="glass p-6 md:p-10 rounded-3xl relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-carbon-400"
                        initial={{ width: "33%" }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-tight">/01_PERSONAL_INFO</h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">Full Name</label>
                                        <input {...register("name")} className="input-field" placeholder="John Doe" />
                                        {errors.name && <p className="text-red-500 text-[10px] mt-1 uppercase">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">Email Address</label>
                                        <input {...register("email")} type="email" className="input-field" placeholder="john@example.com" />
                                        {errors.email && <p className="text-red-500 text-[10px] mt-1 uppercase">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">Phone Number</label>
                                        <input {...register("phone")} className="input-field" placeholder="+91 000 000 0000" />
                                        {errors.phone && <p className="text-red-500 text-[10px] mt-1 uppercase">{errors.phone.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">College / University</label>
                                        <input {...register("college")} className="input-field" placeholder="Rajagiri S.E.T" />
                                        {errors.college && <p className="text-red-500 text-[10px] mt-1 uppercase">{errors.college.message}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-tight">/02_ACADEMIC_EXPERIENCE</h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">Course / Department</label>
                                        <input {...register("course")} className="input-field" placeholder="CSE" />
                                        {errors.course && <p className="text-red-500 text-[10px] mt-1 uppercase">{errors.course.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">Current Year</label>
                                        <select {...register("year")} className="input-field appearance-none">
                                            <option value="">Select Year</option>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </select>
                                        {errors.year && <p className="text-red-500 text-[10px] mt-1 uppercase">{errors.year.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-white/40 uppercase">Experience Level</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["Beginner", "Intermediate", "Advanced"].map((level) => (
                                            <label key={level} className="relative cursor-pointer">
                                                <input
                                                    type="radio"
                                                    {...register("experience")}
                                                    value={level}
                                                    className="peer sr-only"
                                                />
                                                <div className="p-3 text-center border border-white/10 rounded-lg text-xs font-bold peer-checked:bg-carbon-400 peer-checked:text-black peer-checked:border-carbon-400 transition-all uppercase">
                                                    {level}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-white/40 uppercase">Team Name (If any)</label>
                                    <input {...register("teamName")} className="input-field" placeholder="CyberSquad" />
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-tight">/03_MISC_PROTOCOLS</h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">Food Preference</label>
                                        <select {...register("food")} className="input-field">
                                            <option value="Veg">Vegetarian</option>
                                            <option value="Non-Veg">Non-Vegetarian</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-white/40 uppercase">Unisex T-Shirt Size</label>
                                        <select {...register("shirtSize")} className="input-field">
                                            <option value="S">Small (S)</option>
                                            <option value="M">Medium (M)</option>
                                            <option value="L">Large (L)</option>
                                            <option value="XL">Extra Large (XL)</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-white/40 uppercase">GitHub Profile URL</label>
                                    <input {...register("github")} className="input-field" placeholder="https://github.com/yourname" />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-white/40 uppercase">LinkedIn Profile URL</label>
                                    <input {...register("linkedin")} className="input-field" placeholder="https://linkedin.com/in/yourname" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-6 border-t border-white/5 mt-8">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all uppercase font-mono text-sm"
                            >
                                <ChevronLeft size={16} />
                                BACK
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="neon-button flex-1 flex items-center justify-center gap-2 uppercase font-mono tracking-wider"
                            >
                                Next Step
                                <ChevronRight size={16} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="neon-button flex-1 flex items-center justify-center gap-2 uppercase font-mono tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={16} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Initialize Registration
                                        <ChevronRight size={16} />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="mt-8 text-center text-white/20 font-mono text-[10px] tracking-widest uppercase">
                © 2026 RSET IEDC // HACKSUS v5.0 // CARBONX TRACK
            </div>
        </div>
    );
}
