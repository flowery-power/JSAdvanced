function solve(library, orders) {
    return orders.reduce((a, v) => {

        const temp = {}
        temp.name = v.template.name
        v.parts.forEach(x => {
            temp[x] = library[x]
        })
        a.push(temp)
        return a
    }, [])
   
}