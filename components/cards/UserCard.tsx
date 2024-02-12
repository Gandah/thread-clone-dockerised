"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface UserCardProps {
    key: string;
    id: string;
    username: string;
    name: string;
    imgUrl: string;
    foundUserType: string;
}

const UserCard = ({
    id,
    name,
    imgUrl,
    username,
    foundUserType,
}: UserCardProps) => {

    const router = useRouter();

    const pathSelector = foundUserType === 'User' ? `/profile/${id}`: `/communities/${id}`

    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <div className="rounded-[50%] aspect-square overflow-hidden">
                    <Image 
                    src={imgUrl} 
                    alt="avatar" 
                    width={48}
                    height={48}
                    className="block max-w-full min-h-[48px] object-cover"
                    />
                </div>
                

                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-light-1">
                        {name}
                    </h4>
                    <p className="text-small-medium text-gray-1">
                        {username}
                    </p>
                </div>
            </div>

            <Button className="user-card_btn" onClick={() => router.push(pathSelector)}>
                View
            </Button>
        </article>
    )
}

export default UserCard