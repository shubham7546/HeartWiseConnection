import React from 'react';
import { useSpring, animated } from 'react-spring';

const Card = ({ fname, lname, onClick }) => {
    const cardAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 },
    });

    return (
        <animated.div style={cardAnimation} className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{fname}</div>
                <p className="text-gray-700 text-base">{lname}</p>
            </div>
            <div className="px-6 py-4">
                <button
                    // onClick={onClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    book appointment
                </button>
            </div>
        </animated.div>
    );
};

export default Card;