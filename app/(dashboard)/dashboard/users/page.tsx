import Container from '@/components/Common/Container';
import {  User } from '@prisma/client';
import { getAdminUsersData } from '@/lib/data/getUsers';
import AdminUsersTable from './AdminUsersTable';
import AddAllowedEmail from './AddAllowedEmail';

const AdminUsersPage = async () => {
    const users = await getAdminUsersData();
    return (
      <>
        <Container>
          <div className="flex flex-wrap justify-between items-center my-6 ">
     
            <div className="flex justify-start items-center">
              <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
                Users
              </h2>
            </div>
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6 ">
             
              <AddAllowedEmail />
            </div>
          </div>
          <AdminUsersTable users={users as User[] } />
        </Container>
      </> 
    );
}

export default AdminUsersPage