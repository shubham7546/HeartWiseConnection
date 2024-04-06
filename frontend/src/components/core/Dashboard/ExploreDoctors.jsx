import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { exploreDoc } from '../../../services/apis';
import Card from './DoctorCard'; // Corrected import statement

const ExploreDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <Card key={index} fname={doctor.firstName} lname={doctor.lastName} />
                ))
            )}
        </div>
    );
};

export default ExploreDoctors;
