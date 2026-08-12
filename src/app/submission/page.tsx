import SubmissionForm from '@/components/SubmissionForm';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className="mr-4">
        <SubmissionForm type="contact" issue="CONTACT" isShow />
      </div>
    </div>
  );
};

export default page;
