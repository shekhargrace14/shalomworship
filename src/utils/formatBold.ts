export function formatBold(text:string):any{
    if(!text) return "";
    return text.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");
}