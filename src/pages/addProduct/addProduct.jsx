import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { BiSolidTrash } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdCheckCircleOutline } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getuser } from "../../redux/slices/authSlice";
import { Helmet } from "react-helmet";

const AddProduct = () => {
  // Changed from addProduct to AddProduct
  const [ingredientsValue, setIngredientsValue] = useState([
    { id: 1, value: "" },
  ]);
  const [directionsValue, setDirectionsValue] = useState([
    { id: 1, value: "" },
  ]);
  const [isActive, setisActive] = useState("");
  const [image, setImage] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const { t } = useTranslation();
  const {
    Rname,
    Special,
    share,
    breaks,
    lunch,
    dinner,
    enough,
    time,
    Ingredients,
    Directions,
    addingredient,
    addStep,
    saveRecipe,
    cancelRecipe,
    caloriess,
  } = t("add");
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
    setRandomNumber(randomNum);
  }, []);

  const user = useSelector(getuser);
  const [recipe, setRecipe] = useState({
    recipeName: "",
    information: "",
    typeMeals: "",
    times: "",
    EnoughFor: "",
    calories: null,
    image: null,
    ingredients: [],
    steps: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
    console.log(recipe);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      image: file,
    }));
    setImage(URL.createObjectURL(file));
  };

  const handleAddIngredient = () => {
    const newIngredient = { id: ingredientsValue.length + 1, value: "" };
    setIngredientsValue([...ingredientsValue, newIngredient]);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...ingredientsValue, newIngredient],
    }));
  };

  const handleAddDirection = () => {
    const newDirection = { id: directionsValue.length + 1, value: "" };
    setDirectionsValue([...directionsValue, newDirection]);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: [...directionsValue, newDirection],
    }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredientsValue];
    updatedIngredients[index].value = value;
    setIngredientsValue(updatedIngredients);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  const handleDirectionChange = (index, value) => {
    const updatedDirections = [...directionsValue];
    updatedDirections[index].value = value;
    setDirectionsValue(updatedDirections);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: updatedDirections,
    }));
    console.log(recipe);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredientsValue];
    updatedIngredients.splice(index, 1);
    setIngredientsValue(updatedIngredients);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  const handleRemoveDirection = (index) => {
    const updatedDirections = [...directionsValue];
    updatedDirections.splice(index, 1);
    setDirectionsValue(updatedDirections);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: updatedDirections,
    }));
  };

  const clearInputs = () => {
    setRecipe({
      recipeName: "",
      information: "",
      typeMeals: "",
      times: "",
      EnoughFor: "",
      calories: 500,
      image: null,
      ingredients: [],
      steps: [],
    });
    setImage(null);
    setIngredientsValue([{ id: 1, value: "" }]);
    setDirectionsValue([{ id: 1, value: "" }]);
    setisActive("");
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    // take the value only
    const ingredients = ingredientsValue.map((ingredient) => ingredient.value);
    const directions = directionsValue.map((direction) => direction.value);
    // add data to form
    const formData = new FormData();
    formData.append("recipeName", recipe.recipeName);
    formData.append("information", recipe.information);
    formData.append("typeMeals", recipe.typeMeals);
    formData.append("times", recipe.times);
    formData.append("EnoughFor", recipe.EnoughFor);
    formData.append("calories", recipe.calories);
    formData.append("image", recipe.image);
    formData.append("ingredients", JSON.stringify(ingredients.join(",")));
    formData.append("steps", JSON.stringify(directions.join(",")));
    try {
      const response = await axios.post(
        "https://fast-plat1.vercel.app/meals/addAnewRecipe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: user?.token,
          },
        }
      );

      console.log(response.data);
      // Handle success
      clearInputs();
    } catch (error) {
      console.error(error.response.data);
      // Handle error
    }
  };
  return (
    <div className="p-md-5 mx-md-5 my-4">
      <Helmet>
        <title>Add Meal</title>
        <meta
          name="description"
          content="making meal will all specefication & details"
        />
      </Helmet>
      <div className="row gap-3 ps-4">
        <div className=" col-12 col-lg-4 d-flex flex-column gap-4">
          <input
            className={style.add_input}
            onChange={handleInputChange}
            value={recipe.recipeName}
            name="recipeName"
            type="text"
            placeholder={`${Rname} :`}
          />
          <input
            className={style.add_input}
            onChange={handleInputChange}
            value={recipe.information}
            name="information"
            type="text"
            placeholder={`${Special} :`}
          />
          <div className="d-flex gap-4 flex-wrap">
            <button
              onClick={(e) => {
                setisActive("Breakfast");
                handleInputChange({
                  target: { name: "typeMeals", value: "Breakfast" },
                });
              }}
              className={`${style.recipe_type} ${
                isActive === "Breakfast" ? style.recipe_active : ""
              }`}
              name="Breakfast"
            >
              {breaks}
            </button>
            <button
              onClick={(e) => {
                setisActive("Lunch");
                handleInputChange({
                  target: { name: "typeMeals", value: "Lunch" },
                });
              }}
              className={`${style.recipe_type} ${
                isActive === "Lunch" ? style.recipe_active : ""
              }`}
              name="Lunch"
            >
              {lunch}
            </button>
            <button
              onClick={(e) => {
                setisActive("Dinner");
                handleInputChange({
                  target: { name: "typeMeals", value: "Dinner" },
                });
              }}
              className={`${style.recipe_type} ${
                isActive === "Dinner" ? style.recipe_active : ""
              }`}
              name="Dinner"
            >
              {dinner}
            </button>
          </div>
          <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between ">
            <p className={style.text_label}>{enough}</p>
            <input
              className={style.add_input}
              onChange={handleInputChange}
              value={recipe.EnoughFor}
              name="EnoughFor"
              type="text"
              placeholder="How Many People ?"
            />
          </div>
          <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between  ">
            <p className={style.text_label}>{time}</p>
            <input
              className={style.add_input}
              onChange={handleInputChange}
              value={recipe.times}
              name="times"
              type="text"
              placeholder="How much time?"
            />
          </div>
          <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between  ">
            <p className={style.text_label}>{caloriess}</p>
            <input
              className={style.add_input}
              onChange={handleInputChange}
              value={recipe.calories}
              name="calories"
              type="number"
              placeholder="Recipe calories"
            />
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <label htmlFor="file" className={style.custum_file_upload}>
            {image ? (
              <img
                src={image}
                alt="Selected"
                className={style.display_image}
                width={100}
                height={100}
              />
            ) : (
              <div className="d">
                <div className={style.icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="158"
                    height="158"
                    viewBox="0 0 158 158"
                    fill="none"
                  >
                    <path
                      d="M33.9609 101.446V120.257C39.7071 127.303 46.951 132.981 55.1661 136.877C63.3812 140.773 72.3613 142.79 81.4535 142.781C102.668 142.781 121.371 132.007 132.38 115.635V89.2688C128.612 114.011 107.246 132.969 81.4535 132.969C60.0917 132.969 41.7668 119.967 33.9609 101.446ZM123.304 51.4073V42.9587C123.289 41.0954 123.595 39.2434 124.207 37.4834C112.771 26.3341 97.425 20.1036 81.4535 20.1251C67.1609 20.1039 53.3133 25.0953 42.3212 34.2305L42.3457 34.5298L42.3506 34.6623V47.9091C47.1823 42.2655 53.18 37.7364 59.9306 34.6338C66.6812 31.5313 74.0241 29.9291 81.4535 29.9376C98.6941 29.9376 113.953 38.4057 123.304 51.4073Z"
                      fill="#049601"
                      fillOpacity="0.44"
                    />
                    <path
                      d="M120.703 81.4534C120.703 91.8631 116.568 101.847 109.207 109.207C101.846 116.568 91.8629 120.703 81.4531 120.703C71.0434 120.703 61.06 116.568 53.6992 109.207C46.3384 101.847 42.2031 91.8631 42.2031 81.4534C42.2031 71.0436 46.3384 61.0602 53.6992 53.6994C61.06 46.3386 71.0434 42.2034 81.4531 42.2034C91.8629 42.2034 101.846 46.3386 109.207 53.6994C116.568 61.0602 120.703 71.0436 120.703 81.4534ZM81.4531 115.797C85.9632 115.797 90.4291 114.909 94.5959 113.183C98.7627 111.457 102.549 108.927 105.738 105.738C108.927 102.549 111.457 98.7629 113.183 94.5961C114.909 90.4294 115.797 85.9634 115.797 81.4534C115.797 76.9433 114.909 72.4774 113.183 68.3106C111.457 64.1438 108.927 60.3578 105.738 57.1687C102.549 53.9796 98.7627 51.4498 94.5959 49.7239C90.4291 47.9979 85.9632 47.1096 81.4531 47.1096C72.3446 47.1096 63.6091 50.728 57.1684 57.1687C50.7277 63.6094 47.1094 72.3448 47.1094 81.4534C47.1094 90.5619 50.7277 99.2974 57.1684 105.738C63.6091 112.179 72.3446 115.797 81.4531 115.797ZM147.638 39.4559C147.638 35.0402 144.057 31.4587 139.641 31.4587C133.263 31.4587 128.161 36.6102 128.21 42.9393V70.169C128.21 76.3165 131.772 81.8213 137.286 84.3137V126.591C137.286 129.142 139.347 131.203 141.898 131.203H143.027C145.578 131.203 147.638 129.142 147.638 126.591V39.4559ZM33.9606 31.4587C33.0758 31.4587 32.2272 31.8102 31.6015 32.4358C30.9759 33.0615 30.6244 33.9101 30.6244 34.7949V47.9927C30.6244 48.974 29.8394 49.7099 28.9072 49.7099C27.9259 49.7099 27.19 48.9249 27.19 47.9927V34.9421C27.19 33.1268 25.7672 31.5077 23.9519 31.4587C22.0384 31.4096 20.4684 32.9305 20.4684 34.7949V47.9927C20.4684 48.974 19.6834 49.7099 18.7512 49.7099C17.77 49.7099 17.0341 48.9249 17.0341 47.9927V34.9421C17.0341 33.1268 15.6112 31.5077 13.7959 31.4587C11.8825 31.4096 10.3125 32.9305 10.3125 34.7949V57.2655C10.3125 61.691 12.4565 65.6405 15.7535 68.1035C18.7022 69.7667 18.7022 77.3812 18.7022 77.3812V126.542C18.7022 129.093 20.7628 131.154 23.3141 131.154H24.4425C26.9937 131.154 29.0544 129.093 29.0544 126.542V77.3812C29.0544 77.3812 29.0544 70.066 32.003 68.1035C33.6908 66.845 35.0616 65.2099 36.0062 63.3284C36.9508 61.4469 37.4431 59.3709 37.4441 57.2655V34.7949C37.3944 33.9009 37.007 33.0591 36.3604 32.4397C35.7137 31.8204 34.856 31.4697 33.9606 31.4587Z"
                      fill="#049601"
                      fillOpacity="0.44"
                    />
                  </svg>
                </div>
                <div className={style.text}>
                  <CiCamera size={36} />
                  <span>{share}</span>
                </div>
              </div>
            )}
            <input
              onChange={handleFileChange}
              name="image"
              id="file"
              type="file"
              accept="image/*"
            />
          </label>
        </div>
      </div>
      <h2 className={style.divider_title}>{Ingredients}</h2>
      <div className="row ps-4">
        <div className="col-8 d-flex flex-column gap-4">
          {ingredientsValue.map((ingredient, index) => (
            <div key={index} className="d-flex gap-3 align-items-center">
              <div className={style.count_circle}>{index + 1}</div>
              <input
                className={style.add_input}
                style={{ width: "900px" }}
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient.value}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
              <BiSolidTrash
                color="red"
                className={style.icon}
                onClick={() => handleRemoveIngredient(index)}
              />
            </div>
          ))}
          <button onClick={handleAddIngredient} className={style.add_btn}>
            <IoMdAddCircleOutline />
            {addingredient}
          </button>
        </div>
      </div>
      <h2 className={style.divider_title}>{Directions}</h2>
      <div className="row ps-4">
        <div className="col-8 d-flex flex-column gap-4">
          {directionsValue.map((direction, index) => (
            <div key={index} className="d-flex gap-3 align-items-center">
              <div className={style.count_circle}>{index + 1}</div>
              <input
                className={style.add_input}
                style={{ width: "900px" }}
                type="text"
                placeholder={`direction ${index + 1}`}
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
          <button onClick={handleAddDirection} className={style.add_btn}>
            <IoMdAddCircleOutline />
            {addStep}
          </button>
        </div>
      </div>
      <div
        className={`col-12 col-lg-7 d-flex gap-4 mt-5 justify-content-center ${style.confirm_recipe}`}
      >
        <button onClick={handleAddRecipe} className={style.confirm_btn}>
          <MdCheckCircleOutline />
          {saveRecipe}
        </button>
        <button
          onClick={clearInputs}
          className={style.confirm_btn}
          style={{ background: "red" }}
        >
          <BiSolidTrash />
          {cancelRecipe}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
