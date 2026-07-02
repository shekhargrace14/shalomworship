// import {eventFullSelect } from "@/prisma/selectors";
// import prisma from "./prisma";

// export async function getAllEvents() {
//     try {
//         return await prisma.event.findMany(
//             {
//                 select: {
//                     ...eventFullSelect,

//                 }
//             }
//         )
//     } catch (error) {
//         console.error("Error from event server action:", error);
//         throw new Error("Failed to fetch event")
//     }
// }

// export async function getEvent(id: string) {
//     try {
//     return await prisma.event.findUnique({
//       where: { id: id },
//       include: {
//                 // song: {
//                 //     include: {
//                 //         song: true, // This gives you the song details
//                 //     }
//                 // },
//                 // artist: {
//                 //     include: {
//                 //         artist: true, // This gives you the artist details
//                 //     }
//                 // }
//             }

//     })
//   } catch (error) {
//     console.error("Error from albumById server action:", error)
//     throw new Error("Failed to fetch album by ID")
//   }
// }