import ResultItem from "./ResultItem"

const ResultsList = ({ results }) => {
    return (
        <div className="results-list ms-3 p-2 d-flex flex-column">
            <h3 className="text-secondary fw-bolder mb-2">Restuarants Nearby</h3>
            {results.map((result, i) => (
                <ResultItem result={result} key={i} />
            ))}
        </div>
    )
}

export default ResultsList
