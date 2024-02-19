import React, { FC, useState } from "react";
import { CardType } from "../../types";
import scss from "./CardForm.module.scss";
interface TodoInputProps {
	postData: (newCar: CardType) => void;
	deleteAllCard: (newCar: CardType) => void;
	toggleAllCard: (newCar: CardType) => void;
}
const CardForm: FC<TodoInputProps> = ({
	postData,
	deleteAllCard,
	toggleAllCard,
}) => {
	const [name, setName] = useState("");
	const [img, setImg] = useState("");
	const [price, setPrice] = useState<number>(0);
	const [description, setDescription] = useState("");
	// const [nextId, setNextId] = useState<number>(1);
	// ----------------------------------------------------------

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newCar: CardType = {
			name,
			img,
			price,
			description,
			// _id: nextId,
			completed: false,
			_id: Math.random() + 1,
		};
		postData(newCar as CardType);
		setName("");
		setImg("");
		setPrice(0);
		setDescription("");
		// setNextId((prevId) => prevId + 1);
	};
	// ----------------------------------------------------------
	return (
		<div className={scss.formContainer}>
			<form onSubmit={handleSubmit} className={scss.form}>
				{/* ====================================================== */}

				<div>
					<label htmlFor="img">Image:</label>
					<input
						type="url"
						id="img"
						placeholder="url"
						value={img}
						onChange={(e) => setImg(e.target.value)}
					/>
				</div>

				{/* ====================================================== */}

				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						placeholder="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				{/* ====================================================== */}

				<div>
					<label htmlFor="price">Price: </label>
					<input
						type="number"
						id="price"
						placeholder="price"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
					/>
				</div>

				{/* ====================================================== */}

				<div>
					<label htmlFor="description">Description:</label>
					<input
						type="text"
						id="description"
						placeholder="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				{/* ====================================================== */}

				<button type="submit">Add Car</button>
			</form>
			<div className={scss.buttons}>
				<button
					onClick={(event) => deleteAllCard(event as unknown as CardType)}>
					Delete All Card
				</button>
				<button
					onClick={(event) => toggleAllCard(event as unknown as CardType)}>
					Toglle All Card
				</button>
			</div>
		</div>
	);
};

export default CardForm;
