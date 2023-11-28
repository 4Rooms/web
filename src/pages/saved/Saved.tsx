import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { Edit } from "../../assets/icons";
import "./Saved.module.css";

export default function Saved() {
    return (
        <BasedNotificationSaved>
            <li>
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
        </BasedNotificationSaved>
    );
}
