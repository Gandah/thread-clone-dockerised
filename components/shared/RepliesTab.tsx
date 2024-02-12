import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";


import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { fetchThreadById } from "@/lib/actions/thread.actions";

interface RepliesProps{
    currentUserId: string;
    accountId: any;
    accountType: string;
    name: string;
    imgUrl: string;
}

const RepliesTab = async ({currentUserId,
    name,
    imgUrl,
    accountId,
    accountType}: RepliesProps) => {

      //TO DO: fetch user replies and display them on reply tab 
      //TO DO: fix bug, clicking on a user's profile image or name should lead to their profile page - fixed


  return (
    <section>  
         
          {/* <div className="flex flex-col mt-10 gap-5">
              {children.length > 0 ? (
              <>
                {children.map((child: any) => 
                  (
                    <Link key={child._Id} href={`thread/${child._Id}`}>
                      <article className="activity-card">
                        <Image 
                        src={author.image}
                        alt="avatar image" 
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                        />
                        <p className="!text-small-regular text-light-1">
                            You replies to{" "} 
                          <span className="mr-1 text-primary-500">
                            {author.name}
                          </span> 
                        </p>
                      </article>
                    </Link>
                  ))}
              </>
                ) :
                (<p className="text-center">No replies here</p>)
                }
                
          </div> */}
      </section>
  )
}

export default RepliesTab