export const useConcerts = (filters) => {
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        getConcerts(filters).then(setConcerts);
    }, [filters]);

    return concerts;
};