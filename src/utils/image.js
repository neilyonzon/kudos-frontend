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

export const postImage = async (formData) => {
    const acsToken = await retrieveAcsToken()
    const response = await fetch('http://localhost:3000/post-image', {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + acsToken 
        },
        body: formData
    })
    const responseData = await response.json()
    return responseData
}