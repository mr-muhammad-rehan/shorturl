

export function extractKey(url: string): string {
    const params = url.split('/');
    const subtractionPoints = url.charAt(url.length - 1) === '/' ? 2 : 1;
    return params[params.length - subtractionPoints] ?? '0';
}
