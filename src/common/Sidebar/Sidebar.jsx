import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onCategorySelect }) => {
  const categories = ["Aghi", "Set", "Accessori", "Inchiostro"];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">CATEGORIES</h2>
      <nav>
        <ul>
          <li onClick={() => onCategorySelect(null)} className="sidebar-category sidebar-category-all">
            All Products
          </li>
          {categories.map((category) => (
            <li key={category} className="sidebar-category">
              <details>
                <summary onClick={() => onCategorySelect(category)}>{category}</summary>
                {/* Sub-category list can be populated here later */}
                <ul>
                  {/* Example: <li onClick={() => onCategorySelect('SubCategory')}>SubCategory</li> */}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
