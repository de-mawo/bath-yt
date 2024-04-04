import Container from '@/components/Common/Container';
import {  Task } from '@prisma/client';
import React from 'react'
import AdminTasksTable from './AdminTasksTable';
import AddTasks from './AddTasks';
import { getTasksData } from '@/lib/data/getTasks';

const AdminTasksPage = async () => {
    const tasks = await getTasksData();
    return (
      <>
        <Container>
          <div className="flex flex-wrap justify-between items-center my-6 ">
            {/* LEFT SIDE */}
            <div className="flex justify-start items-center">
              <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
                Tasks
              </h2>
            </div>
  
            {/* RIGHT SIDE  */}
  
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6 ">
              {/* <AddStudentToCourse/> */}
              <AddTasks />
            </div>
          </div>
          <AdminTasksTable tasks={tasks as Task[] } />
        </Container>
      </>
    );
}

export default AdminTasksPage