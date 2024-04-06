import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { appointmentEndpoints } from '../../../services/apis';
import { apiConnector } from '../../../services/apiconnector';
import { FaCheckCircle } from 'react-icons/fa'; // Import React Icons

const DoctorCard = ({ fname, lname, docId }) => {
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [sent, setSent] = useState({
        [docId]: false
    });

    const sendRequest = async (doc_id) => {
        console.log("token le lo:", token);
        console.log("appointmentEndpoints.REQ_APPOINTMENT_API", appointmentEndpoints.REQ_APPOINTMENT_API);
        try {
            const response = await apiConnector("POST", appointmentEndpoints.REQ_APPOINTMENT_API, {
                doctorId: doc_id
            }, {
                Authorization: `Bearer ${token}`,
            });

            if (response?.data?.success) {
                console.log("response", response);
                setSent({
                    [docId]: true
                });
            } else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const cardAnimation = useSpring({
        from: { opacity: 0, transform: 'translateX(-50px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        config: { duration: 500 },
    });

    return (
        <animated.div style={cardAnimation} className="flex max-w-sm rounded overflow-hidden shadow-lg">
            <div className="flex-1 px-6 py-4">
                <div className="font-bold text-xl mb-2">{fname}</div>
                <p className="text-gray-700 text-base">{lname}</p>
            </div>
            <div className="px-6 py-4">
                {sent[docId] ? ( // Render "Request Sent" div when sent is true
                    <div className="flex items-center text-green-500">
                        <FaCheckCircle className="mr-2" /> Request Sent
                    </div>
                ) : (
                    <button
                        onClick={() => sendRequest(docId)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Book Appointment
                    </button>
                )}
            </div>
        </animated.div>
    );
};

export default DoctorCard;
