import { fetchUser } from "@/lib/actions/user.actions";
import { clerkClient, currentUser } from "@clerk/nextjs";

import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import RepliesTab from "@/components/shared/RepliesTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { profileTabs } from "@/constants";

import Image from "next/image";
import { redirect } from "next/navigation";
import TaggedTab from "@/components/shared/TaggedTab";
import UserProfileHeader from "@/components/shared/UserProfileHeader";



interface Params {
    params: {id: string}
};

const Profile = async ( { params }: Params) => {

    

    const user  = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(params.id)
    
    if(!userInfo?.onboarded) redirect('/onboarding');

    const userObj = await clerkClient.users.getUser(user.id);

  return (
    <section>
        {/* Profile Header */}
        {userInfo.id === userObj.id ? (
             <ProfileHeader
             accountId={userInfo.id}
             authUserId={userInfo.id}
             name={userInfo.name}
             imgUrl={userInfo.image}
             bio={userInfo.bio}
             username={userInfo.username}
             />
        ) : (
            <UserProfileHeader
            name={userInfo.name}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
            username={userInfo.username}
            />
        )}

         {/* Profile Tabs  */}
        <div className="mt-9">
            <Tabs defaultValue="threads" className="w-full">
                <TabsList className="tab">
                    {profileTabs.map((tab) => (
                        <TabsTrigger
                        key={tab.label}
                        value={tab.value}
                        className="tab"
                        >
                            <Image
                            src={tab.icon}
                            alt={tab.label}
                            width={24}
                            height={24}
                            className="object-contain"
                            />

                        <p className="max-sm:hidden">{tab.label}</p>
                        {tab.label === 'Threads' && (
                            <p className="ml-1 rounded-sm bg-light-4
                            px-2 py-1">{userInfo?.threads?.length}</p>
                        )}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Profile Tab's Content  */}
                {profileTabs.map((tab) => (
                    <TabsContent key={`content-${tab.label}`}
                    value={tab.value}
                    className="w-full text-light-1"
                    >
                     {tab.label.toLowerCase() === 'threads' ? (
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                            ) : tab.label.toLowerCase() === 'replies' ? (
                            <RepliesTab 
                                currentUserId={params.id}
                                name={userInfo.name}
                                imgUrl={userInfo.image}
                                accountId={userInfo.id}
                                accountType="User"
                             />
                            ) : tab.label.toLowerCase() === 'tagged' ? (
                            <TaggedTab />
                            ) : null}
                    </TabsContent>
                ))}            
            </Tabs>
        </div>
    </section>
  )
}

export default Profile