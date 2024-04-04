import Container from '@/components/Common/Container'
import { User } from '@prisma/client'



type Props = {
  name: string
}

const WelcomeBanner = ({name}: Props) => {
  return (
    <Container>
       <div className="flex flex-wrap justify-between items-center my-6 ">
            {/* LEFT SIDE */}
            <div className="flex justify-start items-center"> 
            <h2 className='text-xl font-extrabold leading-tight  lg:text-2xl'>Welcome {name}!</h2>
              </div>

            {/* RIGHT SIDE  */}

            <div className="flex items-center space-x-3 md:space-x-6">
         
            </div>
          </div>
    </Container>
  )
}

export default WelcomeBanner