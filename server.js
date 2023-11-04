const PORT = 8000;
// package imports
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors"); // handle requests from multiple sources
// declarations
const app = express();
// use packages within the express app
app.use(cors());
app.use(express.json());
require("dotenv").config(); // to manage api keys

// Open AI Package init
// const configuration = new Configuration({
// 	apiKey: process.env.OPENAI_API_KEY,
// });
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Endpoint for images
app.post("/images", async (req, res) => {
	try {
		const response = await openai.images.generate({
			prompt: req.body.message,
			n: 5,
			size: "1024x1024",
		});
		console.log(response.data);
		res.send(response.data);
	} catch (error) {
		console.error(error);
	}
});
// Start server and listen for HTTP requests
app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
