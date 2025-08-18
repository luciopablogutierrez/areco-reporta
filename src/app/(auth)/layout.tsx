import { Home } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                <Home className="w-7 h-7"/>
            </div>
            <h1 className="text-4xl font-bold text-primary">ArecoReporta</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
