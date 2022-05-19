export function parseJwt (token: string): any | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const bytes = Buffer.from(base64, 'base64').toString()
        const jsonPayload = decodeURIComponent(bytes.split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch(e) {
        console.log(e)
        return null
    }
}