import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { SavedChatsTrue } from "../../assets/icons";
import "./Saved.module.css";

export default function Saved() {
    return (
        <BasedNotificationSaved title="Saved Chats">
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li className="item">
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
        </BasedNotificationSaved>
    );
}
