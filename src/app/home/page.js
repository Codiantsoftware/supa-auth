'use client';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

/**
 * Home component that displays user data stored in session storage.
 * Retrieves authentication data and displays a user table if data is available.
 * @returns {JSX.Element} The home page component.
 */
export default function Home() {
    const [userData, setUserData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [summaryData, setSummaryData] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [securityChecks, setSecurityChecks] = useState(null);

    /**
     * Effect hook to retrieve authentication data from session storage.
     * Parses the stored data and updates the state with user details.
     */
    useEffect(() => {
        const storedData = sessionStorage.getItem('authData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData.userStats?.users || []);
            setTableData(parsedData.summary?.tables || []);
            setSummaryData(parsedData.summary || null);
            setRecommendations(parsedData.recommendations || []);
            setSecurityChecks(parsedData.securityChecks || null);
        }
    }, []);

    return (
        <div className='dashboardPage'>
            <div className="container"><h1 className='page-title'><span>Security</span> Audit Dashboard</h1></div>

            {/* Summary Section */}
            {summaryData && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", duration:1, delay: 0.1 }} className='section summary-section'>
                    <div className="container">
                        <h2 className='section-title'>Summary</h2>
                            <div className='grid summary-grid'>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeInOut", duration:1, delay: 0.1 }}
                                    className='summary-item'>
                                        <img src="table-img-1.png" className='summary-icon' alt="img" />
                                        <div>
                                            <p className='summary-label'>Total Tables</p>
                                            <p className='summary-value'>{summaryData.totalTables}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeInOut", duration:1, delay: 0.2 }}
                                    className='summary-item purple'>
                                        <img src="table-img-2.png" className='summary-icon' alt="img" />
                                        <div>
                                    <p className='summary-label'>Tables with RLS</p>
                                    <p className='summary-value'>{summaryData.tablesWithRLS}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeInOut", duration:1, delay: 0.3 }}
                                    className='summary-item red'>
                                        <img src="table-img-3.png" className='summary-icon' alt="img" />
                                        <div>
                                        <p className='summary-label'>Tables without RLS</p>
                                        <p className='summary-value'>{summaryData.tablesWithoutRLS}</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeInOut", duration:1, delay: 0.4 }}
                                    className='summary-item orange'>
                                        <img src="table-img-4.png" className='summary-icon' alt="img" />
                                        <div>
                                        <p className='summary-label'>RLS Adoption Rate</p>
                                        <p className='summary-value'>{securityChecks?.rls_adoption_rate}</p>
                                    </div>
                                </motion.div>
                            </div>
                    </div>
                </motion.div>
            )}

            {/* Security Checks */}
            {securityChecks && (
                <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration:1.1, delay: 1 }} className='section security-checks'>
                    <div className="container">
                        <h2 className='section-title'><span>Security</span> Checks</h2>
                        <div className='grid security-grid lg'>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }} 
                                transition={{ ease: "easeInOut", duration:1, delay: 1.1 }}
                                className='security-item'>
                                <div>
                                    <p className='security-label'>Auth Status</p>
                                    <p className='security-value'>{securityChecks.auth_enabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                                <img src="enabled.png" alt="img" />
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }} 
                                transition={{ ease: "easeInOut", duration:1, delay: 1.3 }}
                                className='security-item purple'>
                                <div>
                                    <p className='security-label'>Total Users</p>
                                    <p className='security-value'>{securityChecks.total_users}</p>
                                </div>
                                <img src="user.png" alt="img" />
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ ease: "easeInOut", duration:1, delay: 1.4 }}
                                className='security-item red'>
                                <div>
                                    <p className='security-label'>Users with MFA</p>
                                    <p className='security-value'>{securityChecks.users_with_mfa}</p>
                                </div>
                                <img src="user-mfa.png" alt="img" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <div className='section recommendations'>
                    <div className="container">
                        <h2 className='section-title'><span>Security</span> Recommendations</h2>
                        <div className="recommendation-wrap">
                            {recommendations.map((rec, index) => (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeInOut", duration:1.2, delay: 1.4 }} key={index} className='recommendation-item'>
                                    <p className='recommendation-table'>Table: <span>{rec.table}</span> </p>
                                    <p className='recommendation-severity'>Severity: <span className='status status-danger'>{rec.severity}</span></p>
                                    <p className='recommendation-text'>{rec.recommendation}</p>
                                    <p className='recommendation-details'>{rec.details}</p>
                                    </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Users and Tables */}
            <div className='section users-tables'>
                <div className="container">
                    <h2 className='section-title'><span>Users</span> and Tables</h2>
                    <table className="user-table">
                        <thead>
                            <tr className='table-header'>
                                <th className='table-cell'>ID</th>
                                <th className='table-cell'>Email</th>
                                <th className='table-cell'>Has MFA</th>
                                <th className='table-cell'>Tables</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user.id}>
                                    <td className='table-cell'>{user.id}</td>
                                    <td className='table-cell'>{user.email}</td>
                                    <td className='table-cell'>
                                        <span className={`status ${user.hasMFA ? 'status-success' : 'status-danger'}`}>
                                            {user.hasMFA ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className='table-cell'>
                                        {tableData.length > 0 ? (
                                            <ul className='table-list'>
                                                {tableData.map((table, index) => (
                                                    <li key={index} className='table-item'>
                                                        {table.table}
                                                        <span className={`status ${table.hasRLS ? 'status-success' : 'status-danger'}`}>
                                                            {table.hasRLS ? 'RLS Enabled' : 'RLS Disabled'}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            'No Tables'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
