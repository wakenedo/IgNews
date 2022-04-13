import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

const posts = [{
  slug: 'my-post',
  title: 'My post',
  excerpt: 'my first post',
  updatedAt: 'November 17, 2021',
}];

describe('Posts page', ()=>{
  it('renders correctly', () => {
    render(<Posts  posts={posts}/>)

    expect(screen.getByText('My post')).toBeInTheDocument()
  })

  it('loads initial data', async ()=> {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
        query: jest.fn().mockResolvedValueOnce({
          results: [
            {
              uid: 'my-post',
              data: {
                title: [{ type: 'heading', text: 'My post'}],
                content: [{ type: 'paragraph', text: 'my first post'}],
              },
              last_publication_date: '11-17-2021',
            }
          ]
        })

    } as any)

    
    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-post',
            title: 'My post',
            excerpt: 'my first post',
            updatedAt: 'November 17, 2021',
          }]
        }
      })
    )
  })
})