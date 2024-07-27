"use client";

const messageToFormat =
  "This is a **message** with *bold* and *italic* text. This is a link [link](https://www.google.com)";

interface WikiContentHandlerProps {
  content: any;
}

// **message bold** *message italic* (link)[https://www.google.com]
export const WikiContentHandler = ({ content }: WikiContentHandlerProps) => {
  const message = content;
  const formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-blue-500 hover:underline font-bold'>$1</a>")
    .replace(/\_\_(.*?)\_\_/g, "<u>$1</u>")
    .replace(/\-\-(.*?)\-\-/g, "<strike>$1</strike>")
    .replace(/\`(.*?)\`/g, "<code>$1</code>")
    .replace(/\{(.*?)\}\[(.*?)\]/g, "<span class='text-$2-500'>$1</span>")
  return formattedMessage;
};
