const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const aiService = {
  async chatWithAI(message: string) {
    try {
      const response = await fetch(`${BASE_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get AI response");
      }

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          data: result.data.aiResponse,
        };
      }

      throw new Error("API success flag is false");
    } catch (error: any) {
      console.error("AI Service Error:", error.message);
      return {
        success: false,
        error: error.message || "Something went wrong",
      };
    }
  },
};
