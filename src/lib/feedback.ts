import { isAxiosError } from "axios";

type MessageResponseData = {
  error?: {
    message?: string;
  };
  message?: string;
};

export function getErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
) {
  if (isAxiosError<MessageResponseData>(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      fallbackMessage
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
