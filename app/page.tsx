import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-dark-pure relative">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-grid -z-20" />
            <div className="scanline" />
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-carbon-400/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-carbon-400/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            <RegistrationForm />
        </div>
    );
}
