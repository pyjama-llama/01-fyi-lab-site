import React from 'react';
import { motion } from 'framer-motion';

const WritingView: React.FC = () => {
    return (
        <main id="content" className="page">
            <section className="page-head">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="kicker">Thoughts & essays</p>
                        <h1 className="page-title">Writing</h1>
                        <p className="page-subtitle">Articles on data visualization, engineering, and design. Coming soon.</p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container prose">
                    <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                        This page is structurally complete and isolated via React Router.
                        When you are ready, simply add a NavLink in the Header component pointing to `/writing`.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default WritingView;
