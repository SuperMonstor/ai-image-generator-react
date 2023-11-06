const PORT = 8000;
// package imports
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors"); // handle requests from multiple sources
const fs = require("fs"); // File system related functionality
const multer = require("multer"); // for file uploads

// declarations
const app = express();
// use packages within the express app
app.use(cors());
app.use(express.json());

require("dotenv").config(); // to manage api keys

// Open AI Package init
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// store filePath
let filePath;

// For file uploads
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		// where to store on the server
		callback(null, "public/images"); // parameters: error, folder name
	},
	filename: (req, file, callback) => {
		console.log("file" + file);
		callback(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage }).single("file");

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

// Handle uploading of files
app.post("/upload", (req, res) => {
	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		filePath = req.file.path;
	});
});

app.post("/generate-variations", async (req, res) => {
	try {
		const response = await openai.images.createVariation({
			image: fs.createReadStream(filePath),
			n: 5,
			size: "1024x1024",
		});
		res.send(response.data);
	} catch (error) {
		console.error(error);
	}
});

// Start server and listen for HTTP requests
app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
