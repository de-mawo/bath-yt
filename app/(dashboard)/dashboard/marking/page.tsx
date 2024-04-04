import Container from '@/components/Common/Container'
import { getMarksToMarkData } from '@/lib/data/getMarks'
import { ProjectMarksUserType } from '@/types'
import React from 'react'
import AdminMarkingTable from './AdminMarkingTable'

const MarkingPage = async () => {
    const marking = await getMarksToMarkData()
  return (
    <Container>
    <div className="flex flex-wrap justify-between items-center my-6 ">
      {/* LEFT SIDE */}
      <div className="flex justify-start items-center">
        <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
          Marking
        </h2>
      </div>
    </div>
    <AdminMarkingTable marking={marking as ProjectMarksUserType[]} />
  </Container>
  )
}

export default MarkingPage