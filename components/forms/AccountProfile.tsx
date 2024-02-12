"use client"

import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";

interface Props {
    user: {
        id: string;
        objectId: string | undefined;
        username: string | null;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

type FieldChange = (value: string) => void;

const AccountProfile = ({ user, btnTitle }: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("imageUploader");
    const pathname = usePathname()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    })

    function handleImage(e: ChangeEvent<HTMLInputElement>, fieldChange: FieldChange) {
        e.preventDefault();

        const fileReader = new FileReader();
        if (e.target.files && e.target.files.length > 0) {
            //
            const file = e.target.files[0];

            //form an array  
            setFiles(Array.from(e.target.files))

            //get the file url
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';

                //update field
                fieldChange(imageDataUrl);
            }

            fileReader.readAsDataURL(file);
        }
    }

    async function onSubmit(values: z.infer<typeof UserValidation>) {
        const blob = values.profile_photo

        const hasImageChanged = isBase64Image(blob);

        if (hasImageChanged) {
            const imgRes = await startUpload(files)

            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url
            }
        }

        //TODO: Update user profile
        await updateUser({
            userId: user.id,
            username: values.username,
            name: values.name,
            bio: values.bio,
            image: values.profile_photo,
            path: pathname
        })

        if (pathname === '/profile/edit') {
            router.back();
        } else {
            router.push('/')
        }

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form_image-label overflow-hidden'>
                                <div className="">
                                    {field.value ? (
                                        <Image
                                            src={field.value}
                                            alt='profile_icon'
                                            width={96}
                                            height={96}
                                            priority
                                            className='rounded-full object-cover
                                            '
                                        />
                                    ) : (
                                        <Image
                                            src='/assets/profile.svg'
                                            alt='profile_icon'
                                            width={24}
                                            height={24}
                                            className='object-cover'
                                        />
                                    )}
                                </div>
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold 
                            text-light-2">Name</FormLabel>
                            <FormControl
                                className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold 
                            text-light-2">Username</FormLabel>
                            <FormControl
                                className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold 
                            text-light-2">Bio</FormLabel>
                            <FormControl
                                className="flex-1 text-base-semibold text-gray-200">
                                <Textarea
                                    rows={10}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button type='submit' className='bg-primary-500'>
                    {btnTitle}
                </Button>
            </form>
        </Form>
    )
}

export default AccountProfile