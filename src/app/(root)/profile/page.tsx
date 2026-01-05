import { ProfileInfo } from "@shared/components/shared/profile/profile-info";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

interface PageProps {
  searchParams: Promise<{
    userId: string | undefined
  }>
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const [ session, { userId } ] = await Promise.all([getServerSession(authOptions), searchParams])
  let profileId = null
  let isProfileOwner = false

  if (!session && !userId) {
    return redirect("/");
  }

  if (session?.user.id && userId) {
    profileId = userId
    isProfileOwner = session?.user.id === userId ? true : false 
  } else {
    profileId = session?.user.id
    isProfileOwner = true
  }

  return (
    <div>
      <ProfileInfo userId={profileId as string} isProfileOwner={isProfileOwner} />
    </div>
  );
}
