"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type NamedItem = { name: string }

type FAQProps = {
  title: string
  artist?: NamedItem[]
  category?: NamedItem[]
  writer?: NamedItem[]
  meaning?: string
  scripture?: NamedItem[]
  band?: string
}

export function FAQ({ title, artist, category, writer, meaning, scripture, band }: FAQProps) {
  // Helper: render array of objects as comma-separated text
  const renderList = (items?: NamedItem[]) =>
    items?.map((item) => item.name).join(", ")
  console.log(artist , "artist on faq")

  const faqItems = [
    {
      key: "artist",
      question: `Who is the artist of "${title}"?`,
      answer: renderList(artist),
    },
    {
      key: "category",
      question: `What category does "${title}" belong to?`,
      answer: renderList(category),
    },
    {
      key: "writer",
      question: `Who wrote "${title}"?`,
      answer: renderList(writer),
    },
    {
      key: "meaning",
      question: `What is the meaning of "${title}"?`,
      answer: meaning,
    },
    {
      key: "scripture",
      question: `Which scripture relates to "${title}"?`,
      answer: renderList(scripture),
    },
    {
      key: "band",
      question: `Which band performed "${title}"?`,
      answer: band,
    },
  ]

  const filteredFaqs = faqItems.filter((item) => item.answer)

  if (filteredFaqs.length === 0) return null

  return (
    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
      {filteredFaqs.map((faq) => (
        <AccordionItem key={faq.key} value={faq.key}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
