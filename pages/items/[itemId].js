import { useRouter } from "next/router";

import styles from "./Item.module.scss";
import Card from "../../components/Card";

const Item = (props) => {
  const router = useRouter();

  const { itemId } = router.query;

  return (
    <div className={styles.container}>
      <Card
        title={router.query.title}
        id={router.query.id}
        thumbnailUrl={router.query.thumbnailUrl}
        albumId={router.query.albumId}
      />
    </div>
  );
};

export default Item;
