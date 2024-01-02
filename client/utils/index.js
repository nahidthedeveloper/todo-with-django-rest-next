export const objectToArray = (obj) => {
    let fieldsErrors = []

    Object.entries(obj).forEach((entry) => {
        const [key, value] = entry
        fieldsErrors.push({
            name: key,
            message: value,
        })
    })
    return fieldsErrors
}