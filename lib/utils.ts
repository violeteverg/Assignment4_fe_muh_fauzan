/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getScheduleDetails = (dateString: any) => {
  const date = new Date(dateString);
  const options: any = { weekday: "long" };
  const dayName = date.toLocaleDateString("id-ID", options);
  const timeOptions: any = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const time = date.toLocaleTimeString("id-ID", timeOptions);
  return { dayName, time };
};

export function formatPrice(
  price: number | string,
  option: {
    currency?: "USD" | "IDR" | "JPY" | "CN";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "IDR", notation = "standard" } = option;

  const numericPrice = typeof price === "string" ? parseInt(price) : price;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
