import Container from '@/components/Common/Container';
import { Project } from '@prisma/client';
import React from 'react'
import AdminProjectsTable from './AdminProjectsTable';
import AddProjects from './AddProjects';
import { getProjectsData } from '@/lib/data/getProjects';

const AdminProjectsPage = async () => {
    const projects = await getProjectsData();
    return (
      <>
        <Container>
          <div className="flex flex-wrap justify-between items-center my-6 ">
            {/* LEFT SIDE */}
            <div className="flex justify-start items-center">
              <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
                Projects
              </h2>
            </div>
  
            {/* RIGHT SIDE  */}
  
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6 ">
              {/* <AddStudentToCourse/> */}
              <AddProjects />
            </div>
          </div>
          <AdminProjectsTable projects={projects as Project[] } />
        </Container>
      </>
    );
}

export default AdminProjectsPage