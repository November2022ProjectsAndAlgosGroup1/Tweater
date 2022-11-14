const ResultItem = ({ result }) => {
    return (
        <div className="result-item">
            <h3>{result.name}</h3>
            <p>{result.address}</p>
            <p>{result.cuisine}</p>
        </div>
    )
}

export default ResultItem
