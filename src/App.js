import "./index.css";

function App() {
	const surpriseOptions = [
		"A cat running down a neon street in a city in the rain, cyberpunk themed",
		"A girl citting over the edge of a city skyline smoking a cigarette. Sillouhette.",
		"A pineapple sunbathing on an island",
	];
	return (
		<div className="App">
			<section className="search-section">
				<p>
					start with a detailed description
					<span className="surprise">Surprise Me</span>
				</p>
				<div className="input-container">
					<input placeholder="An impressionist oil painting of flowers in a vase"></input>
					<button>Generate</button>
				</div>
			</section>
			<section className="imageSection"></section>
		</div>
	);
}

export default App;
