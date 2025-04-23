import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function useErrorHandler() {
  return (error: unknown) => {
    let message = 'Algo deu errado. Tente novamente.';

    if (error instanceof AxiosError) {
      message = error.response?.data?.message ?? message;
    }

    toast.error(message);
  };
}