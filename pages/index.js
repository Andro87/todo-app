import Head from "next/head";
import styles from "../styles/Home.module.scss";
import React, { useState, useEffect, useRef } from "react";
import List from "../components/List";
import { genereteId } from "../utilities/genereteId";

const getData = (visible, items) => {
    if (visible === "complete") {
        return items.filter(item => item.complete);
    }
    if (visible === "incomplete") {
        return items.filter(item => !item.complete);
    }
    return items;
};

export default function Home() {
    const [light, setLight] = useState(false);

    const [visible, setVisible] = useState();

    const [items, setItems] = useState([
        {
            id: genereteId(),
            content: "Complete online JavaSript course",
            complete: false
        },
        {
            id: genereteId(),
            content: "Jog around the park 3x",
            complete: false
        },

        {
            id: genereteId(),
            content: "10 minutes meditation",
            complete: false
        },

        {
            id: genereteId(),
            content: "Read for 1 hour",
            complete: false
        },

        {
            id: genereteId(),
            content: "Pick up groceries",
            complete: false
        },

        {
            id: genereteId(),
            content: "Complete Todo App on Frontend Mentor",
            complete: false
        }
    ]);

    const data = getData(visible, items);

    const todo = useRef();

    useEffect(() => {
        if (light) {
            document.documentElement.dataset.theme = "light";
        } else {
            delete document.documentElement.dataset.theme;
        }
    }, [light]);

    return (
        <div className={styles.main_wrap}>
            <Head>
                <title>Frontend Mentor | Todo app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.header}>
                <p>TODO</p>

                <button
                    type="button"
                    title="switcher"
                    onClick={() => setLight(light => !light)}
                    className={styles.switcher}
                >
                    {!light ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                        >
                            <path
                                fill="#FFF"
                                fill-rule="evenodd"
                                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                        >
                            <path
                                fill="#FFF"
                                fill-rule="evenodd"
                                d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <div className={styles.container}>
                <div className={styles.list_wrap}>
                    <form
                        className={styles.create_box}
                        onSubmit={e => {
                            e.preventDefault();
                            setItems(items => [
                                ...items,
                                {
                                    id: genereteId(),
                                    content: todo.current.value,
                                    complete: false
                                }
                            ]);
                        }}
                    >
                        <button
                            type="submit"
                            title="submit"
                            className={styles.circle}
                        ></button>

                        <input
                            type="text"
                            title="text"
                            ref={todo}
                            placeholder="Create a new todo..."
                            className={styles.todo}
                        />
                    </form>

                    <div className={styles.list_container}>
                        <div>
                            {data.map(item => (
                                <List
                                    item={item}
                                    onComplete={i => {
                                        const newValues = items.map(done => {
                                            if (done.id === i.id) {
                                                return {
                                                    ...done,
                                                    complete: true
                                                };
                                            }
                                            return done;
                                        });
                                        setItems(newValues);
                                    }}
                                />
                            ))}
                        </div>

                        <div className={styles.info}>
                            <p>
                                {data.filter(item => !item.complete).length}{" "}
                                items left
                            </p>

                            <div className={styles.summary_desktop}>
                                <button
                                    type="button"
                                    onClick={() => setVisible(undefined)}
                                >
                                    All
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVisible("incomplete")}
                                >
                                    Active
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVisible("complete")}
                                >
                                    Completed
                                </button>
                            </div>
                            <button
                                className={styles.action}
                                type="button"
                                onClick={() => {
                                    setVisible("incomplete");
                                }}
                            >
                                Clear Completed
                            </button>
                        </div>
                    </div>

                    <div className={styles.summary_mobile}>
                        <button
                            type="button"
                            onClick={() => setVisible(undefined)}
                        >
                            All
                        </button>

                        <button
                            type="button"
                            onClick={() => setVisible("incomplete")}
                        >
                            Active
                        </button>

                        <button
                            type="button"
                            onClick={() => setVisible("complete")}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                <div className={styles.reorder}>
                    <p>Drag and drop to reorder list</p>
                </div>
            </div>
        </div>
    );
}
