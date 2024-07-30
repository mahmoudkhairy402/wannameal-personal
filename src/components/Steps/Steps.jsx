import React, { useState } from "react";
import style from "./page.module.css";
import { BiSolidTrash } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdCheckCircleOutline } from "react-icons/md";
function AddSteps({ placeholder, btnValue, onAdd, clearInputs }) {
    const [ingredients, setIngredients] = useState([{ id: 1, value: "" }]);
    const [directions, setDirections] = useState([{ id: 1, value: "" }]);

    const handleAddIngredient = () => {
        const newIngredient = { id: ingredients.length + 1, value: "" };
        setIngredients([...ingredients, newIngredient]);
    };

    const handleAddDirection = () => {
        const newDirection = { id: directions.length + 1, value: "" };
        setDirections([...directions, newDirection]);
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].value = value;
        setIngredients(updatedIngredients);
    };

    const handleDirectionChange = (index, value) => {
        const updatedDirections = [...directions];
        updatedDirections[index].value = value;
        setDirections(updatedDirections);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const handleRemoveDirection = (index) => {
        const updatedDirections = [...directions];
        updatedDirections.splice(index, 1);
        setDirections(updatedDirections);
    };

    const handleAddItems = () => {
        onAdd({
            ingredients: ingredients.map((ingredient) => ingredient.value),
            directions: directions.map((direction) => direction.value),
        });
    };
    // clear inputs 
    const handleClearInputs = () => {
        clearInputs(); // Invoke the clearInputs function
    };
    return (
        <div className="row ps-4">
            <div className="col-8 d-flex flex-column gap-4">
                {placeholder === "Ingredients"
                    ? ingredients.map((ingredient, index) => (
                        <div
                            key={ingredient.id}
                            className="d-flex gap-3 align-items-center"
                        >
                            <div className={style.count_circle}>{index + 1}</div>
                            <input
                                className={style.add_input}
                                style={{ width: "900px" }}
                                type="text"
                                placeholder={`Ingredient ${index + 1}`}
                                value={ingredient.value}
                                onChange={(e) =>
                                    handleIngredientChange(index, e.target.value)
                                }
                            />
                            <BiSolidTrash
                                color="red"
                                className={style.icon}
                                onClick={() => handleRemoveIngredient(index)}
                            />
                        </div>
                    ))
                    : directions.map((direction, index) => (
                        <div
                            key={direction.id}
                            className="d-flex gap-3 align-items-center"
                        >
                            <div className={style.count_circle}>{index + 1}</div>
                            <input
                                className={style.add_input}
                                style={{ width: "900px" }}
                                type="text"
                                placeholder={`Direction ${index + 1}`}
                                value={direction.value}
                                onChange={(e) => handleDirectionChange(index, e.target.value)}
                            />
                            <BiSolidTrash
                                color="red"
                                className={style.icon}
                                onClick={() => handleRemoveDirection(index)}
                            />
                        </div>
                    ))}
                <div className="d-flex flex-column flex-md-row gap-5">
                    <button
                        onClick={
                            placeholder === "Ingredients"
                                ? handleAddIngredient
                                : handleAddDirection
                        }
                        className={style.add_btn}
                    >
                        <IoMdAddCircleOutline className={style.icon} />
                        {btnValue}
                    </button>
                    <button onClick={handleAddItems} className={style.add_btn}>
                        <MdCheckCircleOutline className={style.icon} />
                        confirm
                    </button>

                </div>
            </div>
        </div>
    );
}

export default AddSteps;
