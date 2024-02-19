import { FC, useEffect, useState } from "react";
import { CardType } from "../../types";
import axios from "axios";
import scss from "./Card.module.scss";
import CardForm from "../cardForm/CardForm";
import CardItem from "../cardItem/CardItem";

const url =
	"https://api.elchocrud.pro/api/v1/573c7f0efec1cfc013edbc8503b2fa57/datacars";
// console.log(url);

const Card: FC = () => {
	const [cars, setCars] = useState<CardType[]>([]);

	const getData = async () => {
		try {
			const response = (await axios.get(url)).data;
			setCars(response);

			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};
	// ========================================================================

	const postData = async (newCar: CardType) => {
		try {
			const response = await axios.post<CardType>(url, newCar);
			setCars([...cars, response.data]);
			getData();
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	// ========================================================================

	const deleteCard = async (id: number) => {
		try {
			await axios.delete(`${url}/${id}`);

			setCars(cars.filter((item) => item._id === id));
			getData();
			console.log(id);
		} catch (error) {
			console.error(error);
		}
	};
	// ========================================================================

	const toggleCard = async (id: number) => {
		const updateCard = cars.map((item) =>
			item._id === id ? { ...item, completed: !item.completed } : item
		);
		setCars(updateCard);
		console.log(updateCard);

		try {
			await axios.patch(`${url}/${id}`, {
				completed: updateCard.find((item) => item._id === id)?.completed,
			});
		} catch (error) {
			console.error(error);
		}
	};
	// ========================================================================

	const toggleAllCard = async () => {
		const allCompleted = cars.every((item) => item.completed);
		console.log(allCompleted);

		const updateCard = cars.map((item) => ({
			...item,
			completed: !allCompleted,
		}));
		setCars(updateCard);
		console.log(updateCard);

		try {
			await axios.patch(`${url}`, {
				completed: !allCompleted,
			});
		} catch (error) {
			console.error(error);
		}
	};
	// ========================================================================

	const deleteAllCard = async () => {
		try {
			await axios.delete(url);
			setCars([]);
		} catch (error) {
			console.error(error);
		}
	};
	// ========================================================================

	useEffect(() => {
		getData();
	}, []);
	// ========================================================================
	return (
		<div>
			<CardForm
				postData={(newCar: CardType) => postData(newCar as CardType)}
				deleteAllCard={deleteAllCard}
				toggleAllCard={toggleAllCard}
			/>

			<ul className={scss.ulList}>
				{cars.map((item, index) => (
					<CardItem
						key={index}
						item={item as CardType}
						deleteCard={deleteCard}
						toggleCard={toggleCard}
					/>
				))}
			</ul>
		</div>
	);
};

export default Card;
