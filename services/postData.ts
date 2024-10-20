import { API_URL } from "@/utils/constant/constant";
import { TAddMylearning } from "@/utils/schemas/myLearnign";

export const addMyLearning = async (data: TAddMylearning) => {
  try {
    const res = await fetch(`${API_URL}/usercourse/addlearning`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to add to cart");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const removeMyLearning = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/usercourse/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to delete cart item");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("gagal apus pokok e");
  }
};
