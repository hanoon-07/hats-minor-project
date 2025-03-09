import React from 'react';
import { User } from 'lucide-react';

const StudentProfile = ({ 
    ktuRollNo, 
    university, 
    studentName,
    email 
}) => {
    return (
        <div className="w-full bg-[#272a2e] flex items-center justify-center p-4">
            <div className="bg-darkGray shadow-xl rounded-lg w-full max-w-md overflow-hidden">
                {/* Profile Photo Section */}
                <div className="flex justify-center py-6 bg-darkGray">
                    <div className="rounded-full bg-gray-300 w-32 h-32 flex items-center justify-center">
                        <User className="w-20 h-20 text-gray-500" />
                    </div>
                </div>

                {/* Profile Information */}
                <div className="px-6 pb-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-[#A8FF53]">
                        {studentName || 'Student Profile'}
                    </h2>

                    <div className="space-y-4">
                    <div className="bg-[#272a2e] p-4 rounded-md">
                            <h3 className="text-sm font-semibold text-[#A8FF53] mb-2">
                                Email
                            </h3>
                            <p className="text-lg font-medium text-white">
                                {email || 'Not Available'}
                            </p>
                        </div>

                        {/* University Information */}
                        <div className="bg-[#272a2e] p-4 rounded-md">
                            <h3 className="text-sm font-semibold text-[#A8FF53] mb-2">
                                University
                            </h3>
                            <p className="text-lg font-medium text-white">
                                {university || 'Not Specified'}
                            </p>
                        </div>

                        {/* KTU Roll Number */}
                        <div className="bg-[#272a2e] p-4 rounded-md">
                            <h3 className="text-sm font-semibold text-[#A8FF53] mb-2">
                                KTU Roll Number
                            </h3>
                            <p className="text-lg font-medium text-white">
                                {ktuRollNo || 'Not Available'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;