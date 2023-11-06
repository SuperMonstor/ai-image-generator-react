import "./index.css";
import { useState } from "react";

function App() {

  // State Management
	const [images, setImages] = useState(null);
	const [value, setValue] = useState(null);
	const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

	const surpriseOptions = [
		"A cat running down a neon street in a city in the rain, cyberpunk themed",
		"A girl citting over the edge of a city skyline smoking a cigarette. Sillouhette.",
		"A pineapple sunbathing on an island",
	];

	const getImages = async () => {
		setImages(null);
		if (value === null) {
			setError("No search term");
			return;
		}
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

  const uploadImage = async (e) => {
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setSelectedImage(e.target.files[0]);
    try {
      const options = {
        method: "POST",
        body: formData,
      }
      const response = await fetch('http://localhost:8000/upload', options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
				<p className="extra-info">
					Or,
					<span>
						<label htmlFor="files"> upload an image </label>
						<input id="files" onChange={uploadImage} accept="image/*" type="file" hidden />
					</span>
					to edit.
				</p>
				{error && <p>{error}</p>}
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
