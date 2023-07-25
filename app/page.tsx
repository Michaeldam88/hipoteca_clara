import styles from "./page.module.scss";
import Button from "@/utils/button";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Button />
      </div>
    </main>
  );
}
