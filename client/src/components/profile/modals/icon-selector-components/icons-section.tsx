import { icons } from "./icons";
interface IconSelectorProps {
  title: string;
  onIconSelect: (src: string) => void;
  onClose: () => void;
}

const IconsSection: React.FC<IconSelectorProps> = ({
  title,
  onIconSelect,
  onClose,
}) => (
  <div className="mb-8">
    <h2 className=" text-3xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-8 gap-4">
      {icons.map((icon, index) => (
        <div key={index} className="w-16 h-16 flex items-center justify-center">
          <img
            key={icon.id}
            src={icon.src}
            alt={`Icon ${icon.id}`}
            className="w-16 h-16 cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => {
              onIconSelect(icon.src);
              onClose();
            }} // Handle icon selection
          />
        </div>
      ))}
    </div>
  </div>
);
export default IconsSection;
