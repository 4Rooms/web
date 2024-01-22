import React from "react";
import styles from "./PanelGroups.module.scss";
import FilterGroup from "./FilterGroup/FilterGroup";
import Groups from "./Groups/Groups";
import CreateChat from "./CreateChat/CreateChat";

interface ProfileContextType {
    isSmallScreen?: boolean;
}


export default function PanelGroups({ isSmallScreen }: ProfileContextType) {
    return (
        <div className={styles.container__chatGroups}>
            <FilterGroup isSmallScreen={isSmallScreen} />
            <Groups />
            <CreateChat />
        </div>
    );
}
