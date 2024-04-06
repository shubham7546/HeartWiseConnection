import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { reportsEndpoints } from '../../../services/apis';
import { useSelector } from 'react-redux';

const ViewPatientReports = () => {
    const [reports, setReports] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiConnector('POST', reportsEndpoints.VIEWREPORTS_API, null, {
                    Authorization: `Bearer ${token}`,
                });
                if (response?.data?.success) {
                    setReports(response);
                } else {
                    setError('Failed to fetch data');
                }
                console.log("reports", response);
            } catch (error) {
                setError('Error fetching data');
            }
            setLoading(false);
        };

        fetchData();
    }, [token]); // Include token as a dependency to trigger useEffect when token changes

    const openReportUrl = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="text-yellow-500">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {reports?.data.data.map((url, index) => (
                        <div key={index} className="doctor-item">

                            <button onClick={() => openReportUrl(url)}>Open Report</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewPatientReports;
