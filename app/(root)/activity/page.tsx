import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";


import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

const Page = async () => {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding');

  const activities = await getActivity(userInfo._id )



    return (
      <section>
          <h1 className="head-text mb-10">Activity</h1>


          <div className="flex flex-col mt-10 gap-5">
              {activities.length > 0 ? (
              <>
                {activities.map((activity) => 
                  (
                    <Link key={activity._id} href={`thread/${activity.parentId}`}>
                      <article className="activity-card">
                        <Image 
                        src={activity.author.image}
                        alt="avatar image" 
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                        />
                        <p className="!text-small-regular text-light-1">
                          <span className="mr-1 text-primary-500">
                            {activity.author.name}
                          </span>{" "}
                          replied to your thread
                        </p>
                      </article>
                    </Link>
                  ))}
              </>
                ) :
                (<p>No activities here</p>)
                }
                
          </div>
      </section>
    )
  }
  
  export default Page