import { useState } from "react";

import styles from "./Card.module.scss";

const Card = ({
  title,
  id,
  thumbnailUrl,
  albumId,
  checkboxHandler,
  itemDetailRouteHandler,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    checkboxHandler(!isChecked, id);
    setIsChecked((prevState) => !prevState);
  };

  const imageClickHandler = () => {
    itemDetailRouteHandler(title, id, thumbnailUrl, albumId, checkboxHandler);
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
          <input type="checkbox" checked={isChecked} onChange={checkHandler} />
          Check me!
        </label>
      </div>
    </div>
  );
};

export default Card;
