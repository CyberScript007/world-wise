import styles from "../component/Message.module.css";

function Message({ message }) {
  console.log(message);
  return (
    <div className={styles.messageContainer}>
      <p>{message}</p>
    </div>
  );
}

export default Message;
