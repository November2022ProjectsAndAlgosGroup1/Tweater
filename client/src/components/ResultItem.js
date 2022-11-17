const ResultItem = ({ result }) => {
    return (
        <div className="result-item p-1 mb-1">
            <h3 className=""><span className="gold">Restaurant:</span> {result.name}</h3>
            {/* convert meters to miles */}
            <p>{(result.distance * 0.000621).toFixed(2)} Miles </p>
            <p><span className="gold">Category:</span>   
                {result.categories.map((category, i) => (
                    <span key={i}>
                        {category.title}
                        {i !== result.categories.length - 1 ? ", " : ""}
                    </span>
                ))}
            </p>
        </div>
    )
}

export default ResultItem
