import Appbar from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

function Blogs() {
  return (
    <div>
      <Appbar/>
      <div className="flex justify-center">
        <div className="max-w-2xl">
          <BlogCard
            authorName="Shashwat Chauhan"
            title="First Blog"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eius enim obcaecati, explicabo, nulla cupiditate molestiae aut distinctio quae eveniet harum fugit iure beatae quaerat animi quod laudantium."
            publishedDate="21-10-2024"
          />
          <BlogCard
            authorName="Shashwat Chauhan"
            title="Second Blog"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eius enim obcaecati, explicabo, nulla cupiditate molestiae aut distinctio quae eveniet harum fugit iure beatae quaerat animi quod laudantium."
            publishedDate="21-10-2024"
          />
          <BlogCard
            authorName="Shashwat Chauhan"
            title="Third Blog"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eius enim obcaecati, explicabo, nulla cupiditate molestiae aut distinctio quae eveniet harum fugit iure beatae quaerat animi quod laudantium."
            publishedDate="21-10-2024"
          />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
