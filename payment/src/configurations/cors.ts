export const corsConfiguration = () => {
  return {
    origin: ["http://localhost:5173"],
    credentials: true, //access-control-allow-credentials:true
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
};
