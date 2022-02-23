import {NextApiRequest, NextApiResponse} from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Joe'},
        { id: 2, name: 'Zoe'},
        { id: 3, name: 'Koe'},
    ]

    return response.json(users)
}

// Serverless