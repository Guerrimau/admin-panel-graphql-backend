'use strict'

const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
    createUser: async ( root, { input }) => {
        let db 
        let user 
        try {
            db = await connectDB()
            user = await db.collection('users').insertOne( input )
            input._id = user.insertedId
        } catch (error) {
            console.log( error )
        }
        return input
    },
    updateUser: async ( root, { _id,  input }) => {
        let db 
        let user 
        try {
            db = await connectDB()
            await db.collection('users').updateOne(
                { _id: ObjectID( _id ) },
                { $set: input }
            )
            user = await db.collection('users').findOne({ _id: ObjectID( _id )})
        } catch (error) {
            console.log( error )
        }
        return user
    },
    deleteUser: async ( root, { _id }) => {
        let db;
        try {
            db = await connectDB()
            await db.collection('users').deleteOne({ _id: ObjectID( _id )})
        } catch (error) {
            console.log( error )
        }
        return "Se ha eliminado con exito"
    },
    createProject: async ( root, { input }) => {
        let db 
        let project
        try {
            db = await connectDB()
            project = await db.collection('projects').insertOne( input )
            input._id = project.insertedId
        } catch (error) {
            console.log( error )
        }
        return input
    },

    updateProject: async ( root, { _id,  input } ) => {
        let db 
        let project
        try {
            db = await connectDB()
            await db.collection('projects').updateOne(
                { _id: ObjectID( _id ) },
                { $set: input }
            )
            project = await db.collection('projects').findOne({ _id: ObjectID( _id )})
        } catch (error) {
            console.log( error )
        }
        return project
    },
    deleteProject: async ( root, { _id } ) => {
        let db;
        try {
            db = await connectDB()
            await db.collection('projects').deleteOne({ _id: ObjectID( _id )})
        } catch (error) {
            console.log( error )
        }
        return "Se ha eliminado con exito"
    },
    authAdminLogin: async( root, { email, password }) => {
        let db;
        try {
            db = await connectDB()
            let res = await db.collection('admins').findOne({ email: email })
            if( res.email === email && res.password === password ){
                return "correcto"
            } else {
                return "error"
            }
        } catch (error) {
            console.log( error )
        }
        return "error"
    }
};

