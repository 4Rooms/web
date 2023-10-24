export function getInitialCookieConsent() {
    const savedConsent = localStorage.getItem('cookie-consent');
    return savedConsent ? JSON.parse(savedConsent) : false;
}

export function updateCookieConsent(consent: boolean) {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
}
