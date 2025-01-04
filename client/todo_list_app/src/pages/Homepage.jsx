import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

import AddTask from '../components/AddTask';

const Homepage = () => {
  // State to manage the visibility of the notes input section
  const [isNotesVisible, setIsNotesVisible] = useState(false);

  // Click handler to toggle the visibility
  const click = () => {
    setIsNotesVisible(!isNotesVisible); // Toggle the visibility
  };
 const save=()=>{
  alert( " your notes here");
 }
  return (
    <>
      <Layout>
        <div className='m-4'>
          <AddTask/>
        </div>
      </Layout>
    </>
  );
};

export default Homepage;