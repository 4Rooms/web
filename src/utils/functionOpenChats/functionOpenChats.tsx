type OpenSectionType = {
    [key: string]: boolean;
};

export let openSection: OpenSectionType = {
    cinema: false,
    books: false,
    games: false,
    music: false,
};

export const updatedState = (option?: string) => {
    const falseOptions = Object.keys(openSection).reduce(
        (acc: OpenSectionType, key) => {
            acc[key] = false;
            return acc;
        },
        {}
    );

    if (window.location.search.split("=")[1] && option === "root") {
        openSection = falseOptions;
        window.history.pushState({}, "", `${window.location.pathname}`);
    } 

    if (option && !openSection[option] && option !== "root") {
        const query = `room=${option}`;
        window.history.pushState(
            {},
            "",
            `${window.location.pathname}?${query}`
        );
    } else if (option && openSection[option] &&  option !== "root" ) {
        window.history.pushState({}, "", `${window.location.pathname}`);
    }
    if (option !== "root" && option) {
        console.log(window.location.search.split("=")[1])
        openSection = {
            ...falseOptions,
            [option]: !openSection[option],
        };
    }
};
