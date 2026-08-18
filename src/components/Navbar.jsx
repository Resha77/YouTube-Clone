import React, { useState } from 'react';
import youtubeLogo from '../assets/youtube-logo-icon.webp';
import resha from '../assets/subscriptions/ReshaKoju.jpg';


export default function Navbar({ onToggleSidebar }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
    };

    return (
        <header style={styles.navbar}>
            {/* Left Section: Menu Toggle and Logo */}
            <div style={styles.leftSection}>
                <button onClick={onToggleSidebar} style={styles.iconButton} aria-label="Toggle Sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={styles.menuIcon}>
                        <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
                    </svg>
                </button>
                <div style={styles.logo}>
                    <img src={youtubeLogo} alt="YouTube Logo" style={styles.logoImage} />
                </div>
            </div>

            {/* Middle Section: Search Bar */}
            <form onSubmit={handleSearch} style={styles.centerSection}>
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.searchButton} aria-label="Search">
                        <svg viewBox="0 0 24 24" style={styles.icon}>
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </button>
                </div>
            </form>

            {/* Right Section: Actions & Profile */}
            <div style={styles.rightSection}>
                <button style={styles.iconButton} aria-label="Create">
                    <svg viewBox="0 0 24 24" style={styles.icon}>
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
                    </svg>
                </button>
                <button style={styles.iconButton} aria-label="Notifications">
                    <svg viewBox="0 0 24 24" style={styles.icon}>
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                </button>
                <div style={styles.avatar}>
                    <img src={resha} alt="Profile" style={styles.avatarImage} />
                </div>

            </div>
        </header>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '56px',
        backgroundColor: '#0f0f0f',
        color: '#ffffff',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxSizing: 'border-box',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    logoImage: {
        height: '100px',
        objectFit: 'contain',
    },
    centerSection: {
        display: 'flex',
        alignItems: 'center',
        flex: '0 1 728px',
        margin: '0 70px',
    },
    searchContainer: {
        display: 'flex',
        width: '100%',
        height: '40px',
    },
    searchInput: {
        width: '100%',
        backgroundColor: '#121212',
        border: '1px solid #303030',
        borderRadius: '40px 0 0 40px',
        padding: '0 16px',
        color: '#ffffff',
        fontSize: '16px',
        outline: 'none',
    },
    searchButton: {
        width: '64px',
        backgroundColor: '#222222',
        border: '1px solid #303030',
        borderLeft: 'none',
        borderRadius: '0 40px 40px 0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    iconButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIcon: {
        width: '18px',
        height: '18px',
        fill: 'currentColor',
    },
    icon: {
        width: '24px',
        height: '24px',
        fill: 'currentColor',
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#535353',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        borderRadius: '50%',
    },
};