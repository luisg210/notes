
export const getEnvVariables = () => {
    import.meta.env.BACKEND_URL;

    return {
        ...import.meta.env.BACKEND_URL
    }
} 