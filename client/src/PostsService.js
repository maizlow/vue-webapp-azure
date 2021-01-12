import axios from 'axios';

const url = 'api/posts';

class PostsService {

    //get posts
    static getPosts(){
        return new Promise ((resolve,reject) => {
            axios.get(url + "-get").then((res) => {
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    //insert post
    static insertPost(text){
        return axios.post(url, {text});
    }


    //delete post
    static deletePost(id){
        return axios.delete(url + `/` + id);
    }

}

export default PostsService;