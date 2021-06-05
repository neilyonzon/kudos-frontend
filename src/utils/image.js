import { retrieveAcsToken } from './auth'

export const generateImageBase64 = imageFile => {
    const reader = new FileReader()
    const promise = new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = err => reject(err)
    })

    reader.readAsDataURL(imageFile)
    return promise
}

export const formatFileName = fileName => {
    let date = new Date()
    date = date.toISOString().split('T')[0]
    const randomString = Math.random().toString(36).substring(2, 7)
    const cleanFileName = fileName.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const newFileName = `images/${date}-${randomString}-${cleanFileName}`
    return newFileName.substring(0, 60)
}