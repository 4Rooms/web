import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { SavedChatsTrue } from "../../assets/icons";
import "./Saved.module.css";

export default function Saved() {
    return (
        <BasedNotificationSaved title="Saved Chats">
            <li>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
        </BasedNotificationSaved>
    );
}
