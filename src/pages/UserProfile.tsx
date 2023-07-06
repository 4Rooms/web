import { useState } from 'react';
import styles from './UserProfile.module.scss';

export default function UserProfile() {
    const [user, setUser] = useState({
        username: 'Test User',
        email: 'test@gmail.com',
    });
    const [isEditing, setIsEditing] = useState(true);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(name, value);
        setUser({...user, [name]: value});
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.alert('Profile saved!');
        setIsEditing(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                Name:
                {isEditing ? <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}/> :
                    <span>{user.username}</span>}
            </label>
            <label>
                Email:
                {isEditing ?
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}/> :
                    <span>{user.email}</span>}
            </label>
            <div className={styles.actionContainer}>
                {isEditing &&
                    <>
                        <button type="submit">
                            Save Profile
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                }
                {!isEditing && <button style={{width: 'fit-content'}} type="button"
                                       onClick={() => setIsEditing(true)}>Edit</button>}
            </div>
        </form>
    );
}
