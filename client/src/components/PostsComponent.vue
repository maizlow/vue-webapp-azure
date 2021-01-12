<template>
  <div class="container">
      <h1>Create new post</h1>
      <div>
          <label for="text">New post: </label>
          <input type="text" id="text" v-model="text">
          <button @click="insertPost">Post!</button>
      </div>

      <hr>

      <h1>Latest Posts</h1>
      <hr>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="posts-container">
          <div class="post" 
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"          
          >
            <button @click="deletePost(post._id)">Delete</button>
            {{`${new Date(post.createdAt)}`}}
            
            <p class="text">{{ post.text }}</p>
          </div>

      </div>
  </div>
</template>

<script>
import PostsService from '../PostsService'

export default {
  data() {
      return {
          posts: [],
          error: '',
          text: ''
      }
  },
  async created() {
      try {
          this.posts = await PostsService.getPosts();
      } catch (error) {
          this.error = error.message;
      }
  },
  methods: {
      async insertPost(){
          await PostsService.insertPost(this.text);
          this.posts = await PostsService.getPosts();
          this.text = ''
      },
      async deletePost(id){
          await PostsService.deletePost(id);
          this.posts = await PostsService.getPosts();
      }
  },
};
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
