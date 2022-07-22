import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "./Home.module.scss";
import Card from "../components/Card";

const URL = "https://jsonplaceholder.typicode.com/photos";

export default function Home() {
  const [data, setData] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const [itemIdx, setItemIdx] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const result = await axios.get(url);

        if (result.status !== 200) {
          throw new Error("Error while fetching titles");
        }

        setData(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    const receivedData = fetchData(URL);
  }, []);

  const checkboxHandler = (isChecked, id) => {
    // When newly checked add to list
    if (isChecked) {
      setCheckedItems([...checkedItems, id]);
      return;
    }

    //When unchecked remove from list
    const idx = checkedItems.findIndex((item) => {
      return item === id;
    });

    const tempCheckedItems = [...checkedItems];
    tempCheckedItems.splice(idx, 1);

    setCheckedItems(tempCheckedItems);
  };

  const buttonOnClickHandler = () => {
    setItemIdx((prevState) => prevState + 10);
  };

  const itemDetailRouteHandler = (
    title,
    id,
    thumbnailUrl,
    albumId,
    checkboxHandler
  ) => {
    router.push({
      pathname: "/items/" + id,
      query: {
        title,
        id,
        thumbnailUrl,
        albumId,
        checkboxHandler,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topLayout}>
        <h2>You have selected {checkedItems.length} elements</h2>
      </div>
      <div className={styles.middleLayout}>
        {data?.slice(0, itemIdx + 10).map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              id={item.id}
              thumbnailUrl={item.thumbnailUrl}
              albumId={item.albumId}
              checkboxHandler={checkboxHandler}
              itemDetailRouteHandler={itemDetailRouteHandler}
            />
          );
        })}
      </div>
      <div className={styles.bottomLayout}>
        <button onClick={buttonOnClickHandler}>Display 10 more items!</button>
      </div>
    </div>
  );
}
