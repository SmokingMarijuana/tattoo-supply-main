import { useState } from "react";
import "./SectionsBar.css";
import { categoriesImages } from "../../assets/assets";

const categories = {
  colori: ["Intenze", "World_Famous", "Eternal_Ink", "Dynamic"],
  aghi: ["Cartucce_RL", "Magnum", "Shader"],
  aghiClassici: ["Aghi_RL", "RS", "Grips"],
  macchine: ["Rotative", "Bobina", "Alimentatori"],
  piercing: ["Barbell", "Punte"]
};

export const SectionsBar = () => {
  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className="sectionsbar-wrapper"
      onMouseLeave={() => setActive(null)}
    >
      <div className="sectionsbar-container">
        <button
          className={`sections-toggle ${drawerOpen ? 'hidden' : ''}`}
          aria-label="Apri menu categorie"
          aria-hidden={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
        <ul>
          <li onMouseEnter={() => setActive("colori")}>Colori per tatuaggio</li>
          <li onMouseEnter={() => setActive("aghi")}>Aghi e cartucce</li>
          <li onMouseEnter={() => setActive("aghiClassici")}>Aghi classici e grips</li>
          <li onMouseEnter={() => setActive("macchine")}>Macchine e alimentatori</li>
          <li onMouseEnter={() => setActive("piercing")}>Body piercing</li>
        </ul>
      </div>
      {/* MOBILE LEFT DRAWER */}
      <div className={`mobile-sections-drawer ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Chiudi">✕</button>
          <div className="drawer-content">
            {Object.keys(categories).map(catKey => (
              <div key={catKey} className={`drawer-section ${openSections[catKey] ? 'open' : ''}`}>
                <button
                  className="drawer-section-title"
                  onClick={() => toggleSection(catKey)}
                  aria-expanded={!!openSections[catKey]}
                >
                  {catKey.replace(/([A-Z])/g, ' $1').replace('_', ' ')}
                  <span className={`drawer-arrow ${openSections[catKey] ? 'open' : ''}`}>▾</span>
                </button>
                <div className="drawer-items" style={{ display: openSections[catKey] ? 'flex' : 'none' }}>
                  {categories[catKey].map(item => (
                    <div key={item} className="drawer-item">
                      <div className="icon-wrap">
                        <img src={categoriesImages[item] || `https://via.placeholder.com/80?text=${encodeURIComponent(item.split(" ")[0])}`} alt="" className="dropdown-icon" />
                      </div>
                      <div className="drawer-item-text">{item.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`sectionsbar-dropdown ${active ? "open" : ""}`}>
        {active &&
          categories[active].map(item => (
            <div key={item} className="dropdown-item">
              <img
                src={categoriesImages[item]}

                className="dropdown-icon"
              />
              <span className="dropdown-text">{item}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default SectionsBar;
