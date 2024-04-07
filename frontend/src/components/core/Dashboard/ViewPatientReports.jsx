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
                <div className="bg-rich-black pt-4 pb-6 px-4 ">
                    {reports?.data.data.map((url, index) => (
                        <div key={index} className="doctor-item text-white mb-10 flex justify-around">
                            <span className="font-bold text-xl">Report {index + 1}</span>
                            <button onClick={() => openReportUrl(url)} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Open Report
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewPatientReports;
