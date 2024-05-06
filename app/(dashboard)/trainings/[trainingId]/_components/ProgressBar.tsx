"use client";

const ProgressBar = ({ session }) => {
    
    const widthPercentage = (session._count.trainees / session.places) * 100;
            
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className={`bg-blue-600 h-2.5 rounded-full`} style={ { width: `${widthPercentage}%` } }></div>
        </div>
    );
};

export default ProgressBar;
