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
          q.Create(
            q.Collection('users'),
            { data: { email: user.email } }
          )
        )
        return true
      } catch {
        return false
      }
    }
  }
})