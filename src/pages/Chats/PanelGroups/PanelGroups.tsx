import React from "react";
import styles from "./PanelGroups.module.css";
import FilterGroup from "./FilterGroup/FilterGroup";
import Groups from "./Groups/Groups";
import CreateChat from "./CreateChat/CreateChat";

export default function PanelGroups() {
    return (
        <div className={styles.container__chatGroups}>
            <FilterGroup />
            <Groups />
            <CreateChat />
        </div>
    );
}
