"use strict"

const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
    getUsers: async () => {
        let db 
        let users = []
        try{
            db = await connectDB()
            users = await db.collection('users').find().toArray()
        } catch ( err ) {
            console.log( err )
        }
        return users
    },
    getUser: async ( root, { id } ) => {
        let db
        let user 
        try {
            db = await connectDB()
            user = await db.collection('users').findOne({ _id: ObjectID( id ) })
        } catch (error) {
            console.log( error )
        } 
        return user
    },
    getProjects: async () => {
        let db 
        let projects = []
        try{
            db = await connectDB()
            projects = await db.collection('projects').find().toArray()
        } catch ( err ) {
            console.log( err )
        }
        return projects
    },
    getProject: async ( root, { id } ) => {
        let db
        let project
        try {
            db = await connectDB()
            project = await db.collection('projects').findOne({ _id: ObjectID( id ) })
        } catch (error) {
            console.log( error )
        } 
        return project
    }
};
