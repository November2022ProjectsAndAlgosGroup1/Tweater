import ResultItem from "./ResultItem"

const ResultsList = ({ results }) => {
    return (
        <div className="results-list">
            <h3>Restuarants Nearby</h3>
            {results.map((result) => (
                <ResultItem result={result} />
            ))}
        </div>
    )
}

export default ResultsList
