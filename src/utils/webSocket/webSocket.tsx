function extractToken(cookieString: string) {
    const pattern = /4roomToken=([^;]+)/;
    const match = cookieString.match(pattern);
    return match ? match[1] : null;
}

export const socketUrl = (room: string | undefined, chatId: string, cookieString: string) => {
    return (
        "wss:" +
        "//back.4rooms.pro" +
        "/ws/chat/" +
        room +
        "/" +
        chatId +
        "/" +
        "?token=" +
        extractToken(cookieString)
    );
};
