const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
};

const Talkify_token= "Talkify-token";


export {corsOption, Talkify_token};
