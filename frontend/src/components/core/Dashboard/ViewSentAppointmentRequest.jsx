/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { appointmentEndpoints, reportsEndpoints } from '../../../services/apis';
import { useSelector } from 'react-redux';

const ViewSentAppointmentRequest = () => {
    const [appDoc, setappDoc] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = useSelector((state) => state.auth);
    console.log("url", appointmentEndpoints.VIEW_APPOINTED_DOCTORS_API)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiConnector('GET', appointmentEndpoints.VIEW_APPOINTED_DOCTORS_API, null, {
                    Authorization: `Bearer ${token}`,
                });
                if (response?.data?.success) {
                    setappDoc(response);
                } else {
                    setError('Failed to fetch data');
                }
                console.log("appDoc", response);
            } catch (error) {
                setError('Error fetching data');
            }
            setLoading(false);
        };

        fetchData();
    }, [token]); // Include token as a dependency to trigger useEffect when token changes


    return (
        <div className="text-yellow-500">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {appDoc?.data.appointedDoctors.map((doc, index) => (
                        <div key={index} className="doctor-item">

                            <p>{doc.firstName}</p>
                            <p>{doc.lastName}</p>
                            <p>{doc.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewSentAppointmentRequest;
