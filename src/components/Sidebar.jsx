import React, { useState, useEffect } from 'react';
import reshaKoju from '../../public/subscriptions/ReshaKoju.jpg';
import jerry from '../../public/subscriptions/Jerry.jpg';
import sanyam from '../../public/subscriptions/Sanyam.jpg';

// Demo subscription list used until real data is connected.
// This simulates users/channels that appear in the sidebar.
const mockData = [
    { id: 1, name: 'Resha Koju', image: reshaKoju },
    { id: 2, name: 'Jerry', image: jerry },
    { id: 3, name: 'Resha Doe', image: reshaKoju },
    { id: 4, name: 'Jerry Smith', image: jerry },
    { id: 5, name: 'Jerry Doe', image: reshaKoju },
    { id: 6, name: 'Sanyam', image: sanyam },
    {id: 7, name: 'Sanyam Doe', image: sanyam},
    {id: 8, name: 'Sanyam Smith', image: sanyam},
    {id: 9, name: 'Resha Smith', image: reshaKoju},
    {id: 10, name: 'Jerry Koju', image: jerry},

];

// Sidebar component
// It receives isCollapsed from App.jsx and decides whether to show a full or compact layout.
export default function Sidebar({ isCollapsed, onNavigate }) {
    /* isCollapsed is a boolean prop that determines whether the sidebar is collapsed or expanded.
       The prop is passed down from the parent component (App.jsx).
    */

    // subscriptions stores the list of channels shown in the "Subscriptions" section.
    const [subscriptions, setSubscriptions] = useState([]);

    // Simulate loading data once when the component mounts.
    useEffect(() => {
        setSubscriptions(mockData);
    }, []);

    // Top navigation items shown in the sidebar.
    // Each item contains an icon and a label like Home, Shorts, and Subscriptions.
    const mainNav = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}
                >
                    <path d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z" />
                </svg>
            ),
            label: 'Home',
            onClick: () => onNavigate('home'),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                    <path d="M512.1 116.3C486.7 68.5 426.9 50.2 378.6 75.3L166.9 186.5C118.6 211.7 100.1 270.8 125.5 318.6C142.6 350.7 175.2 369.5 209.4 370.8L169.7 391.7C121.4 416.8 102.8 476 128.2 523.8C153.6 571.6 213.4 589.9 261.7 564.8L473.5 453.5C521.8 428.3 540.3 369.2 514.9 321.4C497.8 289.3 465.2 270.5 431 269.2L470.7 248.3C519 223.2 537.5 164 512.1 116.3zM392.5 320.3L264.3 399L264.3 241.1L392.5 320.2z" /></svg>
            ), label: 'Shorts'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                    <path d="M296.5 69.2C311.4 62.3 328.6 62.3 343.5 69.2L562.1 170.2C570.6 174.1 576 182.6 576 192C576 201.4 570.6 209.9 562.1 213.8L343.5 314.8C328.6 321.7 311.4 321.7 296.5 314.8L77.9 213.8C69.4 209.8 64 201.3 64 192C64 182.7 69.4 174.1 77.9 170.2L296.5 69.2zM112.1 282.4L276.4 358.3C304.1 371.1 336 371.1 363.7 358.3L528 282.4L562.1 298.2C570.6 302.1 576 310.6 576 320C576 329.4 570.6 337.9 562.1 341.8L343.5 442.8C328.6 449.7 311.4 449.7 296.5 442.8L77.9 341.8C69.4 337.8 64 329.3 64 320C64 310.7 69.4 302.1 77.9 298.2L112 282.4zM77.9 426.2L112 410.4L276.3 486.3C304 499.1 335.9 499.1 363.6 486.3L527.9 410.4L562 426.2C570.5 430.1 575.9 438.6 575.9 448C575.9 457.4 570.5 465.9 562 469.8L343.4 570.8C328.5 577.7 311.3 577.7 296.4 570.8L77.9 469.8C69.4 465.8 64 457.3 64 448C64 438.7 69.4 430.1 77.9 426.2z" /></svg>
            ), label: 'Subscriptions'
        },
    ];

    // Secondary menu items for your account and video library.
    const secondaryNav = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                    <path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z" /></svg>
            ), label: 'History',
            onClick: () => onNavigate('history'),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                    <path d="M467.8 98.4C479.8 93.4 493.5 96.2 502.7 105.3L566.7 169.3C572.7 175.3 576.1 183.4 576.1 191.9C576.1 200.4 572.7 208.5 566.7 214.5L502.7 278.5C493.5 287.7 479.8 290.4 467.8 285.4C455.8 280.4 448 268.9 448 256L448 224L416 224C405.9 224 396.4 228.7 390.4 236.8L358 280L318 226.7L339.2 198.4C357.3 174.2 385.8 160 416 160L448 160L448 128C448 115.1 455.8 103.4 467.8 98.4zM218 360L258 413.3L236.8 441.6C218.7 465.8 190.2 480 160 480L96 480C78.3 480 64 465.7 64 448C64 430.3 78.3 416 96 416L160 416C170.1 416 179.6 411.3 185.6 403.2L218 360zM502.6 534.6C493.4 543.8 479.7 546.5 467.7 541.5C455.7 536.5 448 524.9 448 512L448 480L416 480C385.8 480 357.3 465.8 339.2 441.6L185.6 236.8C179.6 228.7 170.1 224 160 224L96 224C78.3 224 64 209.7 64 192C64 174.3 78.3 160 96 160L160 160C190.2 160 218.7 174.2 236.8 198.4L390.4 403.2C396.4 411.3 405.9 416 416 416L448 416L448 384C448 371.1 455.8 359.4 467.8 354.4C479.8 349.4 493.5 352.2 502.7 361.3L566.7 425.3C572.7 431.3 576.1 439.4 576.1 447.9C576.1 456.4 572.7 464.5 566.7 470.5L502.7 534.5z" /></svg>
            ), label: 'Playlists'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                    <path d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z" /></svg>
            ), label: 'Your Videos'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                    <path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z" /></svg>
            ), label: 'Watch Later'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                    <path d="M235.5 102.8C256.3 68 300.5 54 338 71.6L345.2 75.4C380 96.3 394 140.5 376.4 178L376.4 178L362.3 208L472 208L479.4 208.4C515.7 212.1 544 242.8 544 280C544 293.2 540.4 305.4 534.2 316C540.3 326.6 543.9 338.8 544 352C544 370.3 537.1 386.8 526 399.5C527.3 404.8 528 410.3 528 416C528 441.1 515.1 463 495.8 475.9C493.9 511.4 466.4 540.1 431.4 543.6L424 544L319.9 544C301.9 544 284 540.6 267.3 534.1L260.2 531.1L259.5 530.8L252.9 527.6L252.2 527.3L240 520.8C227.7 514.3 216.7 506.1 207.1 496.7C203 523.6 179.8 544.1 151.8 544.1L119.8 544.1C88.9 544.1 63.8 519 63.8 488.1L64 264C64 233.1 89.1 208 120 208L152 208C162.8 208 172.9 211.1 181.5 216.5L231.6 110L232.2 108.8L234.9 103.8L235.5 102.9zM120 256C115.6 256 112 259.6 112 264L112 488C112 492.4 115.6 496 120 496L152 496C156.4 496 160 492.4 160 488L160 264C160 259.6 156.4 256 152 256L120 256zM317.6 115C302.8 108.1 285.3 113.4 276.9 127L274.7 131L217.9 251.9C214.4 259.4 212.4 267.4 211.9 275.6L211.8 279.8L211.8 392.7L212 400.6C214.4 433.3 233.4 462.7 262.7 478.3L274.2 484.4L280.5 487.5C292.9 493.1 306.3 496 319.9 496L424 496L426.4 495.9C438.5 494.7 448 484.4 448 472L447.8 469.4C447.7 468.5 447.6 467.7 447.4 466.8C444.7 454.7 451.7 442.6 463.4 438.8C473.1 435.7 480 426.6 480 416C480 411.7 478.9 407.8 476.9 404.2C470.6 393.1 474.1 379 484.9 372.2C491.7 367.9 496.1 360.4 496.1 352C496.1 344.9 493 338.5 487.9 334C482.7 329.4 479.7 322.9 479.7 316C479.7 309.1 482.7 302.6 487.9 298C493 293.5 496.1 287.1 496.1 280L496 277.6C494.9 266.3 485.9 257.3 474.6 256.2L472.2 256.1L324.7 256.1C316.5 256.1 308.9 251.9 304.5 245C300.1 238.1 299.5 229.3 303 221.9L333 157.6C340 142.6 334.4 124.9 320.5 116.6L317.6 115z" /></svg>
            ), label: 'Liked Videos'
        },
    ];

    // Build a dynamic list of subscriptions from the mock data.
    const tertiaryNav = mockData.map((sub) => ({
        icon: (
            <img src={sub.image}
                alt={sub.name}
                style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            />
        ),
        label: sub.name
    }));

    return (
        <aside style={{ ...styles.sidebar, width: isCollapsed ? '72px' : '240px' }}>
            {/* The spread operator keeps the default sidebar styles and overrides only the width.
                A ternary operator is used to switch between the collapsed and expanded widths. */}

            <div style={styles.section}>
                {mainNav.map((item, index) => (
                    <div
                        key={index}
                        onClick={item.onClick}
                        style={{
                            ...styles.navItem,
                            flexDirection: isCollapsed ? 'column' : 'row',
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                            padding: isCollapsed ? '16px 0' : '6px 12px',
                        }}
                    >
                        <span style={styles.icon}>{item.icon}</span>
                        <span style={{
                            ...styles.label,
                            fontSize: isCollapsed ? '10px' : '14px',
                            marginTop: isCollapsed ? '10px' : '0'
                        }}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <hr style={styles.divider} />

            {/* Secondary section only shows when the sidebar is expanded. */}
            {!isCollapsed && (
                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>You</h3>
                    {secondaryNav.map((item, index) => (
                        // .map() loops through the array and renders one row per item.

                        <div key={index}
                        onClick={item.onClick}
                        style={{
                            ...styles.navItem,
                            padding: isCollapsed ? '16px 0' : '6px 12px',
                        }
                        }>
                            {/* key={index} is used to identify each element in the list */}
                            <span style={styles.icon}>{item.icon}</span>
                            <span style={styles.label}>{item.label}</span>
                        </div>
                    ))}
                </div>
            )}

            <hr style={styles.divider} />
            {!isCollapsed && (
                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>Subscriptions</h3>
                    {
                        tertiaryNav.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.navItem,
                                    padding: isCollapsed ? '16px 0' : '6px 12px',
                                }}
                            >
                                <span style={styles.icon}>{item.icon}</span>
                                <span style={styles.label}>{item.label}</span>
                            </div>
                        )
                        )}
                </div>
            )}


        </aside>
    );
}

// Inline styles for rapid setup
const styles = {
    sidebar: {
        backgroundColor: '#0f0f0f',
        height: '800px', // Subtracts Navbar height
        overflow: 'auto',
        position: 'sticky',
        top: '56px',
        overflowY: 'auto',
        transition: 'width 0.2s ease-in-out',
        userSelect: 'none',
        boxSizing: 'border-box',
        padding: '10px 8px',
    },
    section: {
        fontSize: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        cursor: 'pointer',
        color: '#f1f1f1',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: '#272727',
        },
    },
    icon: {
        fontSize: '20px',
        minWidth: '24px',
        textAlign: 'center',
    },
    label: {
        marginLeft: '4px',
        fontWeight: '400',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    sectionHeader: {
        fontSize: '16px',
        color: '#aaa',
        padding: '8px 12px 4px 12px',
        margin: 0,
    },
    divider: {
        border: 'none',
        borderTop: '1px solid #272727',
        margin: '12px 0',
    },
};