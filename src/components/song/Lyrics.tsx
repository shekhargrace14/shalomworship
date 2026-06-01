//     "use client"

// import { useState } from "react"

// import {
//   Plus,
//   Trash2,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"

// import { Input } from "@/components/ui/input"

// import { Textarea } from "@/components/ui/textarea"

// // import {
// //   Card,
// //   CardContent,
// // } from "@/components/ui/card"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Card, CardContent } from "../ui/Card"

// type LyricsBlock =
//   | TitleBlock
//   | LineBlock
//   | GapBlock

// type TitleBlock = {
//   id: string
//   type: "title"
//   value: string
// }

// type GapBlock = {
//   id: string
//   type: "gap"
// }

// type LineBlock = {
//   id: string
//   type: "line"

//   native: string

//   scripts: {
//     roman?: string
//   }

//   translations: {
//     en?: string
//     hi?: string
//   }
// }

// type LyricsProps = {
//   value: LyricsBlock[]
//   onChange: (
//     value: LyricsBlock[]
//   ) => void
// }

// export default function Lyrics({
//   value,
//   onChange,
// }: LyricsProps) {
//   // ADD BLOCK
//   const addBlock = (
//     type:
//       | "line"
//       | "title"
//       | "gap"
//   ) => {
//     const id = crypto.randomUUID()

//     let block: LyricsBlock

//     switch (type) {
//       case "title":
//         block = {
//           id,
//           type: "title",
//           value: "",
//         }
//         break

//       case "gap":
//         block = {
//           id,
//           type: "gap",
//         }
//         break

//       default:
//         block = {
//           id,
//           type: "line",

//           native: "",

//           scripts: {
//             roman: "",
//           },

//           translations: {
//             en: "",
//           },
//         }
//     }

//     onChange([...value, block])
//   }

//   // REMOVE BLOCK
//   const removeBlock = (
//     id: string
//   ) => {
//     onChange(
//       value.filter(
//         (block) =>
//           block.id !== id
//       )
//     )
//   }

//   // UPDATE BLOCK
//   const updateBlock = (
//     id: string,
//     updates: any
//   ) => {
//     onChange(
//       value.map((block) =>
//         block.id === id
//           ? {
//               ...block,
//               ...updates,
//             }
//           : block
//       )
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {/* ACTIONS */}
//       <div className="flex flex-wrap gap-2">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() =>
//             addBlock("line")
//           }
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Add Line
//         </Button>

//         <Button
//           type="button"
//           variant="outline"
//           onClick={() =>
//             addBlock("title")
//           }
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Add Title
//         </Button>

//         <Button
//           type="button"
//           variant="outline"
//           onClick={() =>
//             addBlock("gap")
//           }
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Add Gap
//         </Button>
//       </div>

//       {/* BLOCKS */}
//       <div className="space-y-4">
//         {value.map((block) => {
//           // TITLE
//           if (
//             block.type === "title"
//           ) {
//             return (
//               <Card
//                 key={block.id}
//               >
//                 <CardContent className="p-4 space-y-4">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-semibold">
//                       Title
//                     </h3>

//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       onClick={() =>
//                         removeBlock(
//                           block.id
//                         )
//                       }
//                     >
//                       <Trash2 className="h-4 w-4 text-destructive" />
//                     </Button>
//                   </div>

//                   <Input
//                     placeholder="Verse 1"
//                     value={
//                       block.value
//                     }
//                     onChange={(
//                       e
//                     ) =>
//                       updateBlock(
//                         block.id,
//                         {
//                           value:
//                             e
//                               .target
//                               .value,
//                         }
//                       )
//                     }
//                   />
//                 </CardContent>
//               </Card>
//             )
//           }

//           // GAP
//           if (
//             block.type === "gap"
//           ) {
//             return (
//               <Card
//                 key={block.id}
//               >
//                 <CardContent className="p-4 flex justify-between items-center">
//                   <p className="text-muted-foreground">
//                     Gap Block
//                   </p>

//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     onClick={() =>
//                       removeBlock(
//                         block.id
//                       )
//                     }
//                   >
//                     <Trash2 className="h-4 w-4 text-destructive" />
//                   </Button>
//                 </CardContent>
//               </Card>
//             )
//           }

//           // LINE
//           return (
//             <Card
//               key={block.id}
//             >
//               <CardContent className="p-4 space-y-4">
//                 {/* HEADER */}
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold">
//                     Line
//                   </h3>

//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     onClick={() =>
//                       removeBlock(
//                         block.id
//                       )
//                     }
//                   >
//                     <Trash2 className="h-4 w-4 text-destructive" />
//                   </Button>
//                 </div>

//                 {/* NATIVE */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     Native Lyrics
//                   </label>

//                   <Textarea
//                     placeholder="तेरे बिना"
//                     value={
//                       block.native
//                     }
//                     onChange={(
//                       e
//                     ) =>
//                       updateBlock(
//                         block.id,
//                         {
//                           native:
//                             e
//                               .target
//                               .value,
//                         }
//                       )
//                     }
//                   />
//                 </div>

//                 {/* ROMAN */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     Roman Script
//                   </label>

//                   <Textarea
//                     placeholder="Tere Bina"
//                     value={
//                       block
//                         .scripts
//                         .roman ||
//                       ""
//                     }
//                     onChange={(
//                       e
//                     ) =>
//                       updateBlock(
//                         block.id,
//                         {
//                           scripts:
//                             {
//                               ...block.scripts,
//                               roman:
//                                 e
//                                   .target
//                                   .value,
//                             },
//                         }
//                       )
//                     }
//                   />
//                 </div>

//                 {/* ENGLISH */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     English Translation
//                   </label>

//                   <Textarea
//                     placeholder="Without You"
//                     value={
//                       block
//                         .translations
//                         .en ||
//                       ""
//                     }
//                     onChange={(
//                       e
//                     ) =>
//                       updateBlock(
//                         block.id,
//                         {
//                           translations:
//                             {
//                               ...block.translations,
//                               en: e
//                                 .target
//                                 .value,
//                             },
//                         }
//                       )
//                     }
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//     </div>
//   )
// }