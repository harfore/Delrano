import URLSearchParams from '';

export const getConcerts = async (filters = {}) => {
    const params = nex URLSearchParams(filters).toString();
    const res = await fetch(`api/concerts?${params}`)
    return res.json();
}