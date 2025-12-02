import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-10 pt-6 border-t border-white/10 text-center text-text-secondary text-sm">
            <div className="flex flex-col items-center gap-2">
                <p>
                    Contact Us &bull; <a href="https://mrpatra.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-glow transition-colors font-medium">Mr Patra</a>
                </p>
                <p className="text-xs opacity-60">
                    &copy; {new Date().getFullYear()} Windows Battery Status. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
