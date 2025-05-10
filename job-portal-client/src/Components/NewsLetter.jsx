
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";

const NewsLetter = () => {
  return (
    <div>
        <div>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaEnvelopeOpenText />Email me for Jobs
            </h3>
            <p className='text-primary/75 text-base mb-4'>
                We are excited to inform you what&apos;s really happening. Subscribe to our newsletter today.
            </p>

            <div className='w-full space-y-4'>
                <a 
                    href="https://substack.com/@ganesh097?utm_source=user-menu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold text-center'
                >
                    Subscribe
                </a>
            </div>
        </div>

        {/* 2nd part */}
        <div className='mt-20'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaRocket />Get noticed faster
            </h3>
            <p className='text-primary/75 text-base mb-4'>
                Use our Job Analyzer and Know your Perfect fit for the Job.
            </p>

            <div className='w-full space-y-4'>
                <a 
                    href="https://huggingface.co/spaces/Ganesh89/Job_analyzer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold text-center'
                >
                    Upload your resume
                </a>
            </div>
        </div>
    </div>
  );
}

export default NewsLetter;
