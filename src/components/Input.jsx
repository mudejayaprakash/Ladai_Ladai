import React from 'react';

export const Input = ({ label, id, error, className, ...props }) => {
    return (
        <div className={`space-y-1 ${className}`}>
            {label && <label htmlFor={id} className="block text-sm font-medium text-slate-300">{label}</label>}
            <input
                id={id}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-game-accent focus:border-transparent transition-all"
                {...props}
            />
            {error && <p className="text-sm text-game-danger">{error}</p>}
        </div>
    );
};
