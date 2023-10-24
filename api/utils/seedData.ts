import { faker } from "@faker-js/faker";
import Category from "../models/category/model";
import Tag from "../models/tag/model";
import Post from "../models/post/model";
import Comment from "../models/comment/model";
import { User } from "../core/features/user";

export async function seedData() {
  try {
    User.seedUser(25);

    const categoryData = [
      "JavaScript",
      "TypeScript",
      "Python",
      "Rust",
      "C#",
      "C++",
      "Java",
      "Svelte",
      "React",
      "NodeJS",
      "NextJS",
      "Django",
    ].map((name) => ({ name }));

    const categories = await Category.bulkCreate(categoryData);
    console.log("Category seeding completed successfully.");

    const tagData = [
      "Frontend",
      "Backend",
      "AI",
      "Machine Learning",
      "Web Dev",
    ].map((name) => ({ name }));
    
    const tags = await Tag.bulkCreate(tagData);
    console.log("Tag seeding completed successfully.");

    const postData = Array.from({ length: 125 }).map((_, index) => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      authorId: Math.floor(Math.random() * 10) + 1,
      categoryId: categories[Math.floor(Math.random() * categories.length)].id,
      publishedAt: faker.date.past(),
      status: "published",
      highlighted: index < 3,
      thumbnailUrl: `https://source.unsplash.com/1400x${900 + index}/?service`,
    }));

    const posts = await Post.bulkCreate(postData);
    console.log("Post seeding completed successfully.");

    for (const post of posts) {
      const randomTags = tags
        .sort(() => Math.random() - Math.random())
        .slice(0, Math.floor(Math.random() * tags.length));
      await post.setTags(randomTags);
    }

    console.log("Tag association with posts completed successfully.");

    const commentData = Array.from({ length: 200 }).map(() => ({
      content: faker.lorem.sentence(),
      authorId: Math.floor(Math.random() * 10) + 1,
      postId: posts[Math.floor(Math.random() * posts.length)].id,
    }));
    await Comment.bulkCreate(commentData);
    console.log("Comment seeding completed successfully.");
  } catch (error: any) {
    console.error("Seeding failed:", error);
  }
}
