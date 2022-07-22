import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Home.module.scss";
import Card from "../components/Card";
import { itemsActions } from "../store/itemsSlice";

const URL = "https://jsonplaceholder.typicode.com/photos";

export default function Home() {
  const [data, setData] = useState();
  const [itemIdx, setItemIdx] = useState(0);

  const router = useRouter();

  const itemsState = useSelector((state) => state.items);
  const dispatch = useDispatch();

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

    fetchData(URL);
  }, []);

  // const checkboxHandler = (isChecked, id) => {
  //   // When newly checked add to list
  //   if (isChecked) {
  //     dispatch(itemsActions.add({ isChecked: isChecked, id: id }));
  //     return;
  //   }

  //   dispatch(itemsActions.remove({ isChecked: isChecked, id: id }));
  // };

  const buttonOnClickHandler = () => {
    setItemIdx((prevState) => prevState + 10);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topLayout}>
        <h2>You have selected {itemsState.items.length} elements</h2>
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
