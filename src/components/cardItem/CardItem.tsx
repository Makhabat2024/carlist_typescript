import { FC } from "react";
import { CardType } from "../../types";
import scss from "./CardItem.module.scss";
interface CardItemProps {
	item: CardType;
	deleteCard: (id: number) => void;
	toggleCard: (id: number) => void;
}
const CardItem: FC<CardItemProps> = ({ item, deleteCard, toggleCard }) => {
	return (
		<li className={scss.CardItem} key={item._id}>
			<img
				src={item.img}
				alt="avto"
				className={`${scss.carImage} ${item.completed ? scss.completed : ""}`}
			/>
		<div className={`${scss.carInfo} ${item.completed ? scss.completed : ""}`}>
				<h3>
					<span>Name:</span> {item.name}
				</h3>
				<h4>
					<span>Price:</span> {item.price}
				</h4>
				<p>
					<span>Description:</span> {item.description}
				</p>
				<div className={scss.buttons}>
					<button onClick={() => deleteCard(item._id)}>delete</button>
					<button onClick={() => toggleCard(item._id)}>
						{item.completed ? "uncompleted" : "completed"}
					</button>
				</div>
			</div>
		</li>
	);
};

export default CardItem;
