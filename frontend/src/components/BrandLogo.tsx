import React from 'react';
import { Snowflake } from 'lucide-react';

interface BrandLogoProps {
    className?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
    variant?: 'light' | 'dark';
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md', showText = true, variant = 'dark' }) => {
    const sizeClasses = {
        xs: { icon: 'w-5 h-5', text: 'text-base', subtext: 'text-[7px]', gap: 'space-x-2' },
        sm: { icon: 'w-6 h-6', text: 'text-lg', subtext: 'text-[8px]', gap: 'space-x-2' },
        md: { icon: 'w-10 h-10', text: 'text-2xl', subtext: 'text-[10px]', gap: 'space-x-3' },
        lg: { icon: 'w-14 h-14', text: 'text-3xl', subtext: 'text-[12px]', gap: 'space-x-4' },
        xl: { icon: 'w-20 h-20', text: 'text-4xl', subtext: 'text-[14px]', gap: 'space-x-5' },
    };

    // Defensive check to prevent white-screen crashes if an invalid size is passed
    const currentSize = sizeClasses[size] || sizeClasses.md;

    return (
        <div className={`flex items-center ${currentSize.gap} ${className}`}>
            {/* Professional Icon Shield */}
            <div className={`${currentSize.icon} bg-blue-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300`}>
                <Snowflake className="w-2/3 h-2/3 text-white" />
            </div>

            {showText && (
                <div className="flex flex-col leading-none">
                    <div className="flex items-center space-x-1">
                        <span className={`font-black tracking-tighter ${variant === 'light' ? 'text-white' : 'text-blue-900'} ${currentSize.text}`}>ROSHNI</span>
                        <span className={`font-bold tracking-tighter text-cyan-500 ${currentSize.text}`}>ENTERPRISE</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandLogo;
