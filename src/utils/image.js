export const generateImageBase64 = imageFile => {
    const reader = new FileReader()
    const promise = new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = err => reject(err)
    })

    reader.readAsDataURL(imageFile)
    return promise
}