// src/components/blog/BlogSidebar.jsx

const BlogSidebar = () => {
    // Vaqtinchalik ma'lumotlar (keyin API dan olish mumkin)
    const categories = [
      { name: "Milks & Dairies", count: 30 },
      { name: "Clothing", count: 35 },
      { name: "Pet Foods", count: 42 },
      { name: "Baking material", count: 68 },
      { name: "Fresh Fruit", count: 87 },
      { name: "Wines & Alcohol", count: 19 },
    ];
  
    const trendingProducts = [
      { title: "Chen Cardigan", price: "$99.50", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=150" },
      { title: "Nike Sport Shoes", price: "$120.00", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150" },
      { title: "Summer T-Shirt", price: "$45.00", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150" },
    ];
  
    const popularTags = [
      "recipe", "food", "kitchen", "healthy", "dinner",
      "breakfast", "vegan", "dessert", "organic", "gluten-free",
    ];
  
    return (
      <div className="space-y-8 sticky top-6">
        {/* Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category</h3>
          <ul className="space-y-2.5">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="flex justify-between items-center text-sm text-gray-600 hover:text-green-600 cursor-pointer transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                  {cat.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Trending Now */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending Now</h3>
          <div className="space-y-5">
            {trendingProducts.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-green-600 cursor-pointer">
                    {item.title}
                  </p>
                  <p className="text-green-600 font-semibold text-sm mt-1">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Gallery */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gallery</h3>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-md hover:opacity-75 transition-opacity cursor-pointer overflow-hidden"
              >
                <img
                  src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&${i}`}
                  alt="gallery"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Popular Tags */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-green-100 hover:text-green-700 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}

</div>
        </div>
      </div>
    );
  };
  
  export default BlogSidebar;
