/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { useSelector } from 'react-redux';
import DoctorCard from './DoctorCard';
import { exploreDoc } from '../../../services/apis';


const ExploreDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiConnector("GET", exploreDoc.EXPLOREDOC_API, null, {
                    Authorization: `Bearer ${token}`,
                });
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
                    <DoctorCard key={index} fname={doctor.firstName} lname={doctor.lastName} docId={doctor._id} />
                ))
            )}
        </div>
    );
};

export default ExploreDoctors;