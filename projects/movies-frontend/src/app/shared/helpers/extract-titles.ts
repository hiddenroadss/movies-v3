export function extractTitles(titles: string): string [] {
    return titles.split(/[\n,]+/)
    .map(title => title.trim().replace(/(^["']|["']$)/g, ''))
    .filter(title => title.length > 0);
}