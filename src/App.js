import "./index.css";
import { useState } from "react";

function App() {
	const [images, setImages] = useState(null);
	const [value, setValue] = useState(null);
	const surpriseOptions = [
		"A cat running down a neon street in a city in the rain, cyberpunk themed",
		"A girl citting over the edge of a city skyline smoking a cigarette. Sillouhette.",
		"A pineapple sunbathing on an island",
	];

	const getImages = async () => {
		try {
			const options = {
				method: "POST",
				body: JSON.stringify({
					message: value,
				}),
				headers: {
					"Content-type": "application/json",
				},
			};

			const response = await fetch(
				"http://localhost:8000/images",
				options
			);
			const data = await response.json();
			setImages(data);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const surpriseMe = () => {
		const randomValue =
			surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
		setValue(randomValue);
	};

	return (
		<div className="App">
			<section className="search-section">
				<p>
					start with a detailed description
					<span className="surprise" onClick={surpriseMe}>
						Surprise Me
					</span>
				</p>
				<div className="input-container">
					<input
						value={value}
						placeholder="An impressionist oil painting of flowers in a vase"
						onChange={(e) => setValue(e.target.value)}
					/>
					<button onClick={getImages}>Generate</button>
				</div>
			</section>
			<section className="image-section">
				{images?.map((image, _index) => (
					<img
						key={_index}
						src={image.url}
						alt={`Generated image of ${value}`}
					/>
				))}
			</section>
		</div>
	);
}

export default App;
