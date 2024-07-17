import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-resumes");
        const data = await response.json();
        setResumes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching resumes: ", error);
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResumes = resumes.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < resumes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelect = (gmailId) => {
    const mailtoLink = `mailto:${gmailId}?subject=Congratulations&body=Congratulations, you're selected!`;
    window.location.href = mailtoLink;
  };

  const handleReject = async (id) => {
    const response = await fetch(`http://localhost:5000/resume/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      Swal.fire('Success', 'Resume rejected successfully', 'success');
      setResumes(resumes.filter(resume => resume._id !== id));
    } else {
      Swal.fire('Error', 'Failed to reject resume', 'error');
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4">All Resumes</h1>
      </div>

      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Resumes
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      JOB TITLE
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      COMPANY NAME
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      RESUME LINK
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      GMAIL ID
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      SUBMITTED AT
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                {
                  isLoading ? (<div className="flex items-center justify-center h-20"><p>Loading...</p></div>) : (
                    <tbody>
                      {
                        currentResumes.map((resume, index) => (
                          <tr key={resume._id}>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                              {index + 1 + (currentPage - 1) * itemsPerPage}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {resume.jobTitle}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {resume.companyName}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <a href={resume.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume</a>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {resume.gmailId}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {new Date(resume.submittedAt).toLocaleDateString()}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <button onClick={() => handleSelect(resume.gmailId)} className="bg-green-500 text-white px-2 py-1 rounded">Select</button>
                              <button onClick={() => handleReject(resume._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Reject</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  )
                }
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-black space-x-8">
          {
            currentPage > 1 && (<button className="hover:underline" onClick={prevPage}>
              Previous
            </button>)
          }
          {
            indexOfLastItem < resumes.length && (
              <button onClick={nextPage} className="hover:underline">Next</button>
            )
          }
        </div>
      </section>
    </div>
  );
};

export default Resumes;
