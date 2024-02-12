import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser,fetchProfileUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Params {
    params: {id: string}
}

const page = async ({ params } : Params) => {
    if(!params.id) return null;
    
    //fetch user
    const user = await currentUser();
    if(!user) return null;
    
    // redirect user to onboarding page if user is not onboarded
    const userInfo = await fetchUser(user?.id)
    if(!userInfo?.onboarded) redirect("/onboarding");
    
    const thread = await fetchThreadById(params?.id);

    const threadUserProfile = await fetchProfileUser(thread?.author?._id)


  return (
    <section className="relative">
       <div>
        <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={user?.id || ""}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.commmunity}
            createdAt={thread.createdAt}
            comments={thread.children}
            userProfileId={threadUserProfile?.id}
                />
       </div>

        <div className="mt-7">
            <Comment
                threadId={thread.id}
                currentUserImg={userInfo.image}
                currentUserId={JSON.stringify(userInfo._id)}
            />
        </div>

        <div className="flex flex-col mt-10">
            {thread.children.map( async (childItem: any) => {

            const userProfile = await fetchProfileUser(childItem?.author?._id)
                return (
                <ThreadCard
                    key={childItem._id}
                    id={childItem._id}
                    currentUserId={user?.id || ""}
                    parentId={childItem.parentId}
                    content={childItem.text}
                    author={childItem.author}
                    community={childItem.commmunity}
                    createdAt={childItem.createdAt}
                    comments={childItem.children}
                    isComment
                    userProfileId={userProfile.id}
                    />)
            }
                )

            }
        </div>
    </section>
  )
}

export default page