import { useState } from "react";

const Modal = ({ setModalOpen, setSelectedImage, selectedImage }) => {
	const [error, setError] = useState(null);

	console.log("selectedImage", selectedImage);
	const closeModal = () => {
		setModalOpen(false);
		setSelectedImage(null);
	};

	return (
		<div className="modal">
			<div className="close-button" onClick={closeModal}>
				ⓧ
			</div>
			<div className="img-container">
				{selectedImage && (
					<img
						src={URL.createObjectURL(selectedImage)}
						alt="uploadedImage"
					/>
				)}
			</div>
			<button>Generate</button>
		</div>
	);
};

export default Modal;
