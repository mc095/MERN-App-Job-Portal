import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaBriefcase } from "react-icons/fa6";
import PageHeader from '../Components/PageHeader';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  
  useEffect(() => {
    fetch(`https://mern-app-job-portal-backend.vercel.app/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data));
  }, [id]);

  const handleApply = async () => {
    // Prompt for URL
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "Resume URL",
      inputPlaceholder: "Enter the URL of your resume",
    });

    if (url) {
      // Prompt for Gmail ID
      const { value: gmail } = await Swal.fire({
        input: "email",
        inputLabel: "Gmail ID",
        inputPlaceholder: "Enter your Gmail ID",
      });

      if (gmail) {
        Swal.fire(`Entered URL: ${url} and Gmail ID: ${gmail}`);

        const resumeData = {
          jobId: id,
          companyName: job.companyName,
          jobTitle: job.jobTitle,
          resumeLink: url,
          gmailId: gmail
        };

        const response = await fetch('https://mern-app-job-portal-backend.vercel.app/submit-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resumeData)
        });

        if (response.ok) {
          Swal.fire('Success', 'Resume submitted successfully', 'success');
        } else {
          Swal.fire('Error', 'Failed to submit resume', 'error');
        }
      }
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="mt-10">
        <h3 className="font-semibold mb-2">Job ID: {parseInt(id)}</h3>

        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">{`${job.jobTitle}`}</h2>
          <p className="text-primary/75 md:w-1/3 text-sm italic my-1">
            Here<span>&apos;</span>s how the job details align with your job
            preferences. Manage job preferences anytime in your profile.
          </p>
        </div>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Job type</p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.experienceLevel}
          </button>
          <button className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2" onClick={handleApply}>
            Apply Now
          </button>
        </div>

        {/* job details */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Benefits</h4>
            <p className="text-sm text-primary/70 mb-2">
              Pulled from the full job description
            </p>
            <ul className="list-disc list-outside text-primary/90 space-y-2 text-base">
              <li>
                1. ${job.minPrice}-{job.maxPrice}k
              </li>
              <li>2. Disability insurance</li>
              <li>3. Employee discount</li>
              <li>4. Flexible spending account</li>
              <li>5. Health insurance</li>
              <li>6. Paid time off</li>
              <li>7. Vision insurance</li>
              <li>8. Volunteer time off</li>
              <li> 9. Dental insurance</li>
            </ul>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Job Summary</h4>
            <p className="text-primary/90">
              {job.summary}
            </p>
          </div>
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Job Requirements</h4>
            <p className="text-primary/90">
              {job.requirements}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
