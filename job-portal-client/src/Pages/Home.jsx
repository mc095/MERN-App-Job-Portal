import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Jobs from "../Pages/Jobs";
import Sidebar from "../Sidebar/Sidebar";
import NewsLetter from "../Components/NewsLetter";

const Home = () => {
  const [selectedCategory, setselectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setisLoading(true);
    fetch("http://localhost:5000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setisLoading(false);
      });
  }, []);
  
  const [query, setQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'jobTitle') {
      setQuery(value);
    } else if (name === 'jobLocation') {
      setSearchLocation(value);
    } else if (name === 'position') {
      setPosition(value);
    }
  };

  // filter jobs by titles
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // --------- Radio Filterimg ---------- //

  const handleChange = (event) => {
    setselectedCategory(event.target.value);
  };

  // ------ Button based filtering ------- //

  const handleClick = (event) => {
    setselectedCategory(event.target.value);
  };

  // ---- calculate the index range

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Main function
  const filteredData = (jobs, selected, position, searchLocation) => {
    let filteredJobs = jobs;

    // filtering input items
    // if (position) {
    //     filteredJobs = filteredJobs.filter((job) => {
    //       const jobTitle = job.jobTitle.toLowerCase();
    //       return jobTitle.includes(query.toLowerCase()) && jobTitle.includes(position.toLowerCase());
    //     });
    //   }

    
    if (position.trim()) {
      filteredJobs = filteredJobs.filter((job) => job.jobTitle.toLowerCase().includes(position.trim().toLowerCase()));
    } 
    else if (searchLocation) {
      console.log(searchLocation)
      filteredJobs = filteredJobs.filter((job) => job.jobLocation.toLowerCase().includes(searchLocation.toLowerCase()));
    } else {
      // no filtering, return all jobs
      filteredJobs = jobs;
    }
      

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          postingDate >= selected ||
          (jobLocation && jobLocation.toLowerCase() === selected.toLowerCase()) ||
          (parseInt(maxPrice) === parseInt(selected)) ||
          (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
          (experienceLevel && experienceLevel.toLowerCase() === selected.toLowerCase()) ||
          (employmentType && employmentType.toLowerCase() === selected.toLowerCase())
      );
    }

    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query, searchLocation);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Job cards */}
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <p>Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data Found</p>
            </>
          )}

          {/* pagination here */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} className="hover:underline">
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right side */}
        <div className="bg-white p-4 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
