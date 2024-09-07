import React from 'react';
import { icons } from "./icons";

interface IconSelectorProps {
  onIconSelect: (src: string) => void;
  onClose: () => void;
}

const IconsSection: React.FC<IconSelectorProps> = ({
  onIconSelect,
  onClose,
}) => {
  const classicIcons = icons.slice(0, 23);
  const blackMirrorIcons = icons.slice(23, 30);
  const ourPlanetIcons = icons.slice(30, 43);

  const renderIconGrid = (iconSet: typeof icons) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {iconSet.map((icon) => (
        <img
          key={icon.id}
          src={icon.src}
          alt={`Icon ${icon.id}`}
          className="w-full aspect-square object-cover rounded cursor-pointer hover:border-2 hover:border-white transition-all"
          onClick={() => {
            onIconSelect(icon.src);
            onClose();
          }}
        />
      ))}
    </div>
  );

  const renderSection = (title: string, iconSet: typeof icons) => (
    <div className="mb-12">
      <h2 className="text-white text-3xl font-bold mb-6 relative">
        <span className=" pr-4">{title}</span>
        <div className="absolute bottom-3 left-0 w-full h-px bg-gray-800 -z-10"></div>
      </h2>
      {renderIconGrid(iconSet)}
    </div>
  );

  return (
    <div className="px-6 flex flex-col items-center justify-center sm:px-8 lg:px-12">
      {renderSection("Classic Icons", classicIcons)}
      {renderSection("Black Mirror", blackMirrorIcons)}
      {renderSection("Our Planet", ourPlanetIcons)}
    </div>
  );
};

export default IconsSection;