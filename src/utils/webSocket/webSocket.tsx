function extractToken(cookieString: string) {
    const pattern = /4roomToken=([^;]+)/;
    const match = cookieString.match(pattern);
    return match ? match[1] : null;
}

export const socketUrl = (room: string | undefined, chatId: string, cookieString: string) => {
    return (
        import.meta.env.VITE_WEBSOCKET_URL +
        "/ws/chat/" +
        room +
        "/" +
        chatId +
        "/" +
        "?token=" +
        extractToken(cookieString)
    );
};
