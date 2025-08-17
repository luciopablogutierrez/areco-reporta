"use server";

import { checkMessageRelevanceFlow } from "@/ai/flows/checkMessageRelevance";
import { z } from "zod";

const schema = z.object({
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

type State = {
  isRelevant?: boolean;
  reason?: string;
  error?: string | null;
  message?: string | null;
};

export async function checkRelevance(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.message?.[0]
    };
  }

  try {
    const result = await checkMessageRelevanceFlow.run({
      message: validatedFields.data.message,
    });
    return {
      isRelevant: result.isRelevant,
      reason: result.reason,
      error: null,
      message: "Análisis completado.",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Error al procesar el mensaje con la IA.",
    };
  }
}
