export async function MarketsReducer() {
    try {
        const res = await fetch('/account/portfolio/api');
        return await res.json();
    }
    catch (e) {
        console.log(e);
    }
}