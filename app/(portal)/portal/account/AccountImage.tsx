import { User } from "@prisma/client";
import Image from "next/image";


type Props = {
    user: User;
  };
  

const AccountImage = ({ user }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={user.image as string}
        width={100}
        height={100}
        alt="pro pic"
        className="rounded-full" />
    </div>
  )
}

export default AccountImage