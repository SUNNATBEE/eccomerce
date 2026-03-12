// src/components/blog/BlogCard.jsx
const BlogCard = ({ blog }) => {
    // blog obyekti misoli:
    // {
    //   _id, title, excerpt, image, category,
    //   author: { name, avatar },
    //   createdAt, commentsCount
    // }
  
    const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
    return (
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
        {/* Rasm qismi */}
        <div className="relative aspect-[5/3] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
            {blog.category}
          </span>
        </div>
  
        {/* Matn qismi */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
            {blog.title}
          </h3>
  
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
  
          {/* Meta ma'lumotlar */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
              <span className="font-medium">{blog.author.name}</span>
            </div>
  
            <div className="flex items-center gap-4">
              <time dateTime={blog.createdAt}>{formattedDate}</time>
              <span>• {blog.commentsCount} comments</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BlogCard;
