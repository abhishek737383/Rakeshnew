import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../api/auth';
import '../styles/UserProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons

const UserProfile = () => {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUserProfile = async () => {
        const token = user?.token;

        try {
            const profile = await getUserProfile(token);
            setUserProfile(profile);
        } catch (err) {
            console.error('Error fetching user profile:', err);
            setError('Failed to fetch user profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserProfile();
        } else {
            setLoading(false);
            setError('No user is logged in.');
        }
    }, [user]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="user-profile">
            <h2 className="user-profile__title">User Profile</h2>
            {userProfile ? (
                <div className="user-profile__info">
                    <div className="user-profile__item">
                        <FontAwesomeIcon icon={faUser} className="icon" /> {/* User icon */}
                        <strong>Name:</strong> {userProfile.name}
                    </div>
                    <div className="user-profile__item">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" /> {/* Email icon */}
                        <strong>Email:</strong> {userProfile.email}
                    </div>
                    <div className="user-profile__item">
                        <FontAwesomeIcon icon={faPhone} className="icon" /> {/* Phone icon */}
                        <strong>Phone:</strong> {userProfile.phone}
                    </div>
                </div>
            ) : (
                <div>No profile data available.</div>
            )}
        </div>
    );
};

export default UserProfile;
