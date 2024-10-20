import { API_URL } from "@/utils/constant/constant";

export const getAllProduct = async (page: number) => {
  try {
    const res = await fetch(
      `${API_URL}/course/allCourse?page=${page}&limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getProductId = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/course/allCourse/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getMyLearning = async () => {
  try {
    const res = await fetch(`${API_URL}/usercourse/mylearning`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
