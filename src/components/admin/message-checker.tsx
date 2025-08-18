
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { checkRelevanceAction } from "@/app/(dashboard)/admin/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Info, XCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Verificando..." : "Verificar Mensaje"}
    </Button>
  );
}

export function MessageChecker() {
  const initialState = {
    message: null,
    error: null,
  };
  const [state, dispatch] = useFormState(checkRelevanceAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verificador de Mensajes IA</CardTitle>
        <CardDescription>
          Analiza si un mensaje se relaciona con servicios municipales antes de enviarlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje a verificar</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Ej: 'Mañana no habrá recolección de residuos en la zona céntrica...'"
              rows={4}
            />
             {state?.error && <p className="text-sm font-medium text-destructive">{state.error}</p>}
          </div>
          <SubmitButton />
        </form>

        {state?.reason && (
          <Alert className="mt-4" variant={state.isRelevant ? "default" : "destructive"}>
            {state.isRelevant ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>
              {state.isRelevant ? "Mensaje Relevante" : "Mensaje No Relevante"}
            </AlertTitle>
            <AlertDescription>
                {state.reason}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
