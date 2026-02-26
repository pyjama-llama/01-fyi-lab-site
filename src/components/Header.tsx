import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Check initial system/saved preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleLanguage = () => {
        const nextLang = i18n.language.startsWith('en') ? 'is' : 'en';
        i18n.changeLanguage(nextLang);
    };

    return (
        <header className="site-header">
            <div className="container header-inner">
                <Link className="brand" to="/" aria-label="FYI Lab home">
                    <span className="brand-mark" aria-hidden="true">FYI</span>
                    <span className="brand-name">Lab</span>
                </Link>

                {/* Removed 'is-active' class here because NavLink automatically handles it, we just need to use clsx */}
                <nav className="site-nav" aria-label="Primary">
                    <NavLink to="/" className={({ isActive }) => clsx("nav-link", isActive && "is-active")}>
                        {t('nav.work')}
                    </NavLink>
                    <NavLink to="/projects" className={({ isActive }) => clsx("nav-link", isActive && "is-active")}>
                        {t('nav.projects')}
                    </NavLink>
                    <NavLink to="/gallery" className={({ isActive }) => clsx("nav-link", isActive && "is-active")}>
                        {t('nav.gallery')}
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => clsx("nav-link", isActive && "is-active")}>
                        {t('nav.about')}
                    </NavLink>
                    {/* Writing view is hidden from the main nav for now as requested */}
                </nav>

                <div className="header-actions">
                    <button
                        className="theme-toggle"
                        type="button"
                        onClick={toggleLanguage}
                        aria-label="Toggle language"
                        style={{ fontWeight: 600, fontSize: '14px' }}
                    >
                        {i18n.language.startsWith('en') ? 'IS' : 'EN'}
                    </button>

                    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? (
                            <svg className="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        ) : (
                            <svg className="theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        )}
                    </button>

                    <a className="nav-link" href="mailto:hello@fyilab.is">{t('nav.contact')}</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
