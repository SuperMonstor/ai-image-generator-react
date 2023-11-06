import { useState, useRef } from "react";

const Modal = ({
	setModalOpen,
	setSelectedImage,
	selectedImage,
	generateVariations,
}) => {
	const [error, setError] = useState(null);
	const ref = useRef(null);

	console.log("selectedImage", selectedImage);

	const closeModal = () => {
		setModalOpen(false);
		setSelectedImage(null);
	};

	const checkSize = () => {
		if (ref.current.width == 256 && ref.current.height == 256) {
			generateVariations();
		} else {
			setError("Error: Choose 256 x 256 image");
		}
	};

	return (
		<div className="modal">
			<div className="close-button" onClick={closeModal}>
				ⓧ
			</div>
			<div className="img-container">
				{selectedImage && (
					<img
						ref={ref}
						src={URL.createObjectURL(selectedImage)}
						alt="uploadedImage"
					/>
				)}
			</div>
			<p>{error || "** image must be 256 x 256 **"}</p>
			{!error && <button onClick={checkSize}>Generate</button>}
			{error && <button onClick={closeModal}>Generate</button>}
		</div>
	);
};

export default Modal;
