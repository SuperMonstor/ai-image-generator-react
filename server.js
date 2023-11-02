const PORT = 8000;
// package imports
const express = require("express");
const cors = require("cors"); // handle requests from multiple sources
// declarations
const app = express();
// use packages within the express app
app.use(cors());
app.use(express.json());
require("dotenv").config; // to manage api keys

// Endpoint for images
app.post("/images", async (req, res) => {
	const { Configuration, OpenAIApi } = require("openai");
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const response = await openai.createImage({
		prompt: "A cute baby sea otter",
		n: 2,
		size: "1024x1024",
	});
});
// Start server and listen for HTTP requests
app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
