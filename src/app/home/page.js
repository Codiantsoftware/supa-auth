"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import Modal from "react-bootstrap/Modal";

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
    const storedData = sessionStorage.getItem("authData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData.userStats?.users || []);
      setTableData(parsedData.summary?.tables || []);
      setSummaryData(parsedData.summary || null);
      setRecommendations(parsedData.recommendations || []);
      setSecurityChecks(parsedData.securityChecks || null);
    }
  }, []);

  // chart
  const [state, setState] = useState({
    series: [44, 55, 41],
    options: {
      chart: {
        width: 350, // Adjusts donut size
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          donut: {
            size: "65%", // Adjust thickness
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        fontSize: "19px",
        fontWeight: "500",
        offsetY: 5,
        offsetX: -25,
        formatter: function (val, opts) {
          return `${val}: ${opts.w.config.series[opts.seriesIndex]}`;
        },
        itemMargin: {
          horizontal: 20,
          vertical: 13,
        },
        markers: {
          offsetX: -2,
        },
      },
      labels: ["Total Tables", "Tables with RLS", "Tables without RLS"],
      responsive: [
        {
          breakpoint: 991, // Adjust this value as per your requirement
          options: {
            chart: {
              width: 550, // Adjust chart size for small screens
            },
            legend: {
              fontSize: "16px",
            },
          },
        },
        {
          breakpoint: 767, // Another smaller breakpoint for mobile screens
          options: {
            chart: {
              width: 500, // Further reduce size
            },
            legend: {
              fontSize: "14px",
              position: "bottom",
              itemMargin: {
                horizontal: 5,
                vertical: 0,
              },
            },
          },
        },
        {
          breakpoint: 576, // Another smaller breakpoint for mobile screens
          options: {
            chart: {
              width: 300, // Further reduce size
            },
            legend: {
              itemMargin: {
                horizontal: 5,
                vertical: 5,
              },
              markers: {
                size: 6, 
              },
            }
          },
        },
      ],
    },
  });
  

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // chat box
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    setIsFormVisible((prev) => !prev);
  };

  return (
    <>
      <div className="dashboardPage">
      <div className="container"><h1 className='page-title'><span>Security</span> Audit Dashboard</h1></div>
 
        {/* Summary Section */}
        {summaryData && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.1 }}
            className="section summary-section"
          >
            <div className="container">
              <div className="section-head mb-4">
                <h2 className="section-title">Summary</h2>
                <button className="btn" onClick={handleShow}>
                  Quick Fix
                </button>
              </div>
              <div className="grid summary-grid">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 0.1 }}
                  className="summary-item"
                >
                  <img
                    src="table-img-1.png"
                    className="summary-icon"
                    alt="img"
                  />
                  <div>
                    <p className="summary-label">Total Tables</p>
                    <p className="summary-value">{summaryData.totalTables}</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                  className="summary-item purple"
                >
                  <img
                    src="table-img-2.png"
                    className="summary-icon"
                    alt="img"
                  />
                  <div>
                    <p className="summary-label">Tables with RLS</p>
                    <p className="summary-value">{summaryData.tablesWithRLS}</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 0.3 }}
                  className="summary-item red"
                >
                  <img
                    src="table-img-3.png"
                    className="summary-icon"
                    alt="img"
                  />
                  <div>
                    <p className="summary-label">Tables without RLS</p>
                    <p className="summary-value">
                      {summaryData.tablesWithoutRLS}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
                  className="summary-item orange"
                >
                  <img
                    src="table-img-4.png"
                    className="summary-icon"
                    alt="img"
                  />
                  <div>
                    <p className="summary-label">RLS Adoption Rate</p>
                    <p className="summary-value">
                      {securityChecks?.rls_adoption_rate}
                    </p>
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
            transition={{ ease: "easeInOut", duration: 1.1, delay: 1 }}
            className="section security-checks"
          >
            <div className="container">
              <h2 className="section-title">Security Checks</h2>
              <div className="grid security-grid lg">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 1.1 }}
                  className="security-item"
                >
                  <div>
                    <p className="security-label">Auth Status</p>
                    <p className="security-value">
                      {securityChecks.auth_enabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                  <img src="enabled.png" alt="img" />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 1.3 }}
                  className="security-item purple"
                >
                  <div>
                    <p className="security-label">Total Users</p>
                    <p className="security-value">
                      {securityChecks.total_users}
                    </p>
                  </div>
                  <img src="user.png" alt="img" />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 1.4 }}
                  className="security-item red"
                >
                  <div>
                    <p className="security-label">Users with MFA</p>
                    <p className="security-value">
                      {securityChecks.users_with_mfa}
                    </p>
                  </div>
                  <img src="user-mfa.png" alt="img" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        <section className="summeryGraph">
          <div className="container">
            <div className="row">
              <div className="col-left">
                <div className="summeryGraph_left">
                  <h2 className="section-title">Summary</h2>
                  <div className="summeryGraph_wrap">
                    <ReactApexChart
                      options={state.options}
                      series={state.series}
                      type="donut"
                      width={600}
                    />
                  </div>
                  <div className="summeryGraph_card">
                    <label>RLS Adoption Rate</label>
                    <p>0.0%</p>
                  </div>
                </div>
              </div>
              <div className="col-right">
                <div className="summeryGraph_right">
                  <div className="summeryGraph_right_inner">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="summeryGraph-item">
                        <div className="summeryGraph-user">
                          <img src="placeholder-img.png" alt="user" />
                        </div>
                        <div>
                          <p className="summeryGraph-table">
                            Table: <span>{rec.table}</span>{" "}
                          </p>
                          <p className="summeryGraph-severity">
                            Severity:{" "}
                            <span className="status status-danger">
                              {rec.severity}
                            </span>
                          </p>
                          <p className="summeryGraph-text">
                            {rec.recommendation}
                          </p>
                          <p className="summeryGraph-details">{rec.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Users and Tables */}
        <div className="section users-tables">
          <div className="container">
            <h2 className="section-title">Users and Tables</h2>
            <div className="users-tables-responsive">
              <table className="user-table">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">ID</th>
                    <th className="table-cell">Email</th>
                    <th className="table-cell">Has MFA</th>
                    <th className="table-cell">Tables</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className="table-cell">{user.id}</td>
                      <td className="table-cell">{user.email}</td>
                      <td className="table-cell">
                        <span
                          className={`status ${
                            user.hasMFA ? "status-success" : "status-danger"
                          }`}
                        >
                          {user.hasMFA ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="table-cell">
                        {tableData.length > 0 ? (
                          <ul className="table-list">
                            {tableData.map((table, index) => (
                              <li key={index} className="table-item">
                                {table.table}
                                <span
                                  className={`status ${
                                    table.hasRLS
                                      ? "status-success"
                                      : "status-danger"
                                  }`}
                                >
                                  {table.hasRLS
                                    ? "RLS Enabled"
                                    : "RLS Disabled"}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "No Tables"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        className="quickModal"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Quick Fix</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="quickModal_cnt">
            <div className="quickModal_cnt_inner">
              <h2 className="quickModal_title">
                For simple login to Compliance tool
              </h2>
              <p className="quickModal_txt">Find your creds from below </p>
              <img
                src="screenshot-1.webp"
                className="img-fluid"
                alt="screenshot"
              />
            </div>
            <div className="quickModal_cnt_inner">
              <h2 className="quickModal_title">
                For checking whether RLS is enabled or not :
              </h2>
              <ul className="mb-4 ps-4">
                <li>Log in to your Supabase dashboard.</li>
                <li>Select your project from the dashboard</li>
                <li>Click on <b>SQL Editor</b> from the left sidebar.</li>
                <li>Create a function named :get_tables_rls_status </li>
                <li>Paste the below code :</li>
              </ul>
              <div className="quickModal_code mb-4">
                <code>
                  create or replace function get_tables_rls_status()
                  <br />
                  returns table(name text, has_rls boolean) as $$
                  <br />
                  select
                  <br />
                  t.tablename as name,
                  <br />
                  case
                  <br />
                  when p.tablename is not null then true
                  <br />
                  else false
                  <br />
                  end as has_rls
                  <br />
                  from pg_tables t
                  <br />
                  left join (
                  <br />
                  select c.relname as tablename
                  <br />
                  from pg_policy pol
                  <br />
                  join pg_class c on pol.polrelid = c.oid
                  <br />
                  join pg_namespace n on c.relnamespace = n.oid
                  <br />
                  where n.nspname = 'public'
                  <br />
                  ) p on t.tablename = p.tablename
                  <br />
                  where t.schemaname = 'public';
                  <br />
                  $$ language sql;
                </code>
              </div>
              <img
                src="screenshot-2.webp"
                className="img-fluid"
                alt="screenshot"
              />
            </div>
            <div className="quickModal_cnt_inner">
              <h2 className="quickModal_title">
              For checking whether  PITR 
              </h2>
              <ul className="mb-0 ps-4">
                <li>Go to Supabase and log in to your account.</li>
                <li>Navigate to the Organization Settings</li>
                <li>Click on your organization name in the top-left corner.</li>
                <li>Select "Settings" from the dropdown.</li>
                <li>Find the Access Token</li>
                <li>Under the "Access Tokens" section, you might see existing tokens or an option to create a new one.</li>
                <li>Click "Generate a new access token" if none exist.</li>
                <li>Copy the Token</li>
                <li>After generating, copy the token immediately as it may not be displayed again.</li>
              </ul>
              </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="chatBot d-flex flex-column align-items-center">
        <button
          type="button"
          id="toggleLink"
          aria-label="Chat Button"
          className="btn-link chatBot_link d-flex align-items-center justify-content-center"
          onClick={handleToggle}
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 1.49933C0 0.670226 0.671178 0 1.5 0H13.5C14.3288 0 15 0.670226 15 1.49933V10.4935C15 11.3226 14.3288 11.9928 13.5 11.9928H7.66658L3.79988 14.8909C3.64835 15.0045 3.44568 15.0227 3.27632 14.938C3.10697 14.8533 3 14.6802 3 14.4908V11.9928H1.5C0.671178 11.9928 0 11.3226 0 10.4935V1.49933ZM4 3.99738H11V4.99738H4V3.99738ZM4 6.99542H9V7.99542H4V6.99542Z"
              fill="#fff"
            />
          </svg>
        </button>
        <div className={`chatBot_box ${isFormVisible ? "open" : ""}`}>
          <div className="chatBot_header">
            <h3>ChatBot</h3>
            <div className="closeIcon" onClick={handleToggle}></div>
          </div>
          <div className="chatBot_body">
            <div className="chatBot_body_send ">
              <img src="logo.png" alt="company" />
              <div className="chatBot_body_msg">
                <span>
                  Hello, how can I help you? Hello, how can I help you?Hello,
                  how can I help you?Hello, how can I help you?
                </span>
              </div>
            </div>
            <div className="chatBot_body_receive ">
              <div className="chatBot_body_msg">
                <span>yes</span>
              </div>
            </div>
            <div className="chatBot_body_send ">
              <img src="logo.png" alt="company" />
              <div className="chatBot_body_msg">
                <span>Hello, how can I help you?</span>
              </div>
            </div>
            <div className="chatBot_body_receive ">
              <div className="chatBot_body_msg">
                <span>yes</span>
              </div>
            </div>
            <div className="chatBot_body_send ">
              <img src="logo.png" alt="company" />
              <div className="chatBot_body_msg">
                <span>Hello, how can I help you?</span>
              </div>
            </div>
            <div className="chatBot_body_receive ">
              <div className="chatBot_body_msg">
                <span>yes</span>
              </div>
            </div>
            <div className="chatBot_body_send ">
              <img src="logo.png" alt="company" />
              <div className="chatBot_body_msg">
                <span>Hello, how can I help you?</span>
              </div>
            </div>
            <div className="chatBot_body_receive ">
              <div className="chatBot_body_msg">
                <span>yes</span>
              </div>
            </div>
            <div className="chatBot_body_send ">
              <img src="logo.png" alt="company" />
              <div className="chatBot_body_msg">
                <span>Hello, how can I help you?</span>
              </div>
            </div>
            <div className="chatBot_body_receive ">
              <div className="chatBot_body_msg">
                <span>yes</span>
              </div>
            </div>
          </div>
          <div className="chatBot_footer">
            <input type="text" placeholder="Write your message" />
            <button
              type="button"
              className="chatBot_footer_sendBtn"
              onClick={handleToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.016"
                height="18.014"
                viewBox="0 0 18.016 18.014"
              >
                <path
                  id="Path_161667"
                  data-name="Path 161667"
                  d="M11.549,18.015a1.655,1.655,0,0,1-1.586-1.2L8.015,10,1.2,8.052a1.659,1.659,0,0,1-.007-3.186L17.335.023a.528.528,0,0,1,.657.657L13.148,16.828A1.655,1.655,0,0,1,11.549,18.015Z"
                  transform="translate(0.001 -0.001)"
                  fill="#fff"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
