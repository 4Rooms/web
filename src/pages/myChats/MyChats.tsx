import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { Edit } from "../../assets/icons";
import "./MyChats.module.css";

export default function MyChats() {
    return (
        <BasedNotificationSaved title="My Chats">
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
        </BasedNotificationSaved>
    );
}
