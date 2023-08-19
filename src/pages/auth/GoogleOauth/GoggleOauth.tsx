import { GoogleLogin } from '@react-oauth/google';
import React from 'react';

export default function GoogleOauth() {
    return <GoogleLogin
        onSuccess={credentialResponse => {
            console.log('send data to backend to login', credentialResponse.credential);
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
    />;
}
