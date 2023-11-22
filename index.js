import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// typeDefs
import { typeDefs } from './schema.js';

// db
import db from './_db.js';



const resolvers = {
    Query :  {
        games() {
            return  db.games
        },

        game(parent, args, context, info) {
            return db.games.find(game => game.id === args.id)
        }, 
        reviews() {
            return  db.reviews
        },

        review(parent, args, context, info) {
            return db.reviews.find(review => review.id === args.id)
        },
        authors(){
            return  db.authors
        },
        author(parent, args, context, info) {
            return db.authors.find(author => author.id === args.id)
        }

    },

    Mutation :  {
        addGame(parent, args, context, info) {
            const game = {
                id: String(db.games.length + 1),
                title: args.title,
                platform: args.platform
            }
            db.games.push(game)
            return game
        },
        addReview(parent, args, context, info) {
            const review = {
                id: String(db.reviews.length + 1),
                rating: args.rating,
                content: args.content,
                author_id: args.author_id,
                game_id: args.game_id
            }
            db.reviews.push(review)
            return review
        },
        addAuthor(parent, args, context, info) {
            const author = {
                id: String(db.authors.length + 1),
                name: args.name,
                verified: args.verified
            }
            db.authors.push(author)
            return author
        }
    }
}

const server = new ApolloServer({
    // schema
    typeDefs,
    // request hanlders
    resolvers
});

const { url } = startStandaloneServer(server, {listen: {port: 4000}})