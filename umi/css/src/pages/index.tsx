import styles from './index.css';
import './index2.css'

export default function IndexPage() {
  return (
    <div>
      <h1 className={"my-button"}>全局样式</h1>
      <h1 className={styles["my-div"]}>CSS模块，类名改动样式</h1>
      <h1 className={"title"}>CSS模块，类名不改动样式</h1>
    </div>
  );
}
