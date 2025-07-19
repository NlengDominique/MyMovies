import { Client, Databases, Query ,ID} from "appwrite"


export const updateSearchCount = async (searchTerm , movie) => {

  const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const database = new Databases(client)


try {
    const result  = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,[
           Query.equal('searchTerm',searchTerm)
        ]
    )

    if(result.documents.length > 0){
        const doc = result.documents[0]

        await database.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,doc.$id,{
                count: doc.count + 1
            })
    }
    else{
        await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,ID.unique(),{
                searchTerm,
                count:1,
                movie_id:movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
    }
} catch (error) {
    console.log(error);
    
}
    
}