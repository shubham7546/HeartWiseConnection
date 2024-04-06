import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { appointmentEndpoints, exploreDoc } from '../../../services/apis';
import DoctorCard from './DoctorCard';
import { useSelector } from 'react-redux';

const ExploreDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);



    const sendRequest = async (doc_id) => {
        console.log("token le lo:", token);
        console.log("appointmentEndpoints.REQ_APPOINTMENT_API", appointmentEndpoints.REQ_APPOINTMENT_API)
        try {
            const response = await apiConnector("POST", appointmentEndpoints.REQ_APPOINTMENT_API, {
                doctorId: doc_id
            }, {
                Authorization: `Bearer ${token}`,
            });

            if (response?.data?.success) {
                console.log("response", response);
            } else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiConnector("GET", exploreDoc.EXPLOREDOC_API);
                if (response?.data?.success) {
                    setDoctors(response.data.doctors);
                    console.log("response", response);
                } else {
                    console.log("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className='text-white'>
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                doctors.map((doctor, index) => (
                    <DoctorCard key={index} fname={doctor.firstName} lname={doctor.lastName} sendRequest={() => sendRequest(doctor._id)} />
                ))
            )}
        </div>
    );
};

export default ExploreDoctors;
