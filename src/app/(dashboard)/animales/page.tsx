
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Dog, Newspaper, ShieldAlert, BookMarked } from "lucide-react";
import Link from 'next/link';

export default function AnimalesPage() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Dog className="w-8 h-8 text-primary"/>
                    Animales
                </h1>
                <p className="text-muted-foreground">Gestiona tus mascotas y ayuda a la comunidad.</p>
            </div>

            <div className="space-y-4">
                <Card className="hover:bg-primary/5 transition-colors">
                    <Link href="#">
                        <div className="flex items-center p-6">
                            <Newspaper className="w-8 h-8 mr-6 text-primary"/>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold">Portal de mascotas y animales</h3>
                                <p className="text-muted-foreground text-sm">Explora el portal de adopción y noticias.</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </Link>
                </Card>

                <Card className="hover:bg-primary/5 transition-colors">
                    <Link href="#">
                        <div className="flex items-center p-6">
                            <BookMarked className="w-8 h-8 mr-6 text-primary"/>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold">Registro de Animales</h3>
                                <p className="text-muted-foreground text-sm">Generá el carnet de tus mascotas.</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </Link>
                </Card>

                <Card className="hover:bg-primary/5 transition-colors">
                    <Link href="#">
                        <div className="flex items-center p-6">
                            <ShieldAlert className="w-8 h-8 mr-6 text-primary"/>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold">Alerta Animal Perdido</h3>
                                <p className="text-muted-foreground text-sm">Reporta un animal perdido o encontrado.</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </Link>
                </Card>
            </div>
        </div>
    );
}
