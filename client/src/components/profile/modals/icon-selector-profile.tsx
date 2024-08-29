// IconSelector.tsx
import React from "react";
import IconSelectorHeader from "./icon-selector-components/icon-selector-header";
import IconsSection from "./icon-selector-components/icons-section";



interface IconSelectorProps {
  onIconSelect: (icon: string) => void;
  onClose: () => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  onIconSelect,
  onClose,
}) => {
  return (
    <>
      <IconSelectorHeader />
      <IconsSection
        title={"Classic Icons"}
        onIconSelect={onIconSelect}
        onClose={onClose}
      />
    </>
  );
};

export default IconSelector;
