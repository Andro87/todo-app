import styles from "./List.module.scss";
import React, { useState } from "react";
export default function List(props) {
    const { onComplete, item } = props;
    const [check, setCheck] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div className={!open ? styles.box : styles.delete}>
            <button
                onClick={() => {
                    setCheck(check => !check);
                    onComplete(item);
                }}
                type="button"
                title="button"
                className={!check ? styles.circle : styles.circle_checked}
            >
                {check ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9"
                    >
                        <path
                            fill="none"
                            stroke="#FFF"
                            stroke-width="2"
                            d="M1 4.304L3.696 7l6-6"
                        />
                    </svg>
                ) : null}
            </button>
            <p className={!check ? styles.act : styles.cut}>{item.content}</p>

            {check ? (
                <button
                    type="button"
                    title="button"
                    onClick={() => setOpen(open => !open)}
                    className={styles.cross}
                >
                    {!open ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                        >
                            <path
                                fill="#494C6B"
                                fill-rule="evenodd"
                                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                            />
                        </svg>
                    ) : null}
                </button>
            ) : null}
        </div>
    );
}
