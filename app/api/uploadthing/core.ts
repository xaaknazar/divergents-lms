import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handeAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId };
}

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "32MB", maxFileCount: 1 } })
     .middleware(() => handeAuth())
     .onUploadComplete(() => {}),
    courseAttachment: f(["text", "image","video","audio","pdf"])
     .middleware(() => handeAuth())
     .onUploadComplete(() => {}),
    chapterVideo: f({ video: { maxFileSize: "1024GB", maxFileCount: 1 } })
     .middleware(() => handeAuth())
     .onUploadComplete(() => {})
     
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;