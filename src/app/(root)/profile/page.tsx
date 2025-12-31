import { Container } from "@shared/components/shared/Container";
import { ProfileInfo } from "@shared/components/shared/profile/profile-info";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }

  console.log(session)
  return (
    <Container>
      {session.user.email}
      <br />
      {session.user.name}
      <br />
      {/* @ts-ignore */}
      {session.user.role}
      <ProfileInfo />
    </Container>
  );
}
