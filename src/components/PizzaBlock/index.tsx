import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addItems,
  CartItemType,
  selectCartItemById,
} from "../../redux/slices/cartSlice";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const cartItem = useSelector(selectCartItemById(id));

  const itemCount = cartItem ? cartItem.count : 0;

  const typeNames = ["тонкое", "традиционное"];

  const dispatch = useDispatch();

  const handleAddPizza = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      type: typeNames[activeType],
      size: sizes[activeSize],
      image: imageUrl,
      count: 0,
      idx: 0,
    };

    dispatch(addItems(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={"/pizzaPage/" + id}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => {
              return (
                <li
                  key={typeId}
                  onClick={() => setActiveType(typeId)}
                  className={activeType === typeId ? "active" : ""}
                >
                  {typeNames[typeId]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? "active" : ""}
                >
                  {size} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={handleAddPizza}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {itemCount > 0 && <i>{itemCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
