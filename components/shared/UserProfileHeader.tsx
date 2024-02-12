import Image from "next/image";


interface UserProfileHeaderProps {
    name: string;
    imgUrl: string;
    bio: string;
    username: string;
}

const UserProfileHeader = ({
    name,
    imgUrl,
    bio,
    username,
}: UserProfileHeaderProps) => {

    return (
        <div className="flex flex-col w-full justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20 ">
                        <Image
                            src={imgUrl}
                            alt="Avatar"
                            fill
                            className="rounded-full object-cover shadow-2xl"
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-left text-heading3
                            text-light-1">{name}
                        </h2>
                        <p className="text-base-medium
                             text-gray-1">@{username}</p>
                    </div>
                </div>
 
            </div>
           
            <p className="mt-6 max-w-lg 
                    text-base-regular text-light-1
                    ">{bio}</p>
            <div className="mt-12 h-0.5 w-full bg-dark-3" />
        </div>
    )
}

export default UserProfileHeader;