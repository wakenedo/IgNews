import { query as q } from "faunadb"

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

export default NextAuth({

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    
    async signIn({ user, /*account, profile, email, credentials*/ }) {
      console.log(
        'This is NextAuth callbacks user log :', user,
        'This is user email :', user.email
      )
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email: user.email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
        return true
      } catch {
        return false
      }
    },

    async session({session}) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_status'),
                'active'
              )
            ])
          )
        )


        return { 
          ...session, 
          activeSubscription: userActiveSubscription 
        }
      } catch {
        return { 
          ...session, 
          activeSubscription: null 
        }
      }


    },
  }
})