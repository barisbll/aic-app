import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import styles from "./Card.module.scss";
import { itemsActions } from "../store/itemsSlice";

const Card = ({ title, id, thumbnailUrl, albumId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const itemsState = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    itemsState.items.forEach((item) => {
      if (item.toString() === id.toString()) {
        setIsChecked(true);
      }
    });
  }, []);

  const checkboxHandler = () => {
    // When newly checked add to list
    if (!isChecked) {
      dispatch(itemsActions.add({ isChecked: !isChecked, id: id }));
      setIsChecked((prevState) => !prevState);
      return;
    }

    dispatch(itemsActions.remove({ isChecked: !isChecked, id: id }));
    setIsChecked((prevState) => !prevState);
  };

  const imageClickHandler = () => {
    router.push({
      pathname: "/items/" + id,
      query: { title, id, thumbnailUrl, albumId },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={thumbnailUrl} alt="Thumbnail" onClick={imageClickHandler} />
      </div>
      <div className={styles.titleContainer}>
        <h2>{title}</h2>
      </div>
      <div className={styles.checkBoxContainer}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={checkboxHandler}
          />
          Check me!
        </label>
      </div>
    </div>
  );
};

export default Card;
