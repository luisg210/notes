export const getEnvVariable = () => {
    const vars = import.meta.env.VITE_BACKEND_URL as string;
    return vars;
} 