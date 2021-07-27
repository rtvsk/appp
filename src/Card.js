function Card({ name, price }) {
    return (
        <div>
            <p>Наименование: {name}</p>
            <p>Цена: {price}</p>
        </div>
    )
}

export { Card };