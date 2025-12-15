import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, className, variant = 'primary', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-game-dark disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-game-accent text-game-dark hover:bg-sky-400 focus:ring-game-accent",
        secondary: "bg-slate-700 text-white hover:bg-slate-600 focus:ring-slate-500",
        danger: "bg-game-danger text-white hover:bg-red-600 focus:ring-game-danger",
        outline: "border-2 border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white"
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};
