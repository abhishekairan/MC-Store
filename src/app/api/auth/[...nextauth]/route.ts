import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import type { JWT } from "next-auth/jwt";

interface guildObject {
  id: String,
  name: String,
  icon: String,
  banner: String,
  owner: boolean,
  permissions: number,
  permissions_new: string,
  features: string[]
}



export const authOptions: AuthOptions =  {
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        url: "https://discord.com/api/oauth2/authorize",
        params: { scope: "identify email guilds" }, // Adjust scopes if needed
      },
      token: "https://discord.com/api/oauth2/token",
      userinfo: "https://discord.com/api/users/@me",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account?: any; user?: any }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token || !session) {return session; }
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      console.log(`accessToken: ${session.user.accessToken}`);
      // console.log(`isAdmin: ${session.user?.isAdmin}`);
      if(session.user.accessToken){
        if(session.user?.isAdmin == undefined ) {
          console.log("Checking if user is admin?")
          const guildsres = await fetch(`${process.env.NEXTAUTH_URL}/api/discord/guilds`,{headers: {accessToken: session.user.accessToken}})
          // console.log(await guildsres.json())
          if(guildsres.ok){
            try{
              const guilds = await guildsres.json()
              const guild = guilds.find((g:guildObject) => g.id === process.env.GUILD_ID)
              // console.log(guild.permissions & 0x20)
              if((guild.permissions & 0x20) === 32){
                session.user.isAdmin = true;
                // console.log("User is admin")
              }
            }catch(error){
              // console.log(error);
            }
          }
        }
        // console.log(session)
        console.log("returning session")
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export {handler as POST, handler as GET}