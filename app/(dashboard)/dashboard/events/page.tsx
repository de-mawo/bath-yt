import Container from '@/components/Common/Container'
import React from 'react'
import AdminEventsTable from './AdminEventsTable'
import AddEvents from './AddEvents'
import { getAllEventsData } from '@/lib/data/getEvents'

const AdminEventsPage = async () => {

  const events = await getAllEventsData()
  return (
    <>
    <Container>
       <div className="flex flex-wrap justify-between items-center my-6 ">
            {/* LEFT SIDE */}
            <div className="flex justify-start items-center"> 
            <h2 className='text-xl font-extrabold leading-tight  lg:text-2xl'>Events</h2>
              </div>

            {/* RIGHT SIDE  */}

            <div className="flex items-center space-x-3 md:space-x-6">
               <AddEvents/>
            </div>
          </div>
          <AdminEventsTable events={events}/>
    </Container>
    
    </>
  )
}

export default AdminEventsPage