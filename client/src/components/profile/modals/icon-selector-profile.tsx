// IconSelector.tsx
import React from "react";
import IconSelectorHeader from "./icon-selector-components/icon-selector-header";
import IconsSection from "./icon-selector-components/icons-section";
import { Profile } from "../profile-manager";



interface IconSelectorProps {
  onIconSelect: (icon: string) => void;
  onClose: () => void;
  profile: Profile;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  onIconSelect,
  onClose,
  profile,
}) => {
  return (
    <>

      <IconSelectorHeader profile={profile} />
      <IconsSection
        onIconSelect={onIconSelect}
        onClose={onClose}
        
        />

    </>
  );
};

export default IconSelector;
