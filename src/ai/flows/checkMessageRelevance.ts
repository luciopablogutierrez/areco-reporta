import {defineFlow} from 'genkit';
import {z} from 'zod';
import {ai} from '../genkit';

export const checkMessageRelevanceFlow = defineFlow(
  {
    name: 'checkMessageRelevanceFlow',
    inputSchema: z.object({message: z.string()}),
    outputSchema: z.object({
      isRelevant: z.boolean(),
      reason: z.string(),
    }),
  },
  async ({message}) => {
    try {
      const prompt = `
        Evaluate if the following message is related to municipal services like trash collection, street lights, road repairs, public parks, etc.
        Message: "${message}"
        Respond with a JSON object with two keys: "isRelevant" (boolean) and "reason" (a brief explanation in Spanish).
      `;

      const llmResponse = await ai.generate({
        prompt,
        model: 'googleai/gemini-2.0-flash',
        config: {
          temperature: 0.1,
        },
        output: {
          format: 'json',
          schema: z.object({
            isRelevant: z.boolean(),
            reason: z.string(),
          }),
        },
      });

      const output = llmResponse.output();
      if (output) {
        return output;
      }
    } catch (error) {
      console.error('Error in AI flow:', error);
    }
    return {isRelevant: false, reason: 'No se pudo determinar la relevancia.'};
  }
);
