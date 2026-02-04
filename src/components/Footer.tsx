// src/components/Footer.tsx
const Footer = () => {
    return (
        <footer className="border-t border-slate-900 py-12 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center space-x-6 mb-8">
                    <a href="#" className="text-slate-500 hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="text-slate-500 hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="text-slate-500 hover:text-white transition-colors">LinkedIn</a>
                </div>
                <p className="text-slate-600 text-sm">
                    &copy; {new Date().getFullYear()} Team Introduction Project. Handcrafted with passion and precision.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
