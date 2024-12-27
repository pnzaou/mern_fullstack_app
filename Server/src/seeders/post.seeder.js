const mongoose = require('mongoose')
const Post = require('../models/Post.model')

function generateRandomText(maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const textLength = Math.floor(Math.random() * (maxLength + 1));
    let result = '';
  
    for (let i = 0; i < textLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}

async function seedPosts() {
  try {

    const postsToSeed = [];
    for (let i = 0; i < 30; i++) {
      const numImages = Math.floor(Math.random() * 5); 
      const images = [];
      for (let j = 0; j < numImages; j++) {
        images.push("http://localhost:8080/uploads/IMG_5546.jpg");
      }

      const post = {
        titre: `Titre du post ${i + 1}`,
        contenu: generateRandomText(Math.floor(Math.random() * 999)),
        images: images,
        status: 'published',
        authorId: "676de3245b82cdacd2dce094",
      };
      postsToSeed.push(post);
    }

    await Post.insertMany(postsToSeed);

    console.log('Seeding des posts terminé avec succès.');
  } catch (error) {
    console.error('Erreur lors du seeding des posts:', error);
  }
}

mongoose.connect('mongodb+srv://enz:Bxxmin%4066%402024@premier-cluster-test.i1gqm07.mongodb.net/Blog?retryWrites=true&w=majority&appName=Premier-Cluster-Test')
.then(() => {
    console.log("Connected to MongoDB")
    seedPosts().then(() => mongoose.disconnect())
}).catch(err => console.log(err))


console.log(generateRandomText(Math.floor(Math.random() * 999)));