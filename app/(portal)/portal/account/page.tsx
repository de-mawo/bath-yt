import Container from "@/components/Common/Container";
import { AccountForm } from "./AccountForm";
import InternshipWorkStatus from "./InternshipWorkStatus";

import { getUserInfo } from "@/lib/data/getUsers";
import { User } from "@prisma/client";
import AccountImage from "./AccountImage";
import ContentWrapper from "@/components/Common/ContentWrapper";

const MyAccountPage = async () => {
  const user = await getUserInfo();

   // Check if user is null before destructure
   if (!user) {
    // Handle the case where user is null, for example, redirect to login page or display an error message
    return <div>User info not available</div>;
  }

  return (
    <>
      <Container>
        <ContentWrapper>
          <div className="my-6">
            <h2 className="text-xl text-center font-extrabold leading-tight  lg:text-2xl">
              My Account
            </h2>
          </div>

          <AccountImage user={user as User} />
          <AccountForm user={user as User} />
          <hr />
          <InternshipWorkStatus user={user as User} />
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MyAccountPage;
