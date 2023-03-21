import env from "dotenv"
env.config()

import { app } from "./app"
const PORT = process.env.PORT

//		LISTENER
app.listen(PORT, () => {
	console.log(`
	=====================================
  
	 L I S T E N  T O  P O R T ${PORT} :D
  
	=====================================
	`);
  }).on('error', (err) => {
	console.error(`Error starting server: ${err.message}`);
  });
  
  
  
  
  