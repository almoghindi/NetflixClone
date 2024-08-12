
export const corsConfiguration = () => {
    return {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
};